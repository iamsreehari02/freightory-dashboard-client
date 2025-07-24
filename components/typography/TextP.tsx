import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TextPProps {
  children: ReactNode;
  className?: string;
}

export default function TextP({ children, className = "" }: TextPProps) {
  return (
    <p
      className={cn(
        "text-[18px] leading-[24px] text-center font-manrope font-normal",
        className
      )}
    >
      {children}
    </p>
  );
}
