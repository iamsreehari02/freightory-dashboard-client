import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function TextH2({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-[36px] leading-[42px] text-center font-clash font-semibold",
        className
      )}
    >
      {children}
    </h2>
  );
}
