"use client";

import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Check } from "lucide-react";
import {
  cn,
  countryOptions,
  countryOptions2,
  getUserCountryCode,
  getUserCurrency,
} from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { useEffect, useState } from "react";
import { addContainer } from "@/services/api/containers";
import { toast } from "sonner";
import { AppButton } from "../shared/AppButton";
import { useContainerStore } from "@/store/useContainerStore";
import { Textarea } from "../ui/textarea";
import Papa from "papaparse";
import AgentDetailsField from "../form/AgentDetailsField";

// -----------------------
// Form schema
// -----------------------
const formSchema = z.object({
  country: z.string().min(1, "Country is required"),
  port: z.string().min(1, "Port is required"),
  units: z.coerce.number().min(1, "Units is required and must be at least 1"),
  availableFrom: z.date().refine((val) => !!val, {
    message: "Available from date is required",
  }),
  specialRate: z.coerce.number().optional(),
  agentDetails: z.string().optional(),
});

// -----------------------
// Types
// -----------------------
type CSVPort = {
  INDEX_NO: string;
  PORT_NAME: string;
  COUNTRY: string;
};

type Port = {
  value: string; // INDEX_NO
  label: string; // PORT_NAME
  country: string;
};

type FormSchemaType = z.infer<typeof formSchema>;

interface CreateContainerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// -----------------------
// Component
// -----------------------
export default function CreateContainerModal({
  open,
  onOpenChange,
}: CreateContainerModalProps) {
  const [countryOpen, setCountryOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [ports, setPorts] = useState<Port[]>([]);
  const [portsOpen, setPortsOpen] = useState(false);
  const [filteredPorts, setFilteredPorts] = useState<Port[]>([]);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema) as Resolver<FormSchemaType>,
    defaultValues: {
      country: "",
      port: "",
      units: 1,
      availableFrom: new Date(),
    },
  });

  const country = form.watch("country");

  // -----------------------
  // Load CSV once
  // -----------------------
  useEffect(() => {
    const fetchCSV = async () => {
      try {
        const res = await fetch("/data/ports.csv");
        const csvText = await res.text();
        const parsed = Papa.parse(csvText, { header: true });
        const allPorts: Port[] = (parsed.data as CSVPort[])
          .filter((row) => row.PORT_NAME && row.COUNTRY)
          .map((row) => ({
            value: row.INDEX_NO,
            label: row.PORT_NAME.toLowerCase().replace(/\b\w/g, (c) =>
              c.toUpperCase()
            ),
            country: row.COUNTRY,
          }));

        setPorts(allPorts);
      } catch (err) {
        console.error("Failed to load ports CSV:", err);
        setPorts([]);
      }
    };
    fetchCSV();
  }, []);

  // -----------------------
  // Filter ports by country
  // -----------------------
  useEffect(() => {
    if (!country) {
      setFilteredPorts(ports);
    } else {
      const filtered = ports.filter(
        (p) => p.country.toLowerCase() === country.toLowerCase()
      );
      setFilteredPorts(filtered);

      // Clear port if current selection not in filtered list
      if (!filtered.find((p) => p.value === form.getValues("port"))) {
        form.setValue("port", "");
      }
    }
  }, [country, ports, form]);

  // -----------------------
  // Submit handler
  // -----------------------
  const onSubmit = async (values: FormSchemaType) => {
    try {
      const countryFullName = countryOptions2.find(
        (c) => c.value === form.getValues("country")
      )?.label;

      const createdContainer = await addContainer({
        country: countryFullName,
        port: values.port,
        unitsAvailable: values.units,
        availableFrom: values.availableFrom.toISOString(),
        specialRate: values.specialRate,
        agentDetails: values.agentDetails,
      });

      useContainerStore.getState().addContainer(createdContainer);

      toast.success("Created successfully!");
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create. Please try again.");
    }
  };

  // -----------------------
  // Handle Enter key submit
  // -----------------------
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;

      // ✅ Prevent form submit if focus is inside a textarea or input field
      const tagName = target.tagName.toLowerCase();
      const isTextInput =
        tagName === "textarea" ||
        (tagName === "input" &&
          ["text", "number", "email", "password", "search"].includes(
            (target as HTMLInputElement).type
          ));

      if (isTextInput) return; // ⛔ Skip Enter handling inside inputs

      // ✅ Allow Enter to submit form only for other elements (e.g. buttons)
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        form.handleSubmit(onSubmit)();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [form, onSubmit]);

  // -----------------------
  // JSX
  // -----------------------
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl p-8">
        <DialogHeader>
          <DialogTitle>Create New Container</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-3"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Country */}
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Popover open={countryOpen} onOpenChange={setCountryOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className="w-full justify-between rounded-md h-10 px-3 font-manrope font-light"
                          >
                            {field.value
                              ? countryOptions2.find(
                                  (c) => c.value === field.value
                                )?.label
                              : "Select country"}
                            <Check className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="p-0 max-h-60 overflow-y-auto overscroll-contain"
                        align="start"
                        sideOffset={4}
                      >
                        <Command>
                          <CommandInput placeholder="Search country..." />
                          <CommandEmpty>No country found.</CommandEmpty>
                          <CommandGroup>
                            {countryOptions2.map((c) => (
                              <CommandItem
                                key={c.value}
                                onSelect={() => {
                                  form.setValue("country", c.value);
                                  setCountryOpen(false);
                                }}
                              >
                                {c.label}
                                <Check
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    field.value === c.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Port */}
              <FormField
                control={form.control}
                name="port"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Port</FormLabel>
                    <Popover open={portsOpen} onOpenChange={setPortsOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className="w-full justify-between rounded-md h-10 px-3 font-manrope font-light"
                          >
                            {field.value ? field.value : "Select port"}
                            <Check className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="p-0 max-h-60 overflow-y-auto"
                        align="start"
                        sideOffset={4}
                      >
                        <Command>
                          <CommandInput placeholder="Search port..." />
                          <CommandEmpty>No port found.</CommandEmpty>
                          <CommandGroup>
                            {filteredPorts.map((port) => (
                              <CommandItem
                                key={port.value}
                                onSelect={() => {
                                  form.setValue("port", port.label);
                                  setPortsOpen(false);
                                }}
                                className="capitalize"
                              >
                                {port.label}
                                <Check
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    field.value === port.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Units */}
              <FormField
                control={form.control}
                name="units"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Units</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Available From */}
              <FormField
                control={form.control}
                name="availableFrom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available From</FormLabel>
                    <Popover open={dateOpen} onOpenChange={setDateOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-manrope font-light",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? format(field.value, "PPP")
                              : "Pick a date"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date);
                            setDateOpen(false);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Special Rate */}
              <FormField
                control={form.control}
                name="specialRate"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Special Rate</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Enter special rate"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Agent Details */}
              <AgentDetailsField form={form} />
            </div>

            <div className="flex justify-end gap-3">
              <AppButton variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </AppButton>
              <AppButton type="submit">Save</AppButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
