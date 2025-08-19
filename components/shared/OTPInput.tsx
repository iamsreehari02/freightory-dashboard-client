"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRef } from "react";

interface Props {
  value: string[];
  onChange: (val: string[]) => void;
  length?: number;
  className?: string;
}

export function OtpInput({ value, onChange, length = 6, className }: Props) {
  const inputs = Array.from({ length });
  const refs = useRef<HTMLInputElement[]>([]);

  const handleChange = (index: number, val: string) => {
    const newValue = [...value];
    newValue[index] = val.slice(-1); // only keep one character
    onChange(newValue);

    if (val && index < length - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  return (
    <div className={cn("flex justify-center gap-3", className)}>
      {inputs.map((_, i) => (
        <Input
          key={i}
          maxLength={1}
          value={value[i] || ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          ref={(el) => {
            refs.current[i] = el!;
          }}
          className="w-[64px] h-[64px] rounded-md text-xl text-center font-medium tracking-wider"
        />
      ))}
    </div>
  );
}
