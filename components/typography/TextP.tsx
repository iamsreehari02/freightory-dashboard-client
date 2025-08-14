import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TextPProps {
  children: ReactNode;
  className?: string;
}

export default function TextP({ children, className = "" }: TextPProps) {
  return (
    <p
      style={{ wordSpacing: "0.05em" }}
      className={cn(
        "text-[18px] leading-relaxed  font-manrope font-normal ",
        className
      )}
    >
      {children}
    </p>
  );
}
