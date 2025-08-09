import { Button } from "@/components/ui/button";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";

type ButtonProps = ComponentProps<typeof Button> & {
  loading?: boolean;
};

export function AppButton({
  variant = "default",
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <Button
      variant={variant}
      disabled={disabled || loading}
      className={cn(
        "w-max max-w-full h-[52px] gap-[10px] rounded-[5px] px-[24px] py-[14px]",
        className
      )}
      {...props}
    >
      {loading && <LoaderIcon className="h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
