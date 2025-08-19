"use client";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppButton } from "../shared/AppButton";
import { toast } from "sonner";
import PhoneInputField from "../form/PhoneInputField";
import TextP from "../typography/TextP";
import { ActionText } from "../shared/ActionText";
import { createContactLead } from "@/services/api/contactLeads";
import { AxiosError } from "axios";

// validation schema
const contactSchema = z.object({
    contactPerson: z.string().min(1, "Contact person is required"),
    companyName: z.string().min(1, "Company name is required"),
    phone: z.string().min(7, "Phone number is required"),
    email: z.string().email("Invalid email"),
    message: z.string().min(5, "Feedback/Enquiry is required"),
});

export default function ContactUsForm() {
    const form = useForm({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            contactPerson: "",
            companyName: "",
            phone: "",
            email: "",
            message: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof contactSchema>) => {
        try {
            await createContactLead({
                name: values.contactPerson,
                companyName: values.companyName,
                phone: values.phone,
                email: values.email,
                message: values.message,
            });

            toast.success("Message sent successfully!");
            form.reset();
        } catch (error) {
            const err = error as AxiosError<{ message?: string }>;
            console.error(err);
            toast.error(err.response?.data?.message ?? err.message ?? "Something went wrong. Please try again.");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="contactPerson"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contact Person</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="ABC Logistics" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="you@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Textarea */}
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Feedback or Enquiry</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Write your message here..."
                                    className="min-h-[120px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <AppButton
                    type="submit"
                    className="w-full"
                    loading={form.formState.isSubmitting}
                >
                    Submit
                </AppButton>

                <div className="text-center">
                    <TextP className="text-sm text-[#1F2937]">
                        Not a member yet?{" "}
                        <ActionText href="/register">Register now</ActionText>
                    </TextP>
                </div>
            </form>
        </Form>
    );
}
