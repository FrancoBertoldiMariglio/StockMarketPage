"use client";

import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { useSidebar } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { isOpen } = useSidebar();

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          // Mobile: no margin (sidebar is overlay)
          "ml-0",
          // Desktop: margin based on sidebar state
          isOpen ? "lg:ml-64" : "lg:ml-16"
        )}
      >
        {children}
      </div>
    </div>
  );
}
