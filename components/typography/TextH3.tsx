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
      style={{ wordSpacing: "0.1em" }}
      className={cn(
        "text-[32px] leading-relaxed text-center font-clash font-semibold",
        className
      )}
    >
      {children}
    </h3>
  );
}
