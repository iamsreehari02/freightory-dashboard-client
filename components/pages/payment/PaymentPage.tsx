"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn, paisaToUSD, paymentOptions } from "@/lib/utils";
import AuthCardHeader from "@/components/auth/AuthCardHeader";
import TextH4 from "@/components/typography/TextH4";
import TextP from "@/components/typography/TextP";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import PaypalButton from "@/components/paypal/PaypalButton";
import { useRouter, useSearchParams } from "next/navigation";
import { getPaymentSummary, PaymentSummary } from "@/services/api/payment";
import { AxiosError } from "axios";

export default function PaymentPageComponent() {
  const [selected, setSelected] = useState<"online" | "offline" | null>(null);
  const [paymentSummary, setPaymentSummary] = useState<PaymentSummary | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  const companyId = searchParams.get("companyId");

  useEffect(() => {
    if (!companyId) {
      setError("Company ID is missing!");
      setLoading(false);
      return;
    }

    const fetchPaymentSummary = async () => {
      try {
        setLoading(true);
        const data = await getPaymentSummary(companyId);
        setPaymentSummary(data.data);
      } catch (err: unknown) {
        let message = "Failed to fetch payment summary";

        if (err instanceof AxiosError) {
          message = err.response?.data?.message || message;
        } else if (err instanceof Error) {
          message = err.message;
        }

        console.error("Error fetching payment summary:", err);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentSummary();
  }, [companyId]);

  const handleOfflinePayment = () => {
    router.push(`/payment/offline?companyId=${companyId}`);
  };

  const handleOnlinePayment = () => {
    setSelected("online");
  };
  console.log("toal in total", paymentSummary?.totalCost);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading payment summary...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const amountInUSD = (paymentSummary?.totalCost || 0) / 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <AuthCardHeader
        title="Choose Payment Method"
        description="How would you like to complete your registration?"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-5xl my-16 min-h-[300px] sm:min-h-[350px] md:min-h-[400px]">
        {paymentOptions.map((option) => (
          <Card
            key={option.key}
            onClick={() => setSelected(option.key as "online" | "offline")}
            className={cn(
              "border-2 transition cursor-pointer",
              selected === option.key ? "border-blue-500" : "border-gray-200"
            )}
          >
            <CardContent className="p-10 flex flex-col items-center space-y-4">
              <Image
                src={option.icon}
                alt={option.title}
                width={60}
                height={60}
              />
              <TextH4 className="text-2xl text-center">{option.title}</TextH4>
              <TextP className="text-base text-gray-500 text-center">
                {option.description}
              </TextP>

              <div className="space-y-2 w-mx mb-7 mx-auto">
                {option.points?.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4  mt-1" />
                    <p className="text-sm text-gray-600">{point}</p>
                  </div>
                ))}
              </div>

              {option.key === "online" ? (
                selected === "online" ? (
                  <div className="w-full">
                    {/* <PaypalButton
                      // convert paisa → USD
                      amount={paisaToUSD(paymentSummary?.totalCost || 0, 83.5)}
                    /> */}
                    <PaypalButton
                      amount={((paymentSummary?.totalCost || 0) / 100).toFixed(
                        2
                      )}
                      companyId={companyId!}
                    />
                  </div>
                ) : (
                  <Button
                    size="lg"
                    className="w-full rounded-sm"
                    onClick={handleOnlinePayment}
                  >
                    {option.buttonLabel}
                  </Button>
                )
              ) : (
                <Button
                  size="lg"
                  className="w-full rounded-sm"
                  onClick={handleOfflinePayment}
                >
                  {option.buttonLabel}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
