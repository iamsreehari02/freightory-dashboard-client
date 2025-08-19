"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type ActionTextProps = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
};

export function ActionText({
  href,
  onClick,
  children,
  className,
}: ActionTextProps) {
  const sharedClassName = cn(
    "text-sm font-medium text-primary hover:underline hover:text-primary/80 transition",
    className
  );

  if (href) {
    return (
      <Link href={href} className={sharedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={sharedClassName} type="button">
      {children}
    </button>
  );
}
