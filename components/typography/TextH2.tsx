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
      style={{ wordSpacing: "0.2em" }}
      className={cn(
        "text-[36px] leading-relaxed text-center font-clash font-semibold",
        className
      )}
    >
      {children}
    </h2>
  );
}
