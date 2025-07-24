"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type ActionTextProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function ActionText({ href, children, className }: ActionTextProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium text-primary hover:underline hover:text-primary/80 transition",
        className
      )}
    >
      {children}
    </Link>
  );
}
