"use client";

import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  showIcon?: boolean;
  text?: string;
  className?: string;
}

const sizeConfig = {
  sm: {
    container: "w-8 h-8",
    icon: "w-4 h-4",
    text: "text-sm",
    subtitle: "text-[10px]",
  },
  md: {
    container: "w-9 h-9",
    icon: "w-5 h-5",
    text: "text-sm",
    subtitle: "text-[11px]",
  },
  lg: {
    container: "w-10 h-10",
    icon: "w-6 h-6",
    text: "text-base",
    subtitle: "text-xs",
  },
};

export function Logo({
  size = "md",
  showText = true,
  showIcon = true,
  text = "Logo",
  className,
}: LogoProps) {
  const config = sizeConfig[size];

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {showIcon && (
        /*
          PLACEHOLDER: Replace this div with your logo image
          Example: <Image src="/logo.png" alt="Logo" width={36} height={36} />
        */
        <div
          className={cn(
            config.container,
            "rounded-lg bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center"
          )}
        >
          <TrendingUp className={cn(config.icon, "text-accent-cyan")} />
        </div>
      )}

      {showText && (
        <div>
          <h1
            className={cn(
              config.text,
              "font-semibold text-text-primary leading-tight"
            )}
          >
            {text}
          </h1>
        </div>
      )}
    </div>
  );
}
