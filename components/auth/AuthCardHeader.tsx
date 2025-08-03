import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import TextH1 from "../typography/TextH1";
import TextP from "../typography/TextP";

interface AuthCardHeaderProps {
  title: string;
  description?: string;
  showBackButton?: boolean;
}

export default function AuthCardHeader({
  title,
  description,
  showBackButton = true,
}: AuthCardHeaderProps) {
  const router = useRouter();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        {showBackButton && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="bg-black hover:bg-black hover:text-white text-white"
          >
            <ArrowLeft className="h-5 w-5 text-white" />
          </Button>
        )}
        <TextH1 className="font-semibold">{title}</TextH1>
      </div>

      {description && <TextP className="text-sm">{description}</TextP>}
    </div>
  );
}
