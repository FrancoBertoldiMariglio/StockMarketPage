"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const routeLabels: Record<string, string> = {
  "": "Dashboard",
  dolares: "Tipos de Dólar",
  "riesgo-pais": "Riesgo País",
  etf: "ETFs",
  paises: "Países",
  metales: "Metales",
  cripto: "Criptomonedas",
  "bonos-corporativos": "Bonos Corporativos",
  "letras-bonos": "Letras y Bonos",
  cauciones: "Cauciones",
};

interface BreadcrumbItem {
  label: string;
  href: string;
  isLast: boolean;
}

export function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  const items: BreadcrumbItem[] = [];

  let currentPath = "";
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const label = routeLabels[segment] || segment;
    items.push({
      label,
      href: currentPath,
      isLast: index === segments.length - 1,
    });
  });

  return (
    <nav className="flex items-center gap-1 text-sm mb-4" aria-label="Breadcrumb">
      <Link
        href="/"
        className="flex items-center text-text-muted hover:text-accent-cyan transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
      </Link>
      {items.map((item) => (
        <div key={item.href} className="flex items-center gap-1">
          <ChevronRight className="w-3.5 h-3.5 text-text-muted" />
          {item.isLast ? (
            <span className="text-text-primary font-medium">{item.label}</span>
          ) : (
            <Link
              href={item.href}
              className="text-text-secondary hover:text-accent-cyan transition-colors"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
