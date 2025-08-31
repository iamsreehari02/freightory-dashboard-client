"use client";

import { Clock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function PendingApprovalPage() {
  const adminEmail = "admin@indlognetwork.com";

  const router = useRouter();

  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout(); // Perform the logout action
    router.replace("/login"); // Redirect to the login page
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 text-center border">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Proof Under Review
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for submitting your payment proof.
          <br />
          Your account is under review and will be activated once approved.
          <br />
          You will receive an email notification upon approval.
        </p>

        <Link href={`mailto:${adminEmail}`}>
          <Button
            variant="default"
            className="w-full flex items-center justify-center gap-2 mb-4"
          >
            <Mail className="w-4 h-4" />
            Contact Admin
          </Button>
        </Link>

        <div className="mt-6">
          <Button
            variant="link"
            onClick={handleLogout} // Call handleLogout on click
            className="text-sm text-primary hover:underline"
          >
            Go back to login
          </Button>
        </div>
      </div>

      <p className="mt-6 text-sm text-gray-500">
        © {new Date().getFullYear()} Indlog Network. All rights reserved.
      </p>
    </div>
  );
}
