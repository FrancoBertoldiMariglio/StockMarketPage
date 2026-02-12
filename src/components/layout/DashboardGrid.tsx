"use client";

import { useState, DragEvent, ReactNode } from "react";
import { Pencil, X, GripVertical, Plus, RotateCcw, Check } from "lucide-react";
import { DolarPanel } from "@/components/panels/DolarPanel";
import { RiesgoPaisPanel } from "@/components/panels/RiesgoPaisPanel";
import { ETFPaisesPanel } from "@/components/panels/ETFPaisesPanel";
import { ETFMetalesPanel } from "@/components/panels/ETFMetalesPanel";
import { ETFCriptoPanel } from "@/components/panels/ETFCriptoPanel";
import { BonosCorporativosPanel } from "@/components/panels/BonosCorporativosPanel";
import { LetraBonosPanel } from "@/components/panels/LetraBonosPanel";
import { CaucionPanel } from "@/components/panels/CaucionPanel";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useDashboard, ALL_PANELS } from "@/contexts/DashboardContext";
import { cn } from "@/lib/utils";

// Panel component mapping
const PANEL_COMPONENTS: Record<string, ReactNode> = {
  dolar: <DolarPanel />,
  "riesgo-pais": <RiesgoPaisPanel />,
  "etf-paises": <ETFPaisesPanel />,
  "etf-metales": <ETFMetalesPanel />,
  "etf-cripto": <ETFCriptoPanel />,
  "bonos-corporativos": <BonosCorporativosPanel />,
  "letras-bonos": <LetraBonosPanel />,
  caucion: <CaucionPanel />,
};

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
      {title}
    </h2>
  );
}

interface DraggablePanelProps {
  panelId: string;
  columnId: string;
  isEditing: boolean;
  onRemove: () => void;
}

function DraggablePanel({
  panelId,
  columnId,
  isEditing,
  onRemove,
}: DraggablePanelProps) {
  const [isDragging, setIsDragging] = useState(false);
  const panelInfo = ALL_PANELS.find((p) => p.id === panelId);

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("panelId", panelId);
    e.dataTransfer.setData("fromColumn", columnId);
    e.dataTransfer.effectAllowed = "move";
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      draggable={isEditing}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={cn(
        "relative transition-all duration-200",
        isEditing && "cursor-move",
        isDragging && "opacity-50 scale-95"
      )}
    >
      {isEditing && (
        <div className="absolute -top-2 -right-2 -left-2 -bottom-2 border-2 border-dashed border-accent-cyan/50 rounded-xl pointer-events-none z-10" />
      )}
      {isEditing && (
        <div className="absolute top-2 right-2 z-20 flex items-center gap-1">
          <div className="bg-bg-tertiary rounded p-1 cursor-grab active:cursor-grabbing">
            <GripVertical className="w-4 h-4 text-text-muted" />
          </div>
          <button
            onClick={onRemove}
            className="bg-negative/20 hover:bg-negative/30 rounded p-1 transition-colors"
          >
            <X className="w-4 h-4 text-negative" />
          </button>
        </div>
      )}
      {isEditing && (
        <div className="absolute bottom-2 left-2 z-20">
          <span className="text-[10px] bg-bg-tertiary px-2 py-0.5 rounded text-text-muted">
            {panelInfo?.name}
          </span>
        </div>
      )}
      {PANEL_COMPONENTS[panelId]}
    </div>
  );
}

interface DroppableColumnProps {
  columnId: string;
  title: string;
  panels: string[];
  isEditing: boolean;
  onDrop: (panelId: string, fromColumn: string, toIndex: number) => void;
  onRemovePanel: (panelId: string) => void;
}

