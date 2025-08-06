import { Loader2 } from "lucide-react";

export function GlobalLoading() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-background text-primary">
      <Loader2 className="h-8 w-8 animate-spin mb-4" />
      <p className="text-sm font-medium">Loading</p>
    </div>
  );
}
