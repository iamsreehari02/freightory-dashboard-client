import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function TextH4({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h4
      className={cn(
        "text-[28px] leading-[32px] text-center font-clash font-medium",
        className
      )}
    >
      {children}
    </h4>
  );
}
