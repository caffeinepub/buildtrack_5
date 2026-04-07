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
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  Building2,
  ChevronRight,
  Clock,
  Layers,
  MapPin,
  PlusCircle,
  TrendingDown,
  TrendingUp,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { DataTable } from "../components/shared/DataTable";
import { EmptyState } from "../components/shared/EmptyState";
import { PageHeader } from "../components/shared/PageHeader";
import { StatCard } from "../components/shared/StatCard";
import { StatusBadge } from "../components/shared/StatusBadge";
import { useMaterials, useProjects } from "../hooks/useBackend";
import type { Column, Project, ProjectPhase, ProjectStatus } from "../types";

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_FILTERS: (ProjectStatus | "All")[] = [
  "All",
  "Active",
  "OnHold",
  "Completed",
  "Cancelled",
];

const PHASE_OPTIONS: ProjectPhase[] = [
  "Foundation",
  "Structure",
  "Finishing",
  "Handover",
];

const PHASES_SEED = [
  {
    id: "ph1",
    name: "Site Preparation",
    budget: 0,
    status: "Completed" as const,
  },
  {
    id: "ph2",
    name: "Foundation Works",
    budget: 0,
    status: "Completed" as const,
  },
  {
    id: "ph3",
    name: "Structural Frame",
    budget: 0,
    status: "InProgress" as const,
  },
  { id: "ph4", name: "MEP Rough-in", budget: 0, status: "Planned" as const },
  {
    id: "ph5",
    name: "Finishing & Fitout",
    budget: 0,
    status: "Planned" as const,
  },
];

type PhaseStatus = "Planned" | "InProgress" | "Completed";

interface PhaseRow {
  id: string;
  name: string;
  budget: number;
  status: PhaseStatus;
}

// ─── Formatters ───────────────────────────────────────────────────────────────

function fmt(n: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);
}

