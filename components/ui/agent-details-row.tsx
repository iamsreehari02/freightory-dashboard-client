import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AgentDetailsRowProps {
  icon?: LucideIcon;
  label: string;
  value?: string | null;
  className?: string;
  iconClassName?: string;
  labelClassName?: string;
  valueClassName?: string;
}

export const AgentDetailsRow = ({
  icon: Icon,
  label,
  value,
  className,
  iconClassName,
  labelClassName,
  valueClassName,
}: AgentDetailsRowProps) => {
  const details = value ? value.split("\n") : [];

  return (
    <div
      className={cn(
        "flex items-start justify-between py-3 border-b last:border-none",
        className
      )}
    >
      <div className="flex items-start gap-2 min-w-0">
        {Icon && (
          <div className="w-5 flex justify-center mt-[2px]">
            <Icon
              className={cn("h-4 w-4 text-muted-foreground", iconClassName)}
            />
          </div>
        )}
        <span
          className={cn(
            "text-sm text-muted-foreground font-medium",
            labelClassName
          )}
        >
          {label}
        </span>
      </div>

      <div
        className={cn(
          "text-sm text-foreground text-right max-w-[60%] break-words flex flex-col items-end",
          !value && "text-muted-foreground italic",
          valueClassName
        )}
      >
        {details.length > 0
          ? details.map((line, index) => (
              <span key={index} className="text-sm">
                {line.trim() || "—"}
              </span>
            ))
          : "Not provided"}
      </div>
    </div>
  );
};
