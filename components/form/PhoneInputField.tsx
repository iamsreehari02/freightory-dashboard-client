"use client";

import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { getUserCountryCode } from "@/lib/utils";

interface PhoneInputFieldProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export default function PhoneInputField({
  value,
  onChange,
  label,
}: PhoneInputFieldProps) {
  const [countryCode, setCountryCode] = useState<string>("in");

  useEffect(() => {
    const detect = async () => {
      const code = await getUserCountryCode();
      if (code) setCountryCode(code.toLowerCase());
    };

    detect();
  }, []);

  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium">{label}</label>}

      <PhoneInput
        country={countryCode}
        value={value}
        onChange={onChange}
        inputStyle={{ width: "100%", height: "40px" }}
        containerStyle={{ width: "100%" }}
        inputClass="!w-full"
        buttonStyle={{
          borderTopLeftRadius: "0.375rem",
          borderBottomLeftRadius: "0.375rem",
        }}
      />
    </div>
  );
}
