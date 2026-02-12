"use client";

import {
  Home,
  DollarSign,
  TrendingUp,
  Globe,
  Gem,
  Bitcoin,
  Building2,
  FileText,
  Landmark,
  ChevronLeft,
  ChevronRight,
  X,
  Menu,
} from "lucide-react";
import { useSidebar } from "@/contexts/SidebarContext";
import { SidebarItem, SidebarItemData } from "./SidebarItem";
import { cn } from "@/lib/utils";

const sidebarItems: SidebarItemData[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    label: "Info General",
    icon: TrendingUp,
    children: [
      { label: "Tipos de Dólar", href: "/dolares", icon: DollarSign },
      { label: "Riesgo País", href: "/riesgo-pais", icon: TrendingUp },
    ],
  },
  {
    label: "ETFs",
    icon: Globe,
    children: [
      { label: "Países", href: "/etf/paises", icon: Globe },
      { label: "Metales", href: "/etf/metales", icon: Gem },
      { label: "Criptomonedas", href: "/etf/cripto", icon: Bitcoin },
    ],
  },
  {
    label: "Bonos Corporativos",
    href: "/bonos-corporativos",
    icon: Building2,
  },
  {
    label: "Letras y Bonos",
    href: "/letras-bonos",
    icon: FileText,
  },
  {
    label: "Cauciones",
    href: "/cauciones",
    icon: Landmark,
  },
];

export function Sidebar() {
  const { isOpen, isMobileOpen, toggle, closeMobile } = useSidebar();

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeMobile}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full bg-bg-secondary border-r border-border-primary z-50",
          "transition-all duration-300 ease-in-out",
          // Desktop
          "hidden lg:block",
          isOpen ? "lg:w-64" : "lg:w-16",
          // Mobile
          isMobileOpen && "block w-64"
        )}
      >
        {/* Header */}
        <div className="h-14 flex items-center justify-between px-4 border-b border-border-primary">
          {isOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-accent-cyan" />
              </div>
              <span className="font-semibold text-text-primary text-sm">
                Panel Financiero
              </span>
            </div>
          )}

          {/* Desktop toggle */}
          <button
            onClick={toggle}
            className="hidden lg:flex w-8 h-8 items-center justify-center rounded-lg hover:bg-bg-tertiary text-text-secondary hover:text-text-primary transition-colors"
          >
            {isOpen ? (
              <ChevronLeft className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>

          {/* Mobile close */}
          <button
            onClick={closeMobile}
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-bg-tertiary text-text-secondary hover:text-text-primary transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100%-3.5rem)]">
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.label}
              item={item}
              isCollapsed={!isOpen && !isMobileOpen}
            />
          ))}
        </nav>
      </aside>

      {/* Mobile collapsed - only icon shown when not open */}
      {!isOpen && !isMobileOpen && (
        <aside className="fixed top-0 left-0 h-full w-16 bg-bg-secondary border-r border-border-primary z-50 lg:hidden hidden">
          <nav className="p-3 space-y-1">
            {sidebarItems.map((item) => (
              <SidebarItem key={item.label} item={item} isCollapsed={true} />
            ))}
          </nav>
        </aside>
      )}
    </>
  );
}

export function MobileMenuButton() {
  const { toggleMobile } = useSidebar();

  return (
    <button
      onClick={toggleMobile}
      className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-bg-tertiary text-text-secondary hover:text-text-primary transition-colors"
    >
      <Menu className="w-5 h-5" />
    </button>
  );
}
