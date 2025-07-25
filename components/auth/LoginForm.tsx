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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppButton } from "../shared/AppButton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { login } from "@/services/api/auth";
import { ActionText } from "../shared/ActionText";
import TextP from "../typography/TextP";
import { AxiosError } from "axios";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      const res = await login(values);
      toast.success("Logged in successfully!");
      // router.push("/dashboard");
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;

      const message =
        err?.response?.data?.message ??
        err?.message ??
        "Something went wrong. Please try again.";

      toast.error(message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ActionText href="/forgot-password" className="text-right block">
          Forgot password?
        </ActionText>

        <AppButton
          type="submit"
          className="w-full"
          loading={form.formState.isSubmitting}
        >
          Sign In
        </AppButton>

        <div className="text-center">
          <TextP className="text-sm">
            Not a member yet?{" "}
            <ActionText href="/register">Register now</ActionText>
          </TextP>
        </div>
      </form>
    </Form>
  );
}
