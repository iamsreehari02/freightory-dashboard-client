"use client";

import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { getUserCountryCode } from "@/lib/utils";

interface PhoneInputFieldProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export default function PhoneInputField({
  value,
  onChange,
  label,
  placeholder = "98698897",
}: PhoneInputFieldProps) {
  const [countryCode, setCountryCode] = useState<string>("in");

  useEffect(() => {
    const detect = async () => {
      const code = await getUserCountryCode();
      if (code) setCountryCode(code.toLowerCase());
    };

    detect();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const form = (e.target as HTMLElement).closest("form");
      if (form) {
        const submitEvent = new Event("submit", {
          bubbles: true,
          cancelable: true,
        });
        form.dispatchEvent(submitEvent);
      }
    }
  };

  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium">{label}</label>}

      <PhoneInput
        country={countryCode}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        inputStyle={{ width: "100%", height: "40px" }}
      />
    </div>
  );
}
