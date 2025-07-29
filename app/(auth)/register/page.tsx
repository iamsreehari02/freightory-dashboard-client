"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import AuthLeftPanel from "@/components/AuthLeftPanel";
import RegisterForm from "@/components/auth/RegisterForm";
import TextH2 from "@/components/typography/TextH2";
import TextP from "@/components/typography/TextP";
import { Button } from "@/components/ui/button";
import AuthCardHeader from "@/components/auth/AuthCardHeader";

export default function RegisterPage() {
  const router = useRouter();

  return (
    <div className="flex h-screen">
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
      <div className="flex-1 h-screen min-h-0 overflow-y-auto px-6 flex items-start justify-center">
        <div className="w-full max-w-3xl space-y-4 px-12 py-12">
          {/* Back Button + Title */}

          <AuthCardHeader title="Create Your Account" />

          <TextP className="text-left mb-6">
            Fill in your company details to get started.
          </TextP>

          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
