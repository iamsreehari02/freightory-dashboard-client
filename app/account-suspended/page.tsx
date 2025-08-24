"use client";

import { Mail, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AccountSuspendedPage() {
  const adminEmail = "admin@indlognetwork.com";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 text-center border">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Your Account Has Been Suspended
        </h1>

        <p className="text-gray-600 mb-6">
          It looks like your account has been temporarily suspended.
          <br />
          Please contact our support team for further assistance.
        </p>

        <Link href={`mailto:${adminEmail}`}>
          <Button
            variant="default"
            className="w-full flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4" />
            Contact Admin
          </Button>
        </Link>

        <div className="mt-6">
          <Link href="/login" className="text-sm text-primary hover:underline">
            Go back to login
          </Link>
        </div>
      </div>

      <p className="mt-6 text-sm text-gray-500">
        © {new Date().getFullYear()} Indlog Network. All rights reserved.
      </p>
    </div>
  );
}
