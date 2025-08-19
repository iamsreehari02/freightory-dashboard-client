"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn, paymentOptions } from "@/lib/utils";
import AuthCardHeader from "@/components/auth/AuthCardHeader";
import TextH4 from "@/components/typography/TextH4";
import TextP from "@/components/typography/TextP";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import PaypalButton from "@/components/paypal/PaypalButton";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const [selected, setSelected] = useState<"online" | "offline" | null>(null);

  const router = useRouter();

  const handleOfflinePayment = () => {
    router.push("/payment/offline");
  };

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
            className="border-2 transition"
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

              {selected === "online" && option.key === "online" ? (
                <div className="w-full">
                  <PaypalButton amount="10.00" />
                </div>
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
