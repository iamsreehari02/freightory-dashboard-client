"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import TextP from "../typography/TextP";
import TextH4 from "../typography/TextH4";
import { toast } from "sonner";

interface CardRowProps {
  label: string;
  value: string;
  copyable?: boolean;
  className?: string;
}

export default function CardRow({
  label,
  value,
  copyable = true,
  className,
}: CardRowProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.message(`Copied "${value}" to clipboard`);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Failed to copy", error);
    }
  };

  return (
    <div className={cn("flex items-center justify-between text-sm", className)}>
      <div className="flex flex-col">
        <TextP className="text-sm text-gray-500">{label}</TextP>
        <TextP className=" text-lg font-semibold">{value}</TextP>
      </div>

      {copyable && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          className="text-muted-foreground  cursor-pointer"
        >
          {copied ? (
            <Check className="w-4 h-4 text-primary" />
          ) : (
            <Copy className="w-4 h-4 text-primary" />
          )}
        </Button>
      )}
    </div>
  );
}
