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
      style={{ wordSpacing: "0.1em" }}
      className={cn(
        "text-[28px] leading-relaxed text-center font-clash font-bold",
        className
      )}
    >
      {children}
    </h4>
  );
}
