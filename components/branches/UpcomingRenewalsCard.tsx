"use client";

import { useEffect, useState } from "react";
import { getUpcomingRenewals } from "@/services/api/branch";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PageHeader from "../PageHeader";
import { formatDate } from "@/lib/utils";
import { AppButton } from "../shared/AppButton";
import { useRouter } from "next/navigation";

interface Renewal {
  _id: string;
  name: string;
  contactPerson: string;
  city: string;
  country: string;
  renewalDate: string;
}

export function UpcomingRenewalsCard() {
  const [renewals, setRenewals] = useState<Renewal[]>([]);
  const [loading, setLoading] = useState(false);
  const [countString, setCountString] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchRenewals = async () => {
      try {
        setLoading(true);
        const data = await getUpcomingRenewals();
        setRenewals(data.latest || []);
        setCountString(data.display || "");
      } catch (err) {
        console.error("Failed to fetch upcoming renewals:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRenewals();
  }, []);

  // Helper to calculate days remaining
  const getDaysRemaining = (dateStr: string) => {
    const today = new Date();
    const due = new Date(dateStr);
    const diff = due.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const handlePaynow = () => {
    router.push("/payment");
  };

  return (
    <Card className="max-w-none">
      <PageHeader title="Upcoming Renewals" />
      <CardContent className="space-y-4 max-h-80 overflow-y-auto custom-scroll pr-3">
        {loading && <p className="text-sm text-muted-foreground">Loading...</p>}

        {!loading && renewals.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No upcoming renewals this month.
          </p>
        )}

        {!loading &&
          renewals.map((branch) => {
            const daysRemaining = getDaysRemaining(branch.renewalDate);
            return (
              <div
                key={branch._id}
                className="border rounded-lg p-3 flex items-center justify-between hover:shadow-sm transition"
              >
                {/* Left side: info */}
                <div className="flex-1 flex flex-col gap-1">
                  <span className="font-medium text-base capitalize">
                    {branch.name}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Due: {formatDate(branch.renewalDate)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Contact: {branch.contactPerson}
                  </span>
                </div>

                {/* Right side: badge + button */}
                <div className="flex flex-col gap-4 items-end">
                  <span
                    className={`text-xs w-max font-medium px-2 py-1 rounded-full text-white ${
                      daysRemaining < 10 ? "bg-red-600" : "bg-gray-400"
                    }`}
                  >
                    {daysRemaining} day{daysRemaining !== 1 ? "s" : ""}
                  </span>
                  <AppButton onClick={handlePaynow}>Renew Now</AppButton>
                </div>
              </div>
            );
          })}
      </CardContent>
    </Card>
  );
}
