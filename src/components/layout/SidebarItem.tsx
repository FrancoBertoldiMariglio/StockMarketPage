"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SidebarItemData {
  label: string;
  href?: string;
  icon?: LucideIcon;
  children?: SidebarItemData[];
}

interface SidebarItemProps {
  item: SidebarItemData;
  isCollapsed: boolean;
  depth?: number;
}

export function SidebarItem({
  item,
  isCollapsed,
  depth = 0,
}: SidebarItemProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();
  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.href ? pathname === item.href : false;
  const Icon = item.icon;

  const baseClasses = cn(
    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors duration-200",
    "hover:bg-bg-tertiary/60",
    isActive
      ? "bg-accent-cyan/10 text-accent-cyan"
      : "text-text-secondary hover:text-text-primary"
  );

  const paddingLeft = depth > 0 ? `${depth * 12 + 12}px` : undefined;

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(baseClasses, "w-full justify-between")}
          style={{ paddingLeft }}
        >
          <div className="flex items-center gap-3">
            {Icon && <Icon className="w-4 h-4 shrink-0" />}
            {!isCollapsed && <span>{item.label}</span>}
          </div>
          {!isCollapsed && (
            <ChevronDown
              className={cn(
                "w-4 h-4 transition-transform duration-200",
                isExpanded && "rotate-180"
              )}
            />
          )}
        </button>
        {!isCollapsed && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children?.map((child) => (
              <SidebarItem
                key={child.label}
                item={child}
                isCollapsed={isCollapsed}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (item.href) {
    return (
      <Link href={item.href} className={baseClasses} style={{ paddingLeft }}>
        {Icon && <Icon className="w-4 h-4 shrink-0" />}
        {!isCollapsed && <span>{item.label}</span>}
      </Link>
    );
  }

  return null;
}
