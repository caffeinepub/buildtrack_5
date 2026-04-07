import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle,
  ArrowDownToLine,
  ArrowUpFromLine,
  Camera,
  CameraOff,
  Package,
  RefreshCw,
  ScanLine,
  TrendingDown,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DataTable } from "../components/shared/DataTable";
import { EmptyState } from "../components/shared/EmptyState";
import { PageHeader } from "../components/shared/PageHeader";
import { StatCard } from "../components/shared/StatCard";
import { StatusBadge } from "../components/shared/StatusBadge";
import {
  useInventoryLogs,
  useLogMaterialInflow,
  useLogMaterialOutflow,
  useMaterials,
  useProjects,
} from "../hooks/useBackend";
import { useQRScanner } from "../hooks/useQRScanner";
import type { Column, InventoryLog, Material, ProjectPhase } from "../types";

// ─── Formatters ───────────────────────────────────────────────────────────────

function fmt(n: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(n);
}

// ─── Columns ──────────────────────────────────────────────────────────────────

const MATERIAL_COLUMNS: Column<Material>[] = [
  { key: "name", label: "Material", sortable: true },
  { key: "category", label: "Category", sortable: true },
  {
    key: "currentStock",
    label: "Current Stock",
    sortable: true,
    align: "right",
    render: (row) => (
      <span className="font-mono text-sm font-medium">
        {row.currentStock.toLocaleString()} {row.unit}
      </span>
    ),
  },
  {
    key: "reorderLevel",
    label: "Reorder",
    align: "right",
    render: (row) => (
      <span className="font-mono text-xs text-muted-foreground">
        {row.reorderLevel} {row.unit}
      </span>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (row) => <StatusBadge status={row.status} />,
  },
  { key: "supplier", label: "Supplier", sortable: true },
  { key: "lastDeliveryDate", label: "Last Delivery", sortable: true },
  {
    key: "unitCost",
    label: "Unit Cost",
    align: "right",
    render: (row) => (
      <span className="font-mono text-xs">{fmt(row.unitCost)}</span>
    ),
  },
];

const LOG_COLUMNS: Column<InventoryLog>[] = [
  {
    key: "type",
    label: "Type",
    render: (row) => (
      <span
        className={`flex items-center gap-1.5 text-xs font-semibold ${
          row.type === "Inflow"
            ? "text-teal-600 dark:text-teal-400"
            : "text-orange-600 dark:text-orange-400"
        }`}
      >
        {row.type === "Inflow" ? (
          <ArrowDownToLine className="w-3.5 h-3.5" />
        ) : (
          <ArrowUpFromLine className="w-3.5 h-3.5" />
        )}
        {row.type}
      </span>
    ),
  },
  { key: "materialName", label: "Material", sortable: true },
  {
    key: "quantity",
    label: "Qty",
    align: "right",
    render: (row) => (
      <span className="font-mono text-sm">{row.quantity.toLocaleString()}</span>
    ),
  },
  { key: "date", label: "Date", sortable: true },
  {
    key: "notes",
    label: "Notes",
    render: (row) => (
      <span className="text-xs text-muted-foreground truncate max-w-40 block">
        {row.notes ?? "—"}
      </span>
    ),
  },
  {
    key: "loggedBy",
    label: "Logged By",
    render: (row) => (
      <span className="text-xs text-muted-foreground">
        {row.loggedBy ?? "—"}
      </span>
    ),
  },
];

// ─── Project Balance Card ─────────────────────────────────────────────────────

interface ProjectBalanceProps {
  projectName: string;
  materials: Material[];
}

function ProjectBalanceCard({ projectName, materials }: ProjectBalanceProps) {
  const totalValue = materials.reduce(
    (s, m) => s + m.currentStock * m.unitCost,
    0,
  );
  const criticalItems = materials.filter(
    (m) => m.status === "Critical" || m.status === "OutOfStock",
  );

  return (
    <div
      className="bg-card border border-border p-4 flex flex-col gap-3"
      data-ocid="project-balance-card"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm font-semibold text-foreground truncate">
          {projectName}
        </span>
        <span className="font-mono text-sm font-bold text-teal-600 dark:text-teal-400 shrink-0">
          {fmt(totalValue)}
        </span>
      </div>
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span>{materials.length} materials</span>
        {criticalItems.length > 0 && (
          <span className="flex items-center gap-1 text-orange-600 dark:text-orange-400 font-medium">
            <AlertTriangle className="w-3 h-3" />
            {criticalItems.length} critical
          </span>
        )}
      </div>
      {criticalItems.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {criticalItems.slice(0, 3).map((m) => (
            <Badge
              key={m.id}
              variant="outline"
              className="text-[10px] px-1.5 py-0 bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/30"
            >
              {m.name}
            </Badge>
          ))}
          {criticalItems.length > 3 && (
            <Badge
              variant="outline"
              className="text-[10px] px-1.5 py-0 bg-muted text-muted-foreground border-border"
            >
              +{criticalItems.length - 3} more
            </Badge>
          )}
        </div>
      )}
      {/* Mini stock bars */}
      <div className="space-y-1.5">
        {materials.slice(0, 4).map((m) => {
          const pct = Math.min(100, (m.currentStock / m.maxCapacity) * 100);
          const barColor =
            m.status === "InStock"
              ? "bg-teal-500"
              : m.status === "LowStock"
                ? "bg-amber-500"
                : m.status === "Critical"
                  ? "bg-orange-500"
                  : "bg-destructive";
          return (
            <div key={m.id} className="flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground w-28 truncate shrink-0">
                {m.name}
              </span>
              <div className="flex-1 h-1 bg-muted overflow-hidden">
                <div
                  className={`h-full ${barColor} transition-all`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="font-mono text-[10px] text-muted-foreground w-8 text-right shrink-0">
                {Math.round(pct)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Inflow Form ──────────────────────────────────────────────────────────────

interface InflowFormProps {
  materials: Material[];
  onClose: () => void;
  prefillMaterialId?: string;
}

function InflowForm({
  materials,
  onClose,
  prefillMaterialId,
}: InflowFormProps) {
  const [materialId, setMaterialId] = useState(prefillMaterialId ?? "");
  const [quantity, setQuantity] = useState("");
  const [unitCost, setUnitCost] = useState("");
  const [supplier, setSupplier] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");

  const logInflow = useLogMaterialInflow();
  const selectedMaterial = materials.find((m) => m.id === materialId);

  useEffect(() => {
    if (selectedMaterial) setUnitCost(String(selectedMaterial.unitCost));
  }, [selectedMaterial]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    logInflow.mutate(
      { materialId, quantity: Number(quantity), supplier, date, notes },
      { onSuccess: onClose },
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label className="text-xs font-semibold uppercase tracking-wide">
          Material *
        </Label>
        <Select value={materialId} onValueChange={setMaterialId} required>
          <SelectTrigger
            className="rounded-none"
            data-ocid="inflow-material-select"
          >
            <SelectValue placeholder="Select material…" />
          </SelectTrigger>
          <SelectContent className="rounded-none">
            {materials.map((m) => (
              <SelectItem key={m.id} value={m.id}>
                {m.name} — {m.currentStock} {m.unit} in stock
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs font-semibold uppercase tracking-wide">
            Quantity *{selectedMaterial ? ` (${selectedMaterial.unit})` : ""}
          </Label>
          <Input
            type="number"
            min="1"
            required
            className="rounded-none font-mono"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="0"
            data-ocid="inflow-quantity-input"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs font-semibold uppercase tracking-wide">
            Unit Cost (£)
          </Label>
          <Input
            type="number"
            min="0"
            step="0.01"
            className="rounded-none font-mono"
            value={unitCost}
            onChange={(e) => setUnitCost(e.target.value)}
            placeholder="0.00"
            data-ocid="inflow-cost-input"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-xs font-semibold uppercase tracking-wide">
          Supplier
        </Label>
        <Input
          className="rounded-none"
          value={supplier}
          onChange={(e) => setSupplier(e.target.value)}
          placeholder="Supplier name"
          data-ocid="inflow-supplier-input"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-xs font-semibold uppercase tracking-wide">
          Date *
        </Label>
        <Input
          type="date"
          required
          className="rounded-none font-mono"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          data-ocid="inflow-date-input"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-xs font-semibold uppercase tracking-wide">
          Notes
        </Label>
        <Textarea
          className="rounded-none text-sm resize-none h-20"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Delivery PO, batch reference…"
          data-ocid="inflow-notes-input"
        />
      </div>

      <div className="flex justify-end gap-2 pt-1">
        <Button
          type="button"
          variant="outline"
          className="rounded-none"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={logInflow.isPending || !materialId || !quantity}
          className="rounded-none bg-teal-600 hover:bg-teal-700 text-white gap-1.5"
          data-ocid="inflow-submit-btn"
        >
          {logInflow.isPending ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <ArrowDownToLine className="w-3.5 h-3.5" />
          )}
          Log Inflow
        </Button>
      </div>
    </form>
  );
}

// ─── Outflow Form ─────────────────────────────────────────────────────────────

const PROJECT_PHASES: ProjectPhase[] = [
  "Foundation",
  "Structure",
  "Finishing",
  "Handover",
];

interface OutflowFormProps {
  materials: Material[];
  onClose: () => void;
  prefillMaterialId?: string;
}

function OutflowForm({
  materials,
  onClose,
  prefillMaterialId,
}: OutflowFormProps) {
  const [materialId, setMaterialId] = useState(prefillMaterialId ?? "");
  const [quantity, setQuantity] = useState("");
  const [phase, setPhase] = useState<ProjectPhase | "">("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");

  const logOutflow = useLogMaterialOutflow();
  const selectedMaterial = materials.find((m) => m.id === materialId);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    logOutflow.mutate(
      {
        materialId,
        quantity: Number(quantity),
        date,
        notes: notes || (phase ? `Phase: ${phase}` : ""),
      },
      { onSuccess: onClose },
    );
  }

  const overLimit =
    selectedMaterial && quantity
      ? Number(quantity) > selectedMaterial.currentStock
      : false;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label className="text-xs font-semibold uppercase tracking-wide">
          Material *
        </Label>
        <Select value={materialId} onValueChange={setMaterialId} required>
          <SelectTrigger
            className="rounded-none"
            data-ocid="outflow-material-select"
          >
            <SelectValue placeholder="Select or scan material…" />
          </SelectTrigger>
          <SelectContent className="rounded-none">
            {materials.map((m) => (
              <SelectItem key={m.id} value={m.id}>
                {m.name} — {m.currentStock} {m.unit} available
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedMaterial && (
          <p className="text-xs text-muted-foreground">
            Available:{" "}
            <span className="font-mono font-medium text-foreground">
              {selectedMaterial.currentStock} {selectedMaterial.unit}
            </span>
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs font-semibold uppercase tracking-wide">
            Quantity *{selectedMaterial ? ` (${selectedMaterial.unit})` : ""}
          </Label>
          <Input
            type="number"
            min="1"
            max={selectedMaterial?.currentStock}
            required
            className={`rounded-none font-mono ${overLimit ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="0"
            data-ocid="outflow-quantity-input"
          />
          {overLimit && (
            <p className="text-xs text-destructive">Exceeds available stock</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs font-semibold uppercase tracking-wide">
            Project Phase *
          </Label>
          <Select
            value={phase}
            onValueChange={(v) => setPhase(v as ProjectPhase)}
            required
          >
            <SelectTrigger
              className="rounded-none"
              data-ocid="outflow-phase-select"
            >
              <SelectValue placeholder="Select phase…" />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              {PROJECT_PHASES.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-xs font-semibold uppercase tracking-wide">
          Date *
        </Label>
        <Input
          type="date"
          required
          className="rounded-none font-mono"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          data-ocid="outflow-date-input"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-xs font-semibold uppercase tracking-wide">
          Notes
        </Label>
        <Textarea
          className="rounded-none text-sm resize-none h-20"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Usage location, crew, task reference…"
          data-ocid="outflow-notes-input"
        />
      </div>

      <div className="flex justify-end gap-2 pt-1">
        <Button
          type="button"
          variant="outline"
          className="rounded-none"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={
            logOutflow.isPending ||
            !materialId ||
            !quantity ||
            !phase ||
            overLimit
          }
          className="rounded-none bg-orange-600 hover:bg-orange-700 text-white gap-1.5"
          data-ocid="outflow-submit-btn"
        >
          {logOutflow.isPending ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <ArrowUpFromLine className="w-3.5 h-3.5" />
          )}
          Log Outflow
        </Button>
      </div>
    </form>
  );
}

// ─── QR Scanner Panel ─────────────────────────────────────────────────────────

interface QRScannerPanelProps {
  materials: Material[];
  onMaterialScanned: (materialId: string) => void;
  onClose: () => void;
}

function QRScannerPanel({
  materials,
  onMaterialScanned,
  onClose,
}: QRScannerPanelProps) {
  const {
    qrResults,
    isScanning,
    isActive,
    isSupported,
    error,
    isLoading,
    canStartScanning,
    startScanning,
    stopScanning,
    clearResults,
    videoRef,
    canvasRef,
  } = useQRScanner({
    facingMode: "environment",
    scanInterval: 150,
    maxResults: 5,
  });

  const lastResult = qrResults[0];

  const matchedMaterial = useMemo(() => {
    if (!lastResult) return null;
    return (
      materials.find(
        (m) =>
          m.id === lastResult.data ||
          m.name.toLowerCase() === lastResult.data.toLowerCase(),
      ) ?? null
    );
  }, [lastResult, materials]);

  const handleUseResult = useCallback(() => {
    if (matchedMaterial) {
      onMaterialScanned(matchedMaterial.id);
      stopScanning();
      onClose();
    }
  }, [matchedMaterial, onMaterialScanned, stopScanning, onClose]);

  return (
    <div className="flex flex-col gap-4">
      {isSupported === false ? (
        <div className="flex flex-col items-center gap-3 py-8 text-center">
          <CameraOff className="w-10 h-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Camera not supported on this device or browser.
          </p>
        </div>
      ) : (
        <>
          {/* Camera preview */}
          <div className="relative bg-muted border border-border overflow-hidden aspect-video">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              playsInline
              muted
            />
            <canvas ref={canvasRef} className="hidden" />

            {/* Scan overlay */}
            {isActive && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-48 h-48 border-2 border-teal-400 opacity-70">
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-teal-400" />
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-teal-400" />
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-teal-400" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-teal-400" />
                </div>
              </div>
            )}

            {/* Loading overlay */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/60">
                <RefreshCw className="w-6 h-6 text-teal-600 animate-spin" />
              </div>
            )}

            {/* Idle state */}
            {!isActive && !isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <Camera className="w-10 h-10 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">
                  Camera off — press Start to scan
                </p>
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <p className="text-xs text-destructive bg-destructive/10 border border-destructive/30 px-3 py-2">
              {error.message}
            </p>
          )}

          {/* Controls */}
          <div className="flex items-center gap-2">
            {!isScanning ? (
              <Button
                onClick={startScanning}
                disabled={!canStartScanning}
                className="rounded-none bg-teal-600 hover:bg-teal-700 text-white gap-1.5 flex-1"
                data-ocid="qr-start-btn"
              >
                <ScanLine className="w-4 h-4" />
                Start Scanning
              </Button>
            ) : (
              <Button
                onClick={stopScanning}
                variant="outline"
                className="rounded-none gap-1.5 flex-1"
                data-ocid="qr-stop-btn"
              >
                <X className="w-4 h-4" />
                Stop
              </Button>
            )}
            {qrResults.length > 0 && (
              <Button
                variant="ghost"
                className="rounded-none text-xs"
                onClick={clearResults}
              >
                Clear
              </Button>
            )}
          </div>

          {/* Results */}
          {qrResults.length > 0 && (
            <div
              className="border border-border divide-y divide-border"
              data-ocid="qr-results"
            >
              {qrResults.map((result) => {
                const mat = materials.find(
                  (m) =>
                    m.id === result.data ||
                    m.name.toLowerCase() === result.data.toLowerCase(),
                );
                return (
                  <div
                    key={result.timestamp}
                    className="flex items-center gap-3 px-3 py-2.5"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-xs text-foreground truncate">
                        {result.data}
                      </p>
                      {mat ? (
                        <p className="text-xs text-teal-600 dark:text-teal-400 font-medium mt-0.5">
                          ✓ Matched: {mat.name}
                        </p>
                      ) : (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          No material match
                        </p>
                      )}
                    </div>
                    <span className="text-[10px] text-muted-foreground shrink-0">
                      {new Date(result.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Use result CTA */}
          {matchedMaterial && (
            <Button
              onClick={handleUseResult}
              className="rounded-none bg-teal-600 hover:bg-teal-700 text-white gap-1.5"
              data-ocid="qr-use-result-btn"
            >
              <ArrowUpFromLine className="w-4 h-4" />
              Use "{matchedMaterial.name}" for Outflow
            </Button>
          )}
        </>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

type ActiveModal = "inflow" | "outflow" | "qr" | null;
type StatusFilter = "all" | "InStock" | "LowStock" | "Critical" | "OutOfStock";
type CategoryFilter = string;

export default function InventoryPage() {
  const { data: projects } = useProjects();
  const [projectId, setProjectId] = useState("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [prefillMaterialId, setPrefillMaterialId] = useState<
    string | undefined
  >();
  const [activeTab, setActiveTab] = useState("materials");

  const { data: allMaterials, isLoading } = useMaterials(
    projectId === "all" ? undefined : projectId,
  );
  const { data: logs } = useInventoryLogs(
    projectId === "all" ? undefined : projectId,
  );

  // Derived filter values
  const categories = useMemo(() => {
    const cats = Array.from(
      new Set(allMaterials?.map((m) => m.category) ?? []),
    );
    return cats.sort();
  }, [allMaterials]);

  const filteredMaterials = useMemo(() => {
    if (!allMaterials) return [];
    return allMaterials.filter((m) => {
      if (statusFilter !== "all" && m.status !== statusFilter) return false;
      if (categoryFilter !== "all" && m.category !== categoryFilter)
        return false;
      return true;
    });
  }, [allMaterials, statusFilter, categoryFilter]);

  // Stats
  const totalValue = useMemo(
    () =>
      allMaterials?.reduce((s, m) => s + m.currentStock * m.unitCost, 0) ?? 0,
    [allMaterials],
  );
  const lowStockCount =
    allMaterials?.filter((m) => m.status !== "InStock").length ?? 0;
  const criticalCount =
    allMaterials?.filter(
      (m) => m.status === "Critical" || m.status === "OutOfStock",
    ).length ?? 0;

  // Group materials by project for balance view
  const materialsByProject = useMemo(() => {
    const grouped: Record<string, { name: string; materials: Material[] }> = {};
    for (const m of allMaterials ?? []) {
      if (!grouped[m.projectId]) {
        const proj = projects?.find((p) => p.id === m.projectId);
        grouped[m.projectId] = {
          name: proj?.name ?? m.projectId,
          materials: [],
        };
      }
      grouped[m.projectId].materials.push(m);
    }
    return grouped;
  }, [allMaterials, projects]);

  function openOutflowWithMaterial(materialId: string) {
    setPrefillMaterialId(materialId);
    setActiveModal("outflow");
  }

  function closeModal() {
    setActiveModal(null);
    setPrefillMaterialId(undefined);
  }

  return (
    <div data-ocid="inventory-page">
      <PageHeader
        title="Inventory"
        subtitle="Real-time material stock levels, inflows and outflows"
        action={
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="rounded-none gap-1.5"
              onClick={() => {
                setPrefillMaterialId(undefined);
                setActiveModal("outflow");
              }}
              data-ocid="log-outflow-btn"
            >
              <ArrowUpFromLine className="w-3.5 h-3.5" /> Log Outflow
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="rounded-none gap-1.5"
              onClick={() => {
                setPrefillMaterialId(undefined);
                setActiveModal("inflow");
              }}
              data-ocid="log-inflow-btn"
            >
              <ArrowDownToLine className="w-3.5 h-3.5" /> Log Inflow
            </Button>
            <Button
              size="sm"
              className="rounded-none gap-1.5 bg-teal-600 hover:bg-teal-700 text-white"
              onClick={() => setActiveModal("qr")}
              data-ocid="scan-qr-btn"
            >
              <ScanLine className="w-3.5 h-3.5" /> Scan QR
            </Button>
          </div>
        }
      />

      {/* Stats row */}
      <div className="section-grid mb-5">
        <StatCard
          label="Total Materials"
          value={allMaterials?.length ?? 0}
          accent="teal"
          icon={<Package className="w-4 h-4" />}
          data-ocid="stat-total-materials"
        />
        <StatCard
          label="Total Stock Value"
          value={fmt(totalValue)}
          accent="neutral"
          data-ocid="stat-stock-value"
        />
        <StatCard
          label="Below Reorder Level"
          value={lowStockCount}
          accent={lowStockCount > 2 ? "orange" : "neutral"}
          icon={<TrendingDown className="w-4 h-4" />}
          data-ocid="stat-low-stock"
        />
        <StatCard
          label="Critical / Out of Stock"
          value={criticalCount}
          accent={criticalCount > 0 ? "red" : "neutral"}
          icon={<AlertTriangle className="w-4 h-4" />}
          data-ocid="stat-critical"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4 py-3 border-y border-border">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Filters
        </span>
        <Select value={projectId} onValueChange={setProjectId}>
          <SelectTrigger
            className="w-52 h-8 text-sm rounded-none"
            data-ocid="filter-project"
          >
            <SelectValue placeholder="All Projects" />
          </SelectTrigger>
          <SelectContent className="rounded-none">
            <SelectItem value="all">All Projects</SelectItem>
            {projects?.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger
            className="w-40 h-8 text-sm rounded-none"
            data-ocid="filter-category"
          >
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent className="rounded-none">
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as StatusFilter)}
        >
          <SelectTrigger
            className="w-36 h-8 text-sm rounded-none"
            data-ocid="filter-status"
          >
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent className="rounded-none">
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="InStock">In Stock</SelectItem>
            <SelectItem value="LowStock">Low Stock</SelectItem>
            <SelectItem value="Critical">Critical</SelectItem>
            <SelectItem value="OutOfStock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>

        {(statusFilter !== "all" || categoryFilter !== "all") && (
          <Button
            variant="ghost"
            size="sm"
            className="rounded-none h-8 text-xs text-muted-foreground"
            onClick={() => {
              setStatusFilter("all");
              setCategoryFilter("all");
            }}
            data-ocid="clear-filters-btn"
          >
            <X className="w-3 h-3 mr-1" /> Clear filters
          </Button>
        )}
      </div>

      {/* Tabs: materials / balance / history */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="rounded-none h-9 bg-muted/50 mb-4">
          <TabsTrigger
            value="materials"
            className="rounded-none text-xs"
            data-ocid="tab-materials"
          >
            Materials ({filteredMaterials.length})
          </TabsTrigger>
          <TabsTrigger
            value="balance"
            className="rounded-none text-xs"
            data-ocid="tab-balance"
          >
            Project Balance
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="rounded-none text-xs"
            data-ocid="tab-history"
          >
            Transaction History ({logs?.length ?? 0})
          </TabsTrigger>
        </TabsList>

        {/* ── Materials Table ── */}
        <TabsContent value="materials" className="mt-0">
          {!isLoading && filteredMaterials.length === 0 ? (
            <EmptyState
              title="No materials found"
              description="Adjust filters or add materials to start tracking inventory."
              variant="inventory"
              data-ocid="inventory-empty"
            />
          ) : (
            <DataTable<Material>
              columns={MATERIAL_COLUMNS}
              data={filteredMaterials}
              isLoading={isLoading}
              rowKey={(r) => r.id}
              searchable
              searchKeys={["name", "category", "supplier"]}
              data-ocid="inventory-table"
            />
          )}
        </TabsContent>

        {/* ── Project Balance ── */}
        <TabsContent value="balance" className="mt-0">
          {Object.keys(materialsByProject).length === 0 ? (
            <EmptyState
              title="No project data"
              description="No materials assigned to projects yet."
              variant="inventory"
            />
          ) : (
            <div>
              {/* Summary bar */}
              <div className="flex items-center justify-between mb-4 py-2.5 px-4 bg-card border border-border">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Total Inventory Value
                </span>
                <span className="font-display font-bold text-xl text-teal-600 dark:text-teal-400">
                  {fmt(totalValue)}
                </span>
              </div>
              <div
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
                data-ocid="balance-grid"
              >
                {Object.entries(materialsByProject).map(
                  ([pid, { name, materials: mats }]) => (
                    <ProjectBalanceCard
                      key={pid}
                      projectName={name}
                      materials={mats}
                    />
                  ),
                )}
              </div>
            </div>
          )}
        </TabsContent>

        {/* ── Transaction History ── */}
        <TabsContent value="history" className="mt-0">
          {!logs || logs.length === 0 ? (
            <EmptyState
              title="No transactions yet"
              description="Log inflows and outflows to see transaction history here."
              variant="inventory"
              data-ocid="history-empty"
            />
          ) : (
            <DataTable<InventoryLog>
              columns={LOG_COLUMNS}
              data={logs}
              isLoading={false}
              rowKey={(r) => r.id}
              searchable
              searchKeys={["materialName", "notes", "loggedBy"]}
              data-ocid="history-table"
            />
          )}
        </TabsContent>
      </Tabs>

      {/* ── Log Inflow Modal ── */}
      <Dialog
        open={activeModal === "inflow"}
        onOpenChange={(o) => !o && closeModal()}
      >
        <DialogContent
          className="rounded-none max-w-md"
          data-ocid="inflow-modal"
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-display text-base">
              <ArrowDownToLine className="w-4 h-4 text-teal-600" />
              Log Material Inflow
            </DialogTitle>
          </DialogHeader>
          <InflowForm
            materials={allMaterials ?? []}
            onClose={closeModal}
            prefillMaterialId={prefillMaterialId}
          />
        </DialogContent>
      </Dialog>

      {/* ── Log Outflow Modal ── */}
      <Dialog
        open={activeModal === "outflow"}
        onOpenChange={(o) => !o && closeModal()}
      >
        <DialogContent
          className="rounded-none max-w-md"
          data-ocid="outflow-modal"
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-display text-base">
              <ArrowUpFromLine className="w-4 h-4 text-orange-600" />
              Log Material Outflow
            </DialogTitle>
          </DialogHeader>
          <OutflowForm
            materials={allMaterials ?? []}
            onClose={closeModal}
            prefillMaterialId={prefillMaterialId}
          />
        </DialogContent>
      </Dialog>

      {/* ── QR Scanner Modal ── */}
      <Dialog
        open={activeModal === "qr"}
        onOpenChange={(o) => !o && closeModal()}
      >
        <DialogContent className="rounded-none max-w-md" data-ocid="qr-modal">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-display text-base">
              <ScanLine className="w-4 h-4 text-teal-600" />
              Scan Material QR Code
            </DialogTitle>
          </DialogHeader>
          <QRScannerPanel
            materials={allMaterials ?? []}
            onMaterialScanned={openOutflowWithMaterial}
            onClose={closeModal}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
