import { cn } from "@/lib/utils";
import { PanelTimestamp } from "./PanelTimestamp";

interface PanelCardProps {
  title: string;
  lastUpdated?: Date | null;
  error?: Error | null;
  children: React.ReactNode;
  className?: string;
}

export function PanelCard({
  title,
  lastUpdated,
  error,
  children,
  className,
}: PanelCardProps) {
  return (
    <div
      className={cn(
        "bg-bg-secondary border border-border-primary rounded-lg p-4 hover:border-border-hover transition-colors",
        className
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-accent-blue">{title}</h2>
        <div className="flex items-center gap-2">
          {error && (
            <span className="text-[10px] text-negative font-medium px-1.5 py-0.5 bg-negative/10 rounded">
              Sin conexi&oacute;n
            </span>
          )}
          <PanelTimestamp date={lastUpdated} />
        </div>
      </div>
      {children}
    </div>
  );
}
