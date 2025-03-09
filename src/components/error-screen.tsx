"use client";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ErrorScreenProps {
  title?: string;
  message?: string;
  code?: string | number;
  fullScreen?: boolean;
  className?: string;
  onRetry?: () => void;
  showHomeButton?: boolean;
}

export function ErrorScreen({
  title = "Something went wrong",
  message = "We're sorry, but we encountered an unexpected error.",
  code,
  fullScreen = true,
  className,
  onRetry,
  showHomeButton = true,
}: ErrorScreenProps) {
  const containerClasses = cn(
    "flex flex-col items-center justify-center gap-6 p-8 text-center",
    fullScreen && "fixed inset-0 z-50 bg-background",
    className
  );

  return (
    <div className={containerClasses} role="alert">
      <div className="relative">
        <div className="h-24 w-24 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertTriangle className="h-12 w-12 text-destructive" />
        </div>
        {code && (
          <div className="absolute -top-2 -right-2 h-10 w-10 rounded-full bg-destructive flex items-center justify-center text-destructive-foreground font-bold">
            {code}
          </div>
        )}
      </div>

      <div className="max-w-md space-y-4">
        <h2 className="text-2xl font-merriweather font-bold text-foreground">
          {title}
        </h2>
        <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-destructive/50 to-transparent" />
        <p className="text-muted-foreground">{message}</p>
      </div>

      <div className="flex flex-wrap gap-4 justify-center mt-4">
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        )}

        {showHomeButton && (
          <Button asChild className="flex items-center gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Return Home
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
