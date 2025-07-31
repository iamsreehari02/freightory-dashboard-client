"use client";
import { useRouter } from "next/navigation";
import AuthLeftPanel from "@/components/AuthLeftPanel";
import RegisterForm from "@/components/auth/RegisterForm";
import TextP from "@/components/typography/TextP";
import AuthCardHeader from "@/components/auth/AuthCardHeader";

export default function RegisterPage() {
  const router = useRouter();

  return (
    <div className="flex h-screen w-screen fixed inset-0 overflow-hidden">
      {/* Left Panel */}
      <AuthLeftPanel
        bgImage="/assets/images/create-ac-bg.webp"
        title="Join the Freight Network of the Future"
        subtitle="Create your company account and get listed in our global directory."
        points={[
          "1-Minute Setup",
          "Secure & Verified",
          "Expand Your Global Reach",
        ]}
      />

      {/* Right Panel */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="flex-grow flex justify-center px-4 sm:px-6 md:px-10 py-12 sm:py-16 lg:py-24">
          <div className="w-full max-w-lg sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl px-4 sm:px-8 lg:px-12">
            <AuthCardHeader title="Create Your Account" />
            <TextP className="text-left mb-6 mt-4">
              Fill in your company details to get started.
            </TextP>
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
