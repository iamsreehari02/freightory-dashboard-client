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
      className={cn(
        "text-[38px] leading-[48px]  font-clash font-bold",
        className
      )}
    >
      {children}
    </h1>
  );
}
