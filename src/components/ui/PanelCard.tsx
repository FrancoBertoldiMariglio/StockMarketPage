import Link from "next/link";
import { cn } from "@/lib/utils";
import { PanelTimestamp } from "./PanelTimestamp";
import { InfoTooltip } from "./InfoTooltip";
import { ExternalLink } from "lucide-react";

interface PanelCardProps {
  title: string;
  lastUpdated?: Date | null;
  error?: Error | null;
  children: React.ReactNode;
  className?: string;
  href?: string;
  infoTooltip?: {
    title: string;
    content: string;
  };
}

export function PanelCard({
  title,
  lastUpdated,
  error,
  children,
  className,
  href,
  infoTooltip,
}: PanelCardProps) {
  return (
    <div
      className={cn(
        "bg-bg-secondary border border-border-primary rounded-lg p-4 hover:border-border-hover transition-colors",
        className
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {href ? (
            <Link
              href={href}
              className="text-sm font-semibold text-accent-blue hover:underline flex items-center gap-1 group"
            >
              {title}
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ) : (
            <h2 className="text-sm font-semibold text-accent-blue">{title}</h2>
          )}
          {infoTooltip && (
            <InfoTooltip
              title={infoTooltip.title}
              content={infoTooltip.content}
            />
          )}
        </div>
        <div className="flex items-center gap-2">
          {error && (
            <span className="text-[10px] text-negative font-medium px-1.5 py-0.5 bg-negative/10 rounded">
              Sin conexión
            </span>
          )}
          <PanelTimestamp date={lastUpdated} />
        </div>
      </div>
      {children}
    </div>
  );
}
