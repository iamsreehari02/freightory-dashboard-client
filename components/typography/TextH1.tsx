import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function TextH1({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h1
      style={{ wordSpacing: "0.2em" }}
      className={cn(
        "text-[38px] leading-relaxed  font-clash font-bold",
        className
      )}
    >
      {children}
    </h1>
  );
}
