"use client";

import Image from "next/image";
import TextH3 from "./typography/TextH3";
import TextP from "./typography/TextP";
import { Truck, Globe, ShieldCheck } from "lucide-react";
import TextH4 from "./typography/TextH4";

interface AuthLeftPanelProps {
  bgImage?: string;
  title?: string;
  subtitle?: string;
  logoPath?: string;
  points?: string[];
}

export default function AuthLeftPanel({
  bgImage = "/assets/images/welcome_bg.webp",
  title = "Join Us and Connect Agents Worldwide",
  subtitle = "Create your account in minutes and unlock access to premium logistics connections.",
  logoPath = "/assets/images/app_logo.svg",
  points = [
    "Trusted Freight Forwarders",
    "Global Agent Directory",
    "Secure Member Access",
  ],
}: AuthLeftPanelProps) {
  const icons = [Truck, Globe, ShieldCheck];

  return (
    <div className="hidden lg:flex w-1/2 h-screen relative">
      <Image
        src={bgImage}
        alt="background"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/70" />

      <div className="absolute inset-0 flex flex-col justify-between px-32 py-12">
        <div className="flex-1 flex items-center">
          <div className="space-y-12 max-w-md text-left text-white">
            <Image src={logoPath} alt="logo" width={200} height={60} />
            <div className="space-y-2">
              <TextH4 className="text-left">{title}</TextH4>
              <TextP className="text-white/90 text-left text-md">
                {subtitle}
              </TextP>
            </div>

            <ul className="space-y-4 mt-4">
              {points.map((point, idx) => {
                const Icon = icons[idx] || Truck;
                return (
                  <li key={idx} className="flex items-start gap-2 text-md">
                    <Icon className="w-5 h-5 mt-0.5 " />
                    <TextP>{point}</TextP>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <TextP className="text-xs text-white/70 text-left max-w-sm">
          By registering, you agree to receive occasional updates and offers
          from us. You can unsubscribe at any time.
        </TextP>
      </div>
    </div>
  );
}
