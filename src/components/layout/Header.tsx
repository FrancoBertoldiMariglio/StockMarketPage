import { Activity } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border-primary bg-bg-secondary/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-accent-blue" />
          <span className="font-semibold text-text-primary text-sm">
            Panel Financiero
          </span>
        </div>
        <span className="text-xs text-text-muted hidden sm:block">
          Panel Informativo &mdash; Mercado Argentino
        </span>
      </div>
    </header>
  );
}