function fmtFull(n: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(n);
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function BudgetBar({ pct, warn }: { pct: number; warn: boolean }) {
  return (
    <div className="h-1.5 w-full bg-muted overflow-hidden min-w-[60px]">
      <div
        className={`h-full transition-all ${warn ? "bg-orange-500" : "bg-teal-600"}`}
        style={{ width: `${Math.min(pct, 100)}%` }}
      />
    </div>
  );
}

function PhaseStatusBadge({ status }: { status: PhaseStatus }) {
  const map: Record<PhaseStatus, string> = {
    Planned: "bg-muted text-muted-foreground border-border",
    InProgress:
      "bg-teal-500/15 text-teal-700 dark:text-teal-400 border-teal-500/30",
    Completed:
      "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  };
  return (
    <Badge
      variant="outline"
      className={`text-[10px] px-1.5 py-0 border rounded-none font-medium ${map[status]}`}
    >
      {status}
    </Badge>
  );
}

// ─── Add Phase Dialog ─────────────────────────────────────────────────────────

function AddPhaseDialog({
  open,
  onClose,
  projectName,
}: {
  open: boolean;
  onClose: () => void;
  projectName: string;
}) {
  const [form, setForm] = useState({
    name: "",
    budget: "",
    status: "Planned" as PhaseStatus,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return;
    toast.success(`Phase "${form.name}" added to ${projectName}`);
    setForm({ name: "", budget: "", status: "Planned" });
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="rounded-none max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-base">
            Add Phase — {projectName}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="phase-name"
              className="text-xs font-semibold uppercase tracking-wide"
            >
              Phase Name
            </Label>
            <Input
              id="phase-name"
              placeholder="e.g. Foundation Works"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="rounded-none"
              required
              data-ocid="phase-name-input"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="phase-budget"
              className="text-xs font-semibold uppercase tracking-wide"
            >
              Budget Allocation (£)
            </Label>
            <Input
              id="phase-budget"
              type="number"
              min="0"
              placeholder="e.g. 250000"
              value={form.budget}
              onChange={(e) =>
                setForm((f) => ({ ...f, budget: e.target.value }))
              }
              className="rounded-none font-mono"
              data-ocid="phase-budget-input"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-semibold uppercase tracking-wide">
              Status
            </Label>
            <Select
              value={form.status}
              onValueChange={(v) =>
                setForm((f) => ({ ...f, status: v as PhaseStatus }))
              }
            >
              <SelectTrigger
                className="rounded-none"
                data-ocid="phase-status-select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Planned">Planned</SelectItem>
                <SelectItem value="InProgress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 pt-2">
            <Button
              type="submit"
              size="sm"
              className="rounded-none bg-teal-600 hover:bg-teal-700 text-white flex-1"
              data-ocid="add-phase-submit"
            >
              Add Phase
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-none"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Project Detail Panel ─────────────────────────────────────────────────────

function ProjectDetailPanel({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const { data: materials } = useMaterials(project.id);
  const [addPhaseOpen, setAddPhaseOpen] = useState(false);

  const budgetPct = Math.round((project.spent / project.budget) * 100);
  const overBudget = budgetPct > 85;
  const remaining = project.budget - project.spent;

  const phases: PhaseRow[] = PHASES_SEED.slice(0, 4).map((ph, i) => ({
    ...ph,
    budget: Math.round(project.budget * [0.08, 0.22, 0.45, 0.25][i]),
  }));

  const phaseCols: Column<PhaseRow>[] = [
    { key: "name", label: "Phase" },
    {
      key: "budget",
      label: "Allocated",
      align: "right",
      render: (r) => (
        <span className="font-mono text-sm">{fmtFull(r.budget)}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (r) => <PhaseStatusBadge status={r.status} />,
    },
  ];

  const matCols: Column<{
    id: string;
    name: string;
    category: string;
    currentStock: number;
    unit: string;
    status: string;
  }>[] = [
    { key: "name", label: "Material" },
    { key: "category", label: "Category" },
    {
      key: "currentStock",
      label: "Stock",
      align: "right",
      render: (r) => (
        <span className="font-mono text-sm">
          {r.currentStock} {r.unit}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (r) => (
        <StatusBadge
          status={
            r.status as "InStock" | "LowStock" | "Critical" | "OutOfStock"
          }
          size="sm"
        />
      ),
    },
  ];

  return (
    <>
      <div
        className="fixed inset-0 bg-foreground/20 z-40"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        aria-hidden
      />
      <aside
        className="fixed right-0 top-0 h-full w-full max-w-xl bg-card border-l border-border z-50 overflow-y-auto flex flex-col"
        data-ocid="project-detail-panel"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 px-5 py-4 border-b border-border bg-muted/30 sticky top-0 z-10">
          <div className="min-w-0">
            <h2 className="font-display font-semibold text-base text-foreground truncate">
              {project.name}
            </h2>
            <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3 shrink-0" />
              <span className="truncate">{project.site}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <StatusBadge status={project.status} />
            <button
              type="button"
              onClick={onClose}
              className="p-1 hover:bg-muted transition-colors rounded-sm"
              aria-label="Close panel"
              data-ocid="close-detail-panel"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        <div className="flex-1 px-5 py-4 flex flex-col gap-6">
          {/* Overview stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-background border border-border p-3">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">
                Total Budget
              </p>
              <p className="font-mono font-semibold text-sm text-foreground">
                {fmtFull(project.budget)}
              </p>
            </div>
            <div className="bg-background border border-border p-3">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">
                Spent
              </p>
              <p
                className={`font-mono font-semibold text-sm ${overBudget ? "text-orange-600 dark:text-orange-400" : "text-foreground"}`}
              >
                {fmtFull(project.spent)}
              </p>
            </div>
            <div className="bg-background border border-border p-3">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">
                Remaining
              </p>
              <p
                className={`font-mono font-semibold text-sm flex items-center gap-1 ${remaining < 0 ? "text-destructive" : "text-teal-600 dark:text-teal-400"}`}
              >
                {remaining < 0 ? (
                  <TrendingDown className="w-3 h-3" />
                ) : (
                  <TrendingUp className="w-3 h-3" />
                )}
                {fmtFull(Math.abs(remaining))}
              </p>
            </div>
          </div>

          {/* Budget progress */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-muted-foreground font-medium">
                Budget Utilisation
              </span>
              <span
                className={`font-mono font-semibold ${overBudget ? "text-orange-600 dark:text-orange-400" : "text-foreground"}`}
              >
                {budgetPct}%
              </span>
            </div>
            <BudgetBar pct={budgetPct} warn={overBudget} />
            <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
              <span>£0</span>
              <span>{fmt(project.budget)}</span>
            </div>
          </div>

          {/* Progress */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-muted-foreground font-medium">
                Overall Progress
              </span>
              <span className="font-mono font-semibold text-teal-600 dark:text-teal-400">
                {project.progress}%
              </span>
            </div>
            <div className="h-2 bg-muted overflow-hidden">
              <div
                className="h-full bg-teal-600 transition-all"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>

          {/* Meta */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
            <div>
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-0.5">
                Current Phase
              </p>
              <Badge
                variant="outline"
                className="text-[10px] rounded-none border-border text-muted-foreground"
              >
                {project.phase}
              </Badge>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-0.5">
                Timeline
              </p>
              <p className="font-mono text-xs text-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {project.startDate}
                {project.endDate ? ` → ${project.endDate}` : ""}
              </p>
            </div>
          </div>

          {project.description && (
            <p className="text-xs text-muted-foreground bg-muted/40 px-3 py-2 border-l-2 border-teal-500">
              {project.description}
            </p>
          )}

          <Separator />

          {/* Phases */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" /> Project Phases
              </h3>
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-xs rounded-none gap-1"
                onClick={() => setAddPhaseOpen(true)}
                data-ocid="add-phase-btn"
              >
                <PlusCircle className="w-3.5 h-3.5" /> Add Phase
              </Button>
            </div>
            <DataTable<PhaseRow>
              columns={phaseCols}
              data={phases}
              rowKey={(r) => r.id}
              data-ocid="phases-table"
            />
          </div>

          <Separator />

          {/* Materials summary */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
              Materials on Site ({materials?.length ?? 0} items)
            </h3>
            {materials && materials.length > 0 ? (
              <DataTable
                columns={matCols}
                data={materials}
                rowKey={(r) => r.id}
                data-ocid="project-materials-table"
              />
            ) : (
              <p className="text-xs text-muted-foreground py-3 text-center">
                No materials assigned to this project.
              </p>
            )}
          </div>

          {/* Budget breakdown */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
              Budget Breakdown
            </h3>
            <div className="border border-border divide-y divide-border">
              {[
                { cat: "Labour", pct: 38 },
                { cat: "Materials", pct: 41 },
                { cat: "Equipment", pct: 12 },
                { cat: "Subcontractors", pct: 6 },
                { cat: "Contingency", pct: 3 },
              ].map(({ cat, pct }) => {
                const amount = project.spent * (pct / 100);
                return (
                  <div key={cat} className="px-3 py-2 flex items-center gap-3">
                    <span className="text-xs text-foreground w-28 shrink-0">
                      {cat}
                    </span>
                    <div className="flex-1 h-1.5 bg-muted overflow-hidden">
                      <div
                        className="h-full bg-teal-600/70"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground w-20 text-right shrink-0">
                      {fmtFull(amount)}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground w-8 text-right shrink-0">
                      {pct}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </aside>

      <AddPhaseDialog
        open={addPhaseOpen}
        onClose={() => setAddPhaseOpen(false)}
        projectName={project.name}
      />
    </>
  );
}

// ─── Create Project Dialog ────────────────────────────────────────────────────

interface NewProjectForm {
  name: string;
  site: string;
  description: string;
  budget: string;
  status: ProjectStatus;
  phase: ProjectPhase;
  startDate: string;
  endDate: string;
}

const EMPTY_FORM: NewProjectForm = {
  name: "",
  site: "",
  description: "",
  budget: "",
  status: "Active",
  phase: "Foundation",
  startDate: "",
  endDate: "",
};

function CreateProjectDialog({
  open,
  onClose,
}: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState<NewProjectForm>(EMPTY_FORM);

  function set<K extends keyof NewProjectForm>(k: K, v: NewProjectForm[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.site.trim() || !form.budget) return;
    toast.success(`Project "${form.name}" created successfully`);
    setForm(EMPTY_FORM);
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="rounded-none max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-base">
            New Construction Project
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="proj-name"
              className="text-xs font-semibold uppercase tracking-wide"
            >
              Project Name *
            </Label>
            <Input
              id="proj-name"
              placeholder="e.g. Riverside Tower Block B"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className="rounded-none"
              required
              data-ocid="proj-name-input"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="proj-site"
              className="text-xs font-semibold uppercase tracking-wide"
            >
              Site Location *
            </Label>
            <Input
              id="proj-site"
              placeholder="e.g. Riverside Tech Park"
              value={form.site}
              onChange={(e) => set("site", e.target.value)}
              className="rounded-none"
              required
              data-ocid="proj-site-input"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="proj-description"
              className="text-xs font-semibold uppercase tracking-wide"
            >
              Description
            </Label>
            <Textarea
              id="proj-description"
              placeholder="Brief project scope and objectives..."
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className="rounded-none text-sm resize-none"
              rows={3}
              data-ocid="proj-description-input"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="proj-budget"
              className="text-xs font-semibold uppercase tracking-wide"
            >
              Total Budget (£) *
            </Label>
            <Input
              id="proj-budget"
              type="number"
              min="0"
              placeholder="e.g. 2500000"
              value={form.budget}
              onChange={(e) => set("budget", e.target.value)}
              className="rounded-none font-mono"
              required
              data-ocid="proj-budget-input"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wide">
                Status
              </Label>
              <Select
                value={form.status}
                onValueChange={(v) => set("status", v as ProjectStatus)}
              >
                <SelectTrigger
                  className="rounded-none"
                  data-ocid="proj-status-select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="OnHold">On Hold</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wide">
                Initial Phase
              </Label>
              <Select
                value={form.phase}
                onValueChange={(v) => set("phase", v as ProjectPhase)}
              >
                <SelectTrigger
                  className="rounded-none"
                  data-ocid="proj-phase-select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PHASE_OPTIONS.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="proj-start"
                className="text-xs font-semibold uppercase tracking-wide"
              >
                Start Date
              </Label>
              <Input
                id="proj-start"
                type="date"
                value={form.startDate}
                onChange={(e) => set("startDate", e.target.value)}
                className="rounded-none font-mono"
                data-ocid="proj-start-date"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="proj-end"
                className="text-xs font-semibold uppercase tracking-wide"
              >
                End Date
              </Label>
              <Input
                id="proj-end"
                type="date"
                value={form.endDate}
                onChange={(e) => set("endDate", e.target.value)}
                className="rounded-none font-mono"
                data-ocid="proj-end-date"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              type="submit"
              size="sm"
              className="rounded-none bg-teal-600 hover:bg-teal-700 text-white flex-1"
              data-ocid="create-project-submit"
            >
              <Building2 className="w-4 h-4 mr-1.5" /> Create Project
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-none"
              onClick={onClose}
              data-ocid="create-project-cancel"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Table Columns ────────────────────────────────────────────────────────────

function buildColumns(onView: (p: Project) => void): Column<Project>[] {
  return [
    {
      key: "name",
      label: "Name",
      sortable: true,
      render: (r) => (
        <div className="min-w-0">
          <p className="font-medium text-sm text-foreground truncate max-w-[180px]">
            {r.name}
          </p>
          <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
            <MapPin className="w-2.5 h-2.5" />
            {r.site}
          </p>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (r) => <StatusBadge status={r.status} size="sm" />,
    },
    {
      key: "phase",
      label: "Phase",
      render: (r) => (
        <Badge
          variant="outline"
          className="text-[10px] rounded-none border-border text-muted-foreground"
        >
          {r.phase}
        </Badge>
      ),
    },
    {
      key: "budget",
      label: "Budget",
      sortable: true,
      align: "right",
      render: (r) => <span className="font-mono text-sm">{fmt(r.budget)}</span>,
    },
    {
      key: "spent",
      label: "Spent",
      sortable: true,
      align: "right",
      render: (r) => {
        const pct = Math.round((r.spent / r.budget) * 100);
        const warn = pct > 85;
        return (
          <div className="flex flex-col items-end gap-1">
            <span
              className={`font-mono text-sm font-semibold ${warn ? "text-orange-600 dark:text-orange-400" : "text-foreground"}`}
            >
              {fmt(r.spent)}
            </span>
            <div className="flex items-center gap-1.5 w-full justify-end">
              <BudgetBar pct={pct} warn={warn} />
              <span className="text-[10px] font-mono text-muted-foreground w-8 text-right">
                {pct}%
              </span>
            </div>
          </div>
        );
      },
    },
    {
      key: "progress",
      label: "Progress",
      sortable: true,
      align: "right",
      render: (r) => (
        <div className="flex items-center gap-2 justify-end">
          <div className="h-1.5 w-14 bg-muted overflow-hidden">
            <div
              className="h-full bg-teal-600"
              style={{ width: `${r.progress}%` }}
            />
          </div>
          <span className="font-mono text-xs text-teal-600 dark:text-teal-400 w-8">
            {r.progress}%
          </span>
        </div>
      ),
    },
    {
      key: "startDate",
      label: "Started",
      sortable: true,
      render: (r) => (
        <span className="font-mono text-xs text-muted-foreground">
          {r.startDate}
        </span>
      ),
    },
    {
      key: "id",
      label: "",
      render: (r) => (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onView(r);
          }}
          className="flex items-center gap-0.5 text-xs text-teal-600 dark:text-teal-400 hover:underline"
          data-ocid="view-project-btn"
        >
          View <ChevronRight className="w-3 h-3" />
        </button>
      ),
    },
  ];
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const { data: projects, isLoading } = useProjects();
  const [filter, setFilter] = useState<ProjectStatus | "All">("All");
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  const filtered =
    projects?.filter((p) => filter === "All" || p.status === filter) ?? [];
  const active = projects?.filter((p) => p.status === "Active").length ?? 0;
  const totalBudget = projects?.reduce((s, p) => s + p.budget, 0) ?? 0;
  const totalSpent = projects?.reduce((s, p) => s + p.spent, 0) ?? 0;

  const columns = buildColumns((p) => setSelectedProject(p));

  return (
    <div data-ocid="projects-page">
      <PageHeader
        title="Projects"
        subtitle="All construction projects across sites"
        action={
          <div className="flex items-center gap-2">
            <div className="flex border border-border">
              <button
                type="button"
                onClick={() => setViewMode("cards")}
                className={`text-xs px-3 py-1.5 font-medium transition-colors ${viewMode === "cards" ? "bg-teal-600 text-white" : "bg-card text-muted-foreground hover:bg-muted"}`}
                data-ocid="view-mode-cards"
              >
                Cards
              </button>
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`text-xs px-3 py-1.5 font-medium transition-colors ${viewMode === "table" ? "bg-teal-600 text-white" : "bg-card text-muted-foreground hover:bg-muted"}`}
                data-ocid="view-mode-table"
              >
                Table
              </button>
            </div>
            <Button
              size="sm"
              className="rounded-none gap-1.5 bg-teal-600 hover:bg-teal-700 text-white"
              onClick={() => setCreateOpen(true)}
              data-ocid="new-project-btn"
            >
              <Building2 className="w-4 h-4" /> New Project
            </Button>
          </div>
        }
        data-ocid="projects-header"
      />

      {/* Summary stats */}
      <div className="section-grid mb-5">
        <StatCard
          label="Total Projects"
          value={projects?.length ?? 0}
          accent="teal"
          icon={<Building2 className="w-4 h-4" />}
        />
        <StatCard
          label="Active Projects"
          value={active}
          accent="teal"
          icon={<TrendingUp className="w-4 h-4" />}
        />
        <StatCard
          label="Total Budget"
          value={fmt(totalBudget)}
          accent="neutral"
        />
        <StatCard
          label="Total Spent"
          value={fmt(totalSpent)}
          sub={`${totalBudget ? Math.round((totalSpent / totalBudget) * 100) : 0}% utilised`}
          accent={
            totalBudget && totalSpent / totalBudget > 0.85
              ? "orange"
              : "neutral"
          }
        />
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap gap-1 mb-4" data-ocid="project-filter-bar">
        {STATUS_FILTERS.map((s) => (
          <button
            type="button"
            key={s}
            onClick={() => setFilter(s)}
            data-ocid={`filter-${s.toLowerCase()}`}
            className={`text-xs px-3 py-1.5 border font-medium transition-colors ${
              filter === s
                ? "bg-teal-600 text-white border-teal-600"
                : "bg-card border-border text-muted-foreground hover:border-teal-500/50"
            }`}
          >
            {s === "All"
              ? `All (${projects?.length ?? 0})`
              : `${s} (${projects?.filter((p) => p.status === s).length ?? 0})`}
          </button>
        ))}
      </div>

      {/* Content */}
      {isLoading ? (
        viewMode === "cards" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
              <Skeleton key={i} className="h-56 rounded-none" />
            ))}
          </div>
        ) : (
          <Skeleton className="h-64 rounded-none" />
        )
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No projects found"
          description={
            filter === "All"
              ? "Create your first project to get started."
              : "No projects match the selected filter."
          }
          variant="projects"
          data-ocid="projects-empty"
        />
      ) : viewMode === "cards" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onView={() => setSelectedProject(project)}
            />
          ))}
        </div>
      ) : (
        <DataTable<Project>
          columns={columns}
          data={filtered}
          rowKey={(r) => r.id}
          searchable
          searchKeys={["name", "site"]}
          onRowClick={(r) => setSelectedProject(r)}
          data-ocid="projects-table"
        />
      )}

      {/* Dialogs / panels */}
      <CreateProjectDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
      />
      {selectedProject && (
        <ProjectDetailPanel
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  onView,
}: { project: Project; onView: () => void }) {
  const budgetPct = Math.round((project.spent / project.budget) * 100);
  const overBudget = budgetPct > 85;

  return (
    <button
      type="button"
      className="bg-card border border-border hover:border-teal-500/40 transition-all shadow-elevation-1 p-4 flex flex-col gap-3 cursor-pointer text-left w-full"
      data-ocid="project-card"
      onClick={onView}
      aria-label={`View ${project.name}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-display font-semibold text-sm text-foreground truncate">
            {project.name}
          </h3>
          <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span className="truncate">{project.site}</span>
          </div>
        </div>
        <StatusBadge status={project.status} />
      </div>

      {/* Progress */}
      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-mono font-medium text-teal-600 dark:text-teal-400">
            {project.progress}%
          </span>
        </div>
        <div className="h-1.5 bg-muted overflow-hidden">
          <div
            className="h-full bg-teal-600"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      {/* Phase + Date */}
      <div className="flex items-center gap-2">
        <Badge
          variant="outline"
          className="text-[10px] rounded-none border-border text-muted-foreground"
        >
          {project.phase}
        </Badge>
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {project.startDate}
          {project.endDate ? ` – ${project.endDate}` : ""}
        </span>
      </div>

      {/* Budget */}
      <div className="border-t border-border pt-3 grid grid-cols-2 gap-2">
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
            Budget
          </p>
          <p className="font-mono text-sm font-semibold text-foreground">
            {fmt(project.budget)}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
            Spent
          </p>
          <p
            className={`font-mono text-sm font-semibold ${overBudget ? "text-orange-600 dark:text-orange-400" : "text-foreground"}`}
          >
            {fmt(project.spent)}{" "}
            <span className="text-[10px] font-normal">({budgetPct}%)</span>
          </p>
        </div>
      </div>

      {project.description && (
        <p className="text-xs text-muted-foreground line-clamp-2 border-t border-border pt-2">
          {project.description}
        </p>
      )}

      <div className="flex justify-end">
        <span className="text-xs text-teal-600 dark:text-teal-400 flex items-center gap-0.5 hover:underline">
          View details <ChevronRight className="w-3 h-3" />
        </span>
      </div>
    </button>
  );
}
