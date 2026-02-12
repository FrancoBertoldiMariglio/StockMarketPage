"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function BackLink() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent-blue transition-colors mb-4"
    >
      <ArrowLeft className="w-4 h-4" />
      Volver al Dashboard
    </Link>
  );
}
