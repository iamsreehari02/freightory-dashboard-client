"use client";

import { useEffect, useState } from "react";
import { useForm, Resolver } from "react-hook-form";
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
import { AppButton } from "../shared/AppButton";
import { useBranchStore } from "@/store/useBranchStore";
import { toast } from "sonner";

// --- Schema ---
const branchSchema = z.object({
    name: z.string().min(1, "Branch name is required"),
    country: z.string().min(1, "Country is required"),
    city: z.string().min(1, "City/State is required"),
    contactPerson: z.string().min(1, "Contact person is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(1, "Phone is required"),
});

type BranchFormType = z.infer<typeof branchSchema>;

// --- Props ---
interface CreateBranchModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

// --- Component ---
export default function CreateBranchModal({
    open,
    onOpenChange,
}: CreateBranchModalProps) {
    const form = useForm<BranchFormType>({
        resolver: zodResolver(branchSchema) as Resolver<BranchFormType>,
        defaultValues: {
            name: "",
            country: "",
            city: "",
            contactPerson: "",
            email: "",
            phone: "",
        },
    });

    const [isLoading, setIsLoading] = useState(false);

    const { createBranch } = useBranchStore();

    const onSubmit = async (values: BranchFormType) => {
        setIsLoading(true)
        try {
            const branch = await createBranch({ ...values });
            if (branch) {
                toast.success("Branch created successfully!");
                onOpenChange(false);
                setIsLoading(false)

                form.reset();
            } else {
                toast.error("Failed to create branch");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to create branch");
        } finally {
            setIsLoading(false)
        }
    };


    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                form.handleSubmit(onSubmit)();
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [form, onSubmit]);


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl p-8">
                <DialogHeader>
                    <DialogTitle>Create New Branch</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Branch Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Branch Name" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Country */}
                            <FormField
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Country</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Country" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* City/State full width */}
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem className="md:col-span-2">
                                        <FormLabel>City / State</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="City / State" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Contact Person full width */}
                            <FormField
                                control={form.control}
                                name="contactPerson"
                                render={({ field }) => (
                                    <FormItem className="md:col-span-2">
                                        <FormLabel>Contact Person</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Contact Person" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Email */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Email" type="email" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Phone */}
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Phone" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex justify-end gap-3 mt-4">
                            <AppButton variant="outline" type="button" onClick={() => onOpenChange(false)}>
                                Cancel
                            </AppButton>
                            <AppButton type="submit" loading={isLoading}>Save</AppButton>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
