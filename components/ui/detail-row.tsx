import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface DetailRowProps {
  icon?: LucideIcon;
  label: string;
  value?: string | number | null | ReactNode;
  className?: string;
  iconClassName?: string;
  labelClassName?: string;
  valueClassName?: string;
}

export const DetailRow = ({
  icon: Icon,
  label,
  value,
  className,
  iconClassName,
  labelClassName,
  valueClassName,
}: DetailRowProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between py-3  border-b last:border-none",
        className
      )}
    >
      <div className="flex items-center gap-2 min-w-0">
        {Icon && (
          <div className="w-5 flex justify-center">
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
          "text-sm text-foreground text-right max-w-[60%] break-words",
          !value && "text-muted-foreground italic",
          valueClassName
        )}
      >
        {value || "Not provided"}
      </div>
    </div>
  );
};
