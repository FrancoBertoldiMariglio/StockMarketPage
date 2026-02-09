"use client";

import { DolarPanel } from "@/components/panels/DolarPanel";
import { RiesgoPaisPanel } from "@/components/panels/RiesgoPaisPanel";
import { MetalesCriptoPanel } from "@/components/panels/MetalesCriptoPanel";
import { ETFPanel } from "@/components/panels/ETFPanel";
import { BonosCorporativosPanel } from "@/components/panels/BonosCorporativosPanel";
import { LetraBonosPanel } from "@/components/panels/LetraBonosPanel";
import { CaucionPanel } from "@/components/panels/CaucionPanel";
import { DescuentoChequesPanel } from "@/components/panels/DescuentoChequesPanel";

export function DashboardGrid() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {/* Column 1 */}
        <div className="space-y-3 order-1">
          <DolarPanel />
          <RiesgoPaisPanel />
          <MetalesCriptoPanel />
        </div>

        {/* Column 2 */}
        <div className="space-y-3 order-3 md:order-2">
          <ETFPanel />
          <BonosCorporativosPanel />
        </div>

        {/* Column 3 */}
        <div className="space-y-3 order-2 md:order-3">
          <LetraBonosPanel />
          <CaucionPanel />
          <DescuentoChequesPanel />
        </div>
      </div>
    </div>
  );
}