function DroppableColumn({
  columnId,
  title,
  panels,
  isEditing,
  onDrop,
  onRemovePanel,
}: DroppableColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const panelId = e.dataTransfer.getData("panelId");
    const fromColumn = e.dataTransfer.getData("fromColumn");
    if (panelId && fromColumn) {
      onDrop(panelId, fromColumn, panels.length);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "space-y-3 min-h-[200px] rounded-lg transition-colors",
        isEditing && "p-2 -m-2",
        isDragOver && isEditing && "bg-accent-cyan/10 border-2 border-dashed border-accent-cyan"
      )}
    >
      <SectionHeader title={title} />
      {panels.map((panelId) => (
        <DraggablePanel
          key={panelId}
          panelId={panelId}
          columnId={columnId}
          isEditing={isEditing}
          onRemove={() => onRemovePanel(panelId)}
        />
      ))}
      {panels.length === 0 && isEditing && (
        <div className="h-32 border-2 border-dashed border-border-primary rounded-lg flex items-center justify-center">
          <span className="text-xs text-text-muted">Arrastrá un panel aquí</span>
        </div>
      )}
    </div>
  );
}

interface AddPanelMenuProps {
  hiddenPanels: string[];
  onAddPanel: (panelId: string) => void;
}

function AddPanelMenu({ hiddenPanels, onAddPanel }: AddPanelMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (hiddenPanels.length === 0) return null;

  const handleAdd = (panelId: string) => {
    onAddPanel(panelId);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 bg-bg-tertiary hover:bg-accent-cyan/20 text-text-secondary hover:text-accent-cyan rounded-lg text-xs transition-colors"
      >
        <Plus className="w-4 h-4" />
        Agregar panel ({hiddenPanels.length})
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-bg-secondary border border-border-primary rounded-lg shadow-xl z-50 p-2">
          {hiddenPanels.map((panelId) => {
            const panel = ALL_PANELS.find((p) => p.id === panelId);
            return (
              <button
                key={panelId}
                onClick={() => handleAdd(panelId)}
                className="w-full text-left px-3 py-2 rounded text-xs text-text-secondary hover:bg-accent-cyan/20 hover:text-accent-cyan transition-colors"
              >
                {panel?.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function DashboardGrid() {
  const { currency } = useCurrency();
  const {
    config,
    isEditing,
    setIsEditing,
    movePanel,
    togglePanel,
    resetToDefault,
    hiddenPanels,
    addPanel,
  } = useDashboard();

  const handleDrop = (
    panelId: string,
    fromColumn: string,
    toColumn: string,
    toIndex: number
  ) => {
    movePanel(panelId, fromColumn, toColumn, toIndex);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-4">
      {/* Header with currency and edit button */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs text-text-muted">
          Mostrando precios en{" "}
          <span className="font-semibold text-text-secondary">
            {currency === "ARS" ? "Pesos Argentinos (ARS)" : "Dólares (USD)"}
          </span>
        </span>

        <div className="flex items-center gap-2">
          {isEditing && (
            <>
              <AddPanelMenu
                hiddenPanels={hiddenPanels}
                onAddPanel={addPanel}
              />
              <button
                onClick={resetToDefault}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-text-secondary hover:text-warning bg-bg-tertiary hover:bg-warning/10 rounded-lg transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Resetear
              </button>
            </>
          )}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors",
              isEditing
                ? "bg-accent-cyan text-white"
                : "bg-bg-tertiary text-text-secondary hover:text-accent-cyan hover:bg-accent-cyan/10"
            )}
          >
            {isEditing ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Listo
              </>
            ) : (
              <>
                <Pencil className="w-3.5 h-3.5" />
                Editar
              </>
            )}
          </button>
        </div>
      </div>

      {isEditing && (
        <div className="mb-4 p-3 bg-accent-cyan/10 border border-accent-cyan/30 rounded-lg">
          <p className="text-xs text-accent-cyan">
            <strong>Modo edición:</strong> Arrastrá los paneles para reorganizarlos.
            Usá la X para ocultar un panel.
          </p>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {config.columns.map((column) => (
          <DroppableColumn
            key={column.id}
            columnId={column.id}
            title={column.title}
            panels={column.panels}
            isEditing={isEditing}
            onDrop={(panelId, fromColumn, toIndex) =>
              handleDrop(panelId, fromColumn, column.id, toIndex)
            }
            onRemovePanel={togglePanel}
          />
        ))}
      </div>
    </div>
  );
}
