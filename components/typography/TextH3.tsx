import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function TextH3({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        "text-[32px] leading-[36px] text-center font-clash font-semibold",
        className
      )}
    >
      {children}
    </h3>
  );
}
