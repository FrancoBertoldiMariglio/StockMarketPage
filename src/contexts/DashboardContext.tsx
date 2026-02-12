"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

export interface PanelConfig {
  id: string;
  name: string;
  visible: boolean;
}

export interface ColumnConfig {
  id: string;
  title: string;
  panels: string[];
}

export interface DashboardConfig {
  columns: ColumnConfig[];
}

interface DashboardContextType {
  config: DashboardConfig;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  movePanel: (panelId: string, fromColumn: string, toColumn: string, toIndex: number) => void;
  togglePanel: (panelId: string) => void;
  resetToDefault: () => void;
  hiddenPanels: string[];
  allPanels: PanelConfig[];
  addPanel: (panelId: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

const STORAGE_KEY = "dashboard-config";

// All available panels with their designated column
export const ALL_PANELS: PanelConfig[] = [
  { id: "dolar", name: "Tipos de Dólar", visible: true },
  { id: "riesgo-pais", name: "Riesgo País", visible: true },
  { id: "etf-paises", name: "ETFs Países", visible: true },
  { id: "etf-metales", name: "ETFs Metales", visible: true },
  { id: "etf-cripto", name: "ETFs Cripto", visible: true },
  { id: "bonos-corporativos", name: "Bonos Corporativos", visible: true },
  { id: "letras-bonos", name: "Letras y Bonos", visible: true },
  { id: "caucion", name: "Cauciones", visible: true },
];

// Panel to column mapping - each panel has a designated column
export const PANEL_COLUMN_MAP: Record<string, string> = {
  "dolar": "col-1",
  "riesgo-pais": "col-1",
  "etf-paises": "col-2",
  "etf-metales": "col-2",
  "etf-cripto": "col-2",
  "bonos-corporativos": "col-3",
  "letras-bonos": "col-3",
  "caucion": "col-3",
};

// Default configuration - Option A layout
const DEFAULT_CONFIG: DashboardConfig = {
  columns: [
    {
      id: "col-1",
      title: "Información General",
      panels: ["dolar", "riesgo-pais"],
    },
    {
      id: "col-2",
      title: "ETFs",
      panels: ["etf-paises", "etf-metales", "etf-cripto"],
    },
    {
      id: "col-3",
      title: "Renta Fija",
      panels: ["bonos-corporativos", "letras-bonos", "caucion"],
    },
  ],
};

interface DashboardProviderProps {
  children: ReactNode;
}

export function DashboardProvider({ children }: DashboardProviderProps) {
  const [config, setConfig] = useState<DashboardConfig>(DEFAULT_CONFIG);
  const [isEditing, setIsEditing] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load config from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as DashboardConfig;
        setConfig(parsed);
      } catch {
        // Invalid JSON, use default
      }
    }
    setIsHydrated(true);
  }, []);

  // Save config to localStorage
  const saveConfig = useCallback((newConfig: DashboardConfig) => {
    setConfig(newConfig);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
  }, []);

  const movePanel = useCallback(
    (panelId: string, fromColumn: string, toColumn: string, toIndex: number) => {
      const newConfig = { ...config, columns: [...config.columns] };

      // Find and remove from source column
      const fromColIndex = newConfig.columns.findIndex((c) => c.id === fromColumn);
      if (fromColIndex === -1) return;

      const fromCol = { ...newConfig.columns[fromColIndex] };
      fromCol.panels = fromCol.panels.filter((p) => p !== panelId);
      newConfig.columns[fromColIndex] = fromCol;

      // Add to target column
      const toColIndex = newConfig.columns.findIndex((c) => c.id === toColumn);
      if (toColIndex === -1) return;

      const toCol = { ...newConfig.columns[toColIndex] };
      toCol.panels = [...toCol.panels];
      toCol.panels.splice(toIndex, 0, panelId);
      newConfig.columns[toColIndex] = toCol;

      saveConfig(newConfig);
    },
    [config, saveConfig]
  );

  const togglePanel = useCallback(
    (panelId: string) => {
      const newConfig = { ...config, columns: [...config.columns] };

      // Check if panel is currently visible in any column
      let found = false;
      for (let i = 0; i < newConfig.columns.length; i++) {
        const col = newConfig.columns[i];
        if (col.panels.includes(panelId)) {
          // Remove it
          newConfig.columns[i] = {
            ...col,
            panels: col.panels.filter((p) => p !== panelId),
          };
          found = true;
          break;
        }
      }

      if (!found) {
        // Add it to first column
        newConfig.columns[0] = {
          ...newConfig.columns[0],
          panels: [...newConfig.columns[0].panels, panelId],
        };
      }

      saveConfig(newConfig);
    },
    [config, saveConfig]
  );

  const addPanel = useCallback(
    (panelId: string) => {
      const targetColumnId = PANEL_COLUMN_MAP[panelId];
      if (!targetColumnId) return;

      const newConfig = { ...config, columns: [...config.columns] };

      // First remove from any existing column (shouldn't happen, but safety check)
      for (let i = 0; i < newConfig.columns.length; i++) {
        const col = newConfig.columns[i];
        if (col.panels.includes(panelId)) {
          newConfig.columns[i] = {
            ...col,
            panels: col.panels.filter((p) => p !== panelId),
          };
        }
      }

      // Add to designated column
      const colIndex = newConfig.columns.findIndex((c) => c.id === targetColumnId);
      if (colIndex !== -1) {
        newConfig.columns[colIndex] = {
          ...newConfig.columns[colIndex],
          panels: [...newConfig.columns[colIndex].panels, panelId],
        };
      }

      saveConfig(newConfig);
    },
    [config, saveConfig]
  );

  const resetToDefault = useCallback(() => {
    saveConfig(DEFAULT_CONFIG);
  }, [saveConfig]);

  // Calculate hidden panels
  const visiblePanels = config.columns.flatMap((c) => c.panels);
  const hiddenPanels = ALL_PANELS.filter((p) => !visiblePanels.includes(p.id)).map(
    (p) => p.id
  );

  if (!isHydrated) {
    return null;
  }

  return (
    <DashboardContext.Provider
      value={{
        config,
        isEditing,
        setIsEditing,
        movePanel,
        togglePanel,
        resetToDefault,
        hiddenPanels,
        allPanels: ALL_PANELS,
        addPanel,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard(): DashboardContextType {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
