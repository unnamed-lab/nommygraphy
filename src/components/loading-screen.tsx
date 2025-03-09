import { Loader2, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingScreenProps {
  message?: string;
  fullScreen?: boolean;
  className?: string;
  variant?: "default" | "minimal" | "photography";
}

export function LoadingScreen({
  message = "Loading beautiful moments...",
  fullScreen = true,
  className,
  variant = "default",
}: LoadingScreenProps) {
  const renderLoader = () => {
    switch (variant) {
      case "minimal":
        return <Loader2 className="h-10 w-10 animate-spin text-primary" />;
      case "photography":
        return (
          <div className="relative">
            <Camera className="h-12 w-12 text-primary animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-3 w-3 rounded-full bg-primary animate-ping" />
            </div>
          </div>
        );
      default:
        return (
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-muted animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          </div>
        );
    }
  };

  const containerClasses = cn(
    "flex flex-col items-center justify-center gap-4 p-8 text-center",
    fullScreen && "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
    className
  );

  return (
    <div className={containerClasses} role="status" aria-live="polite">
      {renderLoader()}

      {message && (
        <div className="max-w-md space-y-2">
          <p className="text-lg font-merriweather text-foreground">{message}</p>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </div>
      )}
    </div>
  );
}
