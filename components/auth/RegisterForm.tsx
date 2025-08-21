"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { AppButton } from "../shared/AppButton";
import { RegisterSchema, registerSchema } from "@/schemas/registerSchema";
import { toast } from "sonner";
import { register } from "@/services/api/auth";
import { Check, Minus, Plus } from "lucide-react";
import { AxiosError } from "axios";
import { AppDropdown } from "../shared/AppDropdown";
import PasswordInput from "../form/PasswordInput";
import PhoneInputField from "../form/PhoneInputField";
import { Button } from "../ui/button";
import { cn, countryOptions, getUserCountryCode } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [branchCount, setBranchCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [detectedCountry, setDetectedCountry] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const detect = async () => {
      const countryCode = await getUserCountryCode();
      setDetectedCountry(countryCode?.toUpperCase() || null);
    };
    detect();
  }, []);

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      companyName: "",
      contactPerson: "",
      phone: "",
      email: "",
      website: "",
      headOfficeAddress: "",
      country: "",
      pinCode: "",
      freightType: undefined,
      password: "",
      confirmPassword: "",
      termsAccepted: false,
      branchCount: 0,
      costPerBranch: 0,
    },
  });

  const freightType = form.watch("freightType");
  const selectedCountry = form.watch("country");
  const showBranchCounter = freightType === "Freight Forwarder";

  const isIndia =
    selectedCountry?.toLowerCase() === "india" ||
    (!selectedCountry && detectedCountry?.toLowerCase() === "in");

  const selectedFreightType = freightType?.toLowerCase();

  const baseAmount = (() => {
    if (!selectedFreightType) return 0;
    if (selectedFreightType === "freight forwarder")
      return isIndia ? 10000 : 100;
    if (selectedFreightType === "nvocc") return isIndia ? 20000 : 200;
    return 0;
  })();

  const pricePerBranch =
    freightType === "Freight Forwarder" ? (isIndia ? 5000 : 50) : 0;

  // const totalAmount = pricePerBranch * branchCount;

  const totalAmount = baseAmount + pricePerBranch * branchCount;

  async function onSubmit(values: RegisterSchema) {
    try {
      values.branchCount = showBranchCounter ? branchCount : 0;
      values.costPerBranch = pricePerBranch;
      await register(values);
      toast.success("Registered successfully!");
      // router.push("/payment");
      router.push("/login");
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      const message =
        err?.response?.data?.message ?? err?.message ?? "Registration failed";
      toast.error(message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactPerson"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Person</FormLabel>
                <FormControl>
                  <Input placeholder="Full name of contact person" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PhoneInputField
                    label="Phone"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@company.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Website (Optional)</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="https://yourcompany.com"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="headOfficeAddress"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Head Office Address</FormLabel>
                <FormControl>
                  <Textarea
                    rows={4}
                    placeholder="Full address of your head office"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between rounded-md h-10 px-3 font-light"
                      >
                        {field.value
                          ? countryOptions.find((c) => c.value === field.value)
                              ?.label
                          : "Select country"}
                        <Check className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className="p-0 max-h-60 overflow-y-auto "
                    align="start"
                    sideOffset={4}
                  >
                    <Command>
                      <CommandInput placeholder="Search country..." />
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup>
                        {countryOptions.map((country) => (
                          <CommandItem
                            key={country.value}
                            onSelect={() => {
                              form.setValue("country", country.value);
                              setOpen(false);
                            }}
                          >
                            {country.label}
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                field.value === country.value
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

          <FormField
            control={form.control}
            name="pinCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pin Code</FormLabel>
                <FormControl>
                  <Input placeholder="Postal / ZIP code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="col-span-2">
            <FormField
              control={form.control}
              name="freightType"
              render={({ field }) => (
                <FormItem>
                  <AppDropdown
                    label="Freight Type"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select freight type"
                    options={[
                      {
                        label: "Freight Forwarder",
                        value: "Freight Forwarder",
                      },
                      { label: "NVOCC", value: "NVOCC" },
                    ]}
                    error={form.formState.errors.freightType?.message}
                  />
                </FormItem>
              )}
            />
          </div>

          {freightType && (
            <div className="col-span-2 flex justify-between items-center">
              <div className="text-base font-semibold">Freight Charge</div>
              <div className="font-bold text-primary">
                {isIndia ? `₹${baseAmount.toLocaleString()}` : `$${baseAmount}`}
              </div>
            </div>
          )}

          {showBranchCounter && (
            <div className="col-span-2 flex flex-col gap-4">
              {/* Branch Counter */}
              <div className="flex flex-row justify-between items-center w-full">
                <div className="flex flex-col">
                  <label className="text-base font-semibold">
                    Number of Branches
                  </label>
                  <p className="text-sm text-muted-foreground">
                    {isIndia ? "₹5000" : "$50"} per branch
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="w-9 h-9"
                    onClick={() =>
                      setBranchCount((prev) => Math.max(prev - 1, 0))
                    }
                  >
                    <Minus className="w-5 h-5" />
                  </Button>

                  <span className="text-lg font-semibold w-8 text-center">
                    {branchCount}
                  </span>

                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="w-9 h-9"
                    onClick={() => setBranchCount((prev) => prev + 1)}
                  >
                    <Plus className="w-5 h-5" />
                  </Button>

                  <div className="text-base font-medium">
                    Total:{" "}
                    <span className="font-bold text-primary">
                      {isIndia
                        ? `₹${totalAmount.toLocaleString()}`
                        : `$${totalAmount}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} placeholder="Enter password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      placeholder="Re-enter your password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* <div className="flex items-start space-x-2">
          <Checkbox
            checked={termsAccepted}
            onCheckedChange={(checked) => setTermsAccepted(!!checked)}
            id="terms"
          />
          <label htmlFor="terms" className="text-sm font-normal leading-snug">
            By registering with MFN you agree to the{" "}
            <a href="/terms" className="text-primary underline" target="_blank">
              Terms & Conditions
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="text-primary underline"
              target="_blank"
            >
              Privacy Policy
            </a>{" "}
            set by us.
          </label>
        </div> */}
        <FormField
          control={form.control}
          name="termsAccepted"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-start space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="terms"
                  />
                </FormControl>
                <label
                  htmlFor="terms"
                  className="text-sm font-normal leading-snug"
                >
                  By registering with MFN you agree to the{" "}
                  <a
                    href="/terms"
                    className="text-primary underline"
                    target="_blank"
                  >
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a
                    href="/privacy"
                    className="text-primary underline"
                    target="_blank"
                  >
                    Privacy Policy
                  </a>{" "}
                  set by us.
                </label>
              </div>
              <FormMessage /> {/* now appears below */}
            </FormItem>
          )}
        />

        <AppButton
          type="submit"
          loading={form.formState.isSubmitting}
          className="w-full"
        >
          Register Now
        </AppButton>
      </form>
    </Form>
  );
}
