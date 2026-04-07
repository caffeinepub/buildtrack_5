import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Clock,
  DollarSign,
  TrendingDown,
  TrendingUp,
  TriangleAlert,
} from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageHeader } from "../components/shared/PageHeader";
import { StatCard } from "../components/shared/StatCard";
import {
  useBudgetVariance,
  useInvoices,
  useProjects,
} from "../hooks/useBackend";
import type { BudgetVariance, Invoice, Project } from "../types";

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

function daysSince(dateStr: string) {
  return Math.floor(
    (Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24),
  );
}

// ─── Budget categories per project (derived from invoices + project budget) ──

const CATEGORIES = [
  "Material",
  "Labor",
  "Equipment",
  "Service",
  "Overhead",
] as const;
type BudgetCategory = (typeof CATEGORIES)[number];

const CATEGORY_ALLOCATION: Record<BudgetCategory, number> = {
  Material: 0.42,
  Labor: 0.28,
  Equipment: 0.15,
  Service: 0.08,
  Overhead: 0.07,
};

interface CategoryRow {
  category: BudgetCategory;
  allocated: number;
  spent: number;
  variance: number;
  pct: number;
}

function buildCategoryRows(
  project: Project,
  invoices: Invoice[],
): CategoryRow[] {
  const projectInvoices = invoices.filter((i) => i.projectId === project.id);
  return CATEGORIES.map((cat) => {
    const allocated = project.budget * CATEGORY_ALLOCATION[cat];
    const spent = projectInvoices
      .filter((i) => i.category === cat || (cat === "Overhead" && false))
      .reduce((s, i) => s + i.amount, 0);
    // Distribute remaining spend across categories proportionally for demo realism
    const adjustedSpent =
      spent > 0 ? spent : project.spent * CATEGORY_ALLOCATION[cat] * 0.9;
    return {
      category: cat,
      allocated,
      spent: adjustedSpent,
      variance: allocated - adjustedSpent,
      pct: Math.round((adjustedSpent / allocated) * 100),
    };
  });
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function UsagePill({ pct }: { pct: number }) {
  if (pct > 100)
    return (
      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono font-bold bg-destructive/10 text-destructive border border-destructive/30">
        <TriangleAlert className="w-3 h-3" />
        {pct}%
      </span>
    );
  if (pct > 80)
    return (
      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono font-bold bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/30">
        <AlertTriangle className="w-3 h-3" />
        {pct}%
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono font-medium bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-500/30">
      <CheckCircle2 className="w-3 h-3" />
      {pct}%
    </span>
  );
}

function InvoiceStatusBadge({ status }: { status: Invoice["status"] }) {
  const config: Record<Invoice["status"], { label: string; cls: string }> = {
    Paid: {
      label: "Paid",
      cls: "bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-500/30",
    },
    Approved: {
      label: "Approved",
      cls: "bg-primary/10 text-primary border-primary/30",
    },
    Pending: {
      label: "Pending",
      cls: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30",
    },
    Overdue: {
      label: "Overdue",
      cls: "bg-destructive/10 text-destructive border-destructive/30",
    },
    Draft: {
      label: "Draft",
      cls: "bg-muted text-muted-foreground border-border",
    },
    Disputed: {
      label: "Disputed",
      cls: "bg-accent/10 text-accent-foreground border-accent/30",
    },
    Cancelled: {
      label: "Cancelled",
      cls: "bg-muted text-muted-foreground border-border",
    },
  };
  const { label, cls } = config[status];
  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide border ${cls}`}
    >
      {label}
    </span>
  );
}

// ─── Budget Category Table ────────────────────────────────────────────────────

function BudgetCategoryTable({
  project,
  invoices,
}: {
  project: Project;
  invoices: Invoice[];
}) {
  const rows = buildCategoryRows(project, invoices);
  const totalAllocated = rows.reduce((s, r) => s + r.allocated, 0);
  const totalSpent = rows.reduce((s, r) => s + r.spent, 0);

  return (
    <div className="border border-border overflow-hidden">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-muted/60 border-b border-border">
            <th className="px-3 py-2 text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
              Category
            </th>
            <th className="px-3 py-2 text-right text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
              Allocated
            </th>
            <th className="px-3 py-2 text-right text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
              Spent
            </th>
            <th className="px-3 py-2 text-right text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
              Variance
            </th>
            <th className="px-3 py-2 text-center text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
              % Used
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.category}
              className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
              data-ocid="finance-category-row"
            >
              <td className="px-3 py-2.5 font-medium text-foreground">
                {row.category}
              </td>
              <td className="px-3 py-2.5 text-right font-mono text-muted-foreground">
                {fmtFull(row.allocated)}
              </td>
              <td className="px-3 py-2.5 text-right font-mono text-foreground">
                {fmtFull(row.spent)}
              </td>
              <td
                className={`px-3 py-2.5 text-right font-mono font-semibold ${
                  row.variance >= 0
                    ? "text-teal-600 dark:text-teal-400"
                    : "text-destructive"
                }`}
              >
                {row.variance >= 0 ? "+" : ""}
                {fmtFull(row.variance)}
              </td>
              <td className="px-3 py-2.5">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-full h-1 bg-muted overflow-hidden">
                    <div
                      className={`h-full ${
                        row.pct > 100
                          ? "bg-destructive"
                          : row.pct > 80
                            ? "bg-orange-500"
                            : "bg-teal-600"
                      }`}
                      style={{ width: `${Math.min(row.pct, 100)}%` }}
                    />
                  </div>
                  <UsagePill pct={row.pct} />
                </div>
              </td>
            </tr>
          ))}
          <tr className="bg-muted/40 border-t-2 border-border">
            <td className="px-3 py-2.5 font-bold text-foreground">Total</td>
            <td className="px-3 py-2.5 text-right font-mono font-bold text-foreground">
              {fmtFull(totalAllocated)}
            </td>
            <td className="px-3 py-2.5 text-right font-mono font-bold text-foreground">
              {fmtFull(totalSpent)}
            </td>
            <td
              className={`px-3 py-2.5 text-right font-mono font-bold ${
                totalAllocated - totalSpent >= 0
                  ? "text-teal-600 dark:text-teal-400"
                  : "text-destructive"
              }`}
            >
              {totalAllocated - totalSpent >= 0 ? "+" : ""}
              {fmtFull(totalAllocated - totalSpent)}
            </td>
            <td className="px-3 py-2.5 text-center">
              <UsagePill
                pct={Math.round((totalSpent / totalAllocated) * 100)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// ─── Bar Chart ────────────────────────────────────────────────────────────────

interface ChartDatum {
  name: string;
  Budget: number;
  Actual: number;
}

function BudgetActualChart({ data }: { data: ChartDatum[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart
        data={data}
        margin={{ top: 8, right: 8, left: 8, bottom: 8 }}
        barCategoryGap="30%"
        barGap={3}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="oklch(var(--border))"
          vertical={false}
        />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 10, fill: "oklch(var(--muted-foreground))" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={(v: number) =>
            new Intl.NumberFormat("en-GB", {
              notation: "compact",
              style: "currency",
              currency: "GBP",
              maximumFractionDigits: 0,
            }).format(v)
          }
          tick={{ fontSize: 10, fill: "oklch(var(--muted-foreground))" }}
          axisLine={false}
          tickLine={false}
          width={60}
        />
        <Tooltip
          contentStyle={{
            background: "oklch(var(--card))",
            border: "1px solid oklch(var(--border))",
            borderRadius: "0",
            fontSize: "12px",
            color: "oklch(var(--foreground))",
          }}
          formatter={(value: number) => fmtFull(value)}
        />
        <Bar
          dataKey="Budget"
          fill="oklch(var(--chart-1, 0.6 0.15 185))"
          maxBarSize={28}
        />
        <Bar dataKey="Actual" maxBarSize={28}>
          {data.map((entry) => (
            <Cell
              key={`cell-${entry.name}`}
              fill={
                entry.Actual > entry.Budget
                  ? "oklch(var(--chart-2, 0.7 0.18 50))"
                  : "oklch(var(--chart-3, 0.55 0.05 240))"
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─── Pending Payments ─────────────────────────────────────────────────────────

function PendingPayments({ invoices }: { invoices: Invoice[] }) {
  const pending = invoices.filter(
    (i) => i.status === "Pending" || i.status === "Overdue",
  );

  if (pending.length === 0) {
    return (
      <div className="border border-border px-4 py-8 text-center text-sm text-muted-foreground">
        No pending payments
      </div>
    );
  }

  return (
    <div className="border border-border overflow-hidden">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-muted/60 border-b border-border">
            <th className="px-3 py-2 text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
              Invoice
            </th>
            <th className="px-3 py-2 text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
              Supplier
            </th>
            <th className="px-3 py-2 text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-wide hidden md:table-cell">
              Project
            </th>
            <th className="px-3 py-2 text-right text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
              Amount
            </th>
            <th className="px-3 py-2 text-center text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
              Due
            </th>
            <th className="px-3 py-2 text-center text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {pending.map((inv) => {
            const overdueDays =
              inv.status === "Overdue" ? daysSince(inv.dueDate) : 0;
            return (
              <tr
                key={inv.id}
                className={`border-b border-border last:border-0 hover:bg-muted/30 transition-colors ${
                  inv.status === "Overdue" ? "bg-destructive/5" : ""
                }`}
                data-ocid="finance-pending-row"
              >
                <td className="px-3 py-2.5">
                  <span className="font-mono font-medium text-foreground">
                    {inv.invoiceNumber}
                  </span>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {inv.category}
                  </p>
                </td>
                <td className="px-3 py-2.5 text-foreground">{inv.supplier}</td>
                <td className="px-3 py-2.5 text-muted-foreground hidden md:table-cell">
                  {inv.projectName}
                </td>
                <td className="px-3 py-2.5 text-right font-mono font-semibold text-foreground">
                  {fmtFull(inv.amount)}
                </td>
                <td className="px-3 py-2.5 text-center">
                  {inv.status === "Overdue" ? (
                    <span className="inline-flex flex-col items-center gap-0.5">
                      <span className="text-[10px] font-mono text-destructive font-semibold">
                        {inv.dueDate}
                      </span>
                      <span className="text-[9px] text-destructive font-bold bg-destructive/10 px-1 py-px">
                        {overdueDays}d overdue
                      </span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {inv.dueDate}
                    </span>
                  )}
                </td>
                <td className="px-3 py-2.5 text-center">
                  <InvoiceStatusBadge status={inv.status} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── Create Budget Form ───────────────────────────────────────────────────────

interface CreateBudgetFormProps {
  projects: Project[];
  onClose: () => void;
}

function CreateBudgetForm({ projects, onClose }: CreateBudgetFormProps) {
  const [projectId, setProjectId] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [saved, setSaved] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      data-ocid="finance-create-budget-form"
    >
      <div className="space-y-1">
        <label
          htmlFor="budget-project"
          className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
        >
          Project
        </label>
        <Select value={projectId} onValueChange={setProjectId} required>
          <SelectTrigger
            className="rounded-none text-sm"
            data-ocid="finance-budget-project-select"
          >
            <SelectValue placeholder="Select project…" />
          </SelectTrigger>
          <SelectContent>
            {projects.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <label
          htmlFor="budget-category"
          className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
        >
          Category
        </label>
        <Select value={category} onValueChange={setCategory} required>
          <SelectTrigger
            className="rounded-none text-sm"
            data-ocid="finance-budget-category-select"
          >
            <SelectValue placeholder="Select category…" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <label
          htmlFor="budget-amount"
          className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
        >
          Allocated Amount (£)
        </label>
        <input
          id="budget-amount"
          type="number"
          min={0}
          step={1000}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g. 250000"
          className="w-full border border-input bg-background px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          required
          data-ocid="finance-budget-amount-input"
        />
      </div>

      <div className="flex items-center justify-end gap-2 pt-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-none"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          size="sm"
          className="rounded-none"
          data-ocid="finance-budget-submit"
          disabled={saved}
        >
          {saved ? "Saved ✓" : "Create Budget"}
        </Button>
      </div>
    </form>
  );
}

// ─── Spending Report ──────────────────────────────────────────────────────────

function SpendingReport({
  projects,
  invoices,
}: {
  projects: Project[];
  invoices: Invoice[];
}) {
  const phases = ["Foundation", "Structure", "Finishing", "Handover"] as const;

  const phaseSpend: Record<string, number> = {};
  for (const p of projects) {
    const invTotal = invoices
      .filter((i) => i.projectId === p.id)
      .reduce((s, i) => s + i.amount, 0);
    const amount = invTotal > 0 ? invTotal : p.spent * 0.4;
    phaseSpend[p.phase] = (phaseSpend[p.phase] ?? 0) + amount;
  }

  const categorySpend: Record<string, number> = {};
  for (const inv of invoices) {
    categorySpend[inv.category] =
      (categorySpend[inv.category] ?? 0) + inv.amount;
  }
  // fill remaining spend not captured by invoices
  const invoiceTotal = Object.values(categorySpend).reduce((s, v) => s + v, 0);
  const projectTotal = projects.reduce((s, p) => s + p.spent, 0);
  const gap = projectTotal - invoiceTotal;
  if (gap > 0) {
    categorySpend.Material = (categorySpend.Material ?? 0) + gap * 0.5;
    categorySpend.Labor = (categorySpend.Labor ?? 0) + gap * 0.3;
    categorySpend.Equipment = (categorySpend.Equipment ?? 0) + gap * 0.2;
  }

  const grandTotal = Object.values(categorySpend).reduce((s, v) => s + v, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* By Phase */}
      <div>
        <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          Spend by Phase
        </h3>
        <div className="border border-border overflow-hidden">
          {phases
            .filter((ph) => phaseSpend[ph] !== undefined)
            .map((ph) => {
              const amt = phaseSpend[ph] ?? 0;
              const pct = grandTotal > 0 ? (amt / grandTotal) * 100 : 0;
              return (
                <div
                  key={ph}
                  className="px-4 py-3 border-b border-border last:border-0 flex items-center gap-3"
                  data-ocid="finance-phase-row"
                >
                  <span className="text-xs font-medium text-foreground w-24 shrink-0">
                    {ph}
                  </span>
                  <div className="flex-1 h-1.5 bg-muted overflow-hidden">
                    <div
                      className="h-full bg-teal-600"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="font-mono text-xs text-foreground shrink-0 w-28 text-right">
                    {fmtFull(amt)}
                  </span>
                </div>
              );
            })}
        </div>
      </div>

      {/* By Material Category */}
      <div>
        <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          Spend by Material Category
        </h3>
        <div className="border border-border overflow-hidden">
          {Object.entries(categorySpend)
            .sort((a, b) => b[1] - a[1])
            .map(([cat, amt]) => {
              const pct = grandTotal > 0 ? (amt / grandTotal) * 100 : 0;
              return (
                <div
                  key={cat}
                  className="px-4 py-3 border-b border-border last:border-0 flex items-center gap-3"
                  data-ocid="finance-matcat-row"
                >
                  <span className="text-xs font-medium text-foreground w-24 shrink-0">
                    {cat}
                  </span>
                  <div className="flex-1 h-1.5 bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="font-mono text-xs text-foreground shrink-0 w-28 text-right">
                    {fmtFull(amt)}
                  </span>
                </div>
              );
            })}
          <div className="px-4 py-3 bg-muted/40 border-t border-border flex items-center justify-between">
            <span className="text-xs font-bold text-foreground">Total</span>
            <span className="font-mono text-xs font-bold text-foreground">
              {fmtFull(grandTotal)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type ActiveTab = "overview" | "report" | "pending";

export default function FinancePage() {
  const { data: variance, isLoading: varLoading } = useBudgetVariance();
  const { data: projects, isLoading: projLoading } = useProjects();
  const { data: invoices, isLoading: invLoading } = useInvoices();

  const [selectedProjectId, setSelectedProjectId] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");
  const [showCreateForm, setShowCreateForm] = useState(false);

  const isLoading = varLoading || projLoading || invLoading;

  const allInvoices = invoices ?? [];
  const allProjects = projects ?? [];
  const allVariance = variance ?? [];

  // Derived summary stats
  const totalAllocated = allVariance.reduce((s, v) => s + v.allocated, 0);
  const totalSpent = allVariance.reduce((s, v) => s + v.spent, 0);
  const totalVariance = totalAllocated - totalSpent;
  const overdueAmount = allInvoices
    .filter((i) => i.status === "Overdue")
    .reduce((s, i) => s + i.amount, 0);
  const atRisk = allVariance.filter((v) => v.spent / v.allocated > 0.85).length;

  // Chart data: budget vs actual per project (abbreviated names)
  const chartData: ChartDatum[] = allVariance.map((v) => ({
    name: v.projectName.split(" ").slice(0, 2).join(" "),
    Budget: v.allocated,
    Actual: v.spent,
  }));

  // Filtered project for category table
  const filteredProject =
    selectedProjectId !== "all"
      ? allProjects.find((p) => p.id === selectedProjectId)
      : undefined;

  const TABS: { id: ActiveTab; label: string }[] = [
    { id: "overview", label: "Budget Overview" },
    { id: "report", label: "Spending Report" },
    { id: "pending", label: "Pending Payments" },
  ];

  return (
    <div data-ocid="finance-page">
      <PageHeader
        title="Financial Overview"
        subtitle="Budget tracking, cost analysis and variance reporting"
        action={
          <Button
            size="sm"
            variant="outline"
            className="rounded-none text-xs font-semibold uppercase tracking-wide"
            onClick={() => setShowCreateForm((v) => !v)}
            data-ocid="finance-create-budget-btn"
          >
            {showCreateForm ? "Close" : "+ Create Budget"}
          </Button>
        }
        data-ocid="finance-header"
      />

      {/* Create Budget Form */}
      {showCreateForm && (
        <Card className="rounded-none border border-border bg-card shadow-elevation-1 p-5 mb-5">
          <h2 className="font-display font-semibold text-sm text-foreground mb-4">
            New Budget Allocation
          </h2>
          <CreateBudgetForm
            projects={allProjects}
            onClose={() => setShowCreateForm(false)}
          />
        </Card>
      )}

      {/* Summary stat cards */}
      <div className="section-grid mb-6">
        <StatCard
          label="Total Budget Allocated"
          value={isLoading ? "—" : fmt(totalAllocated)}
          accent="neutral"
          icon={<DollarSign className="w-4 h-4" />}
          data-ocid="stat-total-budget"
        />
        <StatCard
          label="Total Spent"
          value={isLoading ? "—" : fmt(totalSpent)}
          sub={
            totalAllocated
              ? `${Math.round((totalSpent / totalAllocated) * 100)}% of allocation`
              : undefined
          }
          accent={
            totalAllocated && totalSpent / totalAllocated > 0.85
              ? "orange"
              : "teal"
          }
          icon={<TrendingUp className="w-4 h-4" />}
          data-ocid="stat-total-spent"
        />
        <StatCard
          label="Overall Variance"
          value={isLoading ? "—" : fmt(Math.abs(totalVariance))}
          sub={totalVariance >= 0 ? "Under budget" : "Over budget"}
          accent={totalVariance < 0 ? "red" : "teal"}
          icon={<TrendingDown className="w-4 h-4" />}
          data-ocid="stat-remaining"
        />
        <StatCard
          label="Projects at Risk"
          value={isLoading ? "—" : `${atRisk} / ${allProjects.length}`}
          sub={
            overdueAmount > 0
              ? `${fmt(overdueAmount)} overdue`
              : "No overdue invoices"
          }
          accent={atRisk > 0 ? "orange" : "neutral"}
          icon={<AlertCircle className="w-4 h-4" />}
          data-ocid="stat-at-risk"
        />
      </div>

      {/* Tab nav */}
      <div className="flex items-center border-b border-border mb-5 gap-0">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            data-ocid={`finance-tab-${tab.id}`}
            className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
              activeTab === tab.id
                ? "border-b-2 border-primary text-primary bg-primary/5"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── TAB: Budget Overview ── */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Budget vs Actual chart */}
          <div>
            <h2 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
              Budget vs Actual Spending — All Projects
            </h2>
            <Card className="rounded-none border border-border bg-card shadow-elevation-1 p-4">
              {isLoading ? (
                <Skeleton className="h-[220px] rounded-none" />
              ) : (
                <>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span className="w-3 h-3 bg-teal-600 inline-block" />
                      Budget
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span className="w-3 h-3 bg-muted-foreground/60 inline-block" />
                      Actual (on budget)
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span className="w-3 h-3 bg-orange-500 inline-block" />
                      Actual (over budget)
                    </span>
                  </div>
                  <BudgetActualChart data={chartData} />
                </>
              )}
            </Card>
          </div>

          {/* Budget Variance table — all projects */}
          <div>
            <h2 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
              Budget Variance by Project
            </h2>
            <div className="border border-border overflow-hidden">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-muted/60 border-b border-border">
                    <th className="px-3 py-2 text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                      Project
                    </th>
                    <th className="px-3 py-2 text-right text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                      Allocated
                    </th>
                    <th className="px-3 py-2 text-right text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                      Spent
                    </th>
                    <th className="px-3 py-2 text-right text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                      Variance
                    </th>
                    <th className="px-3 py-2 text-center text-[10px] font-semibold text-muted-foreground uppercase tracking-wide w-32">
                      % Used
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading
                    ? Array.from({ length: 4 }).map((_, i) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
                        <tr key={i} className="border-b border-border">
                          <td className="px-3 py-2" colSpan={5}>
                            <Skeleton className="h-5 rounded-none" />
                          </td>
                        </tr>
                      ))
                    : allVariance.map((v: BudgetVariance) => {
                        const pct = Math.round((v.spent / v.allocated) * 100);
                        return (
                          <tr
                            key={v.projectId}
                            className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                            data-ocid="finance-variance-row"
                          >
                            <td className="px-3 py-2.5">
                              <p className="font-medium text-foreground">
                                {v.projectName}
                              </p>
                              <p className="text-[10px] text-muted-foreground mt-0.5">
                                {
                                  allProjects.find(
                                    (p: Project) => p.id === v.projectId,
                                  )?.site
                                }
                              </p>
                            </td>
                            <td className="px-3 py-2.5 text-right font-mono text-muted-foreground">
                              {fmtFull(v.allocated)}
                            </td>
                            <td className="px-3 py-2.5 text-right font-mono text-foreground">
                              {fmtFull(v.spent)}
                            </td>
                            <td
                              className={`px-3 py-2.5 text-right font-mono font-semibold ${v.variance >= 0 ? "text-teal-600 dark:text-teal-400" : "text-destructive"}`}
                            >
                              {v.variance >= 0 ? "+" : ""}
                              {fmtFull(v.variance)}
                            </td>
                            <td className="px-3 py-2.5">
                              <div className="flex flex-col items-center gap-1">
                                <div className="w-full h-1 bg-muted overflow-hidden">
                                  <div
                                    className={`h-full ${pct > 100 ? "bg-destructive" : pct > 80 ? "bg-orange-500" : "bg-teal-600"}`}
                                    style={{ width: `${Math.min(pct, 100)}%` }}
                                  />
                                </div>
                                <UsagePill pct={pct} />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Per-project category breakdown */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                Budget by Category
              </h2>
              <Select
                value={selectedProjectId}
                onValueChange={setSelectedProjectId}
              >
                <SelectTrigger
                  className="rounded-none text-xs h-8 w-56"
                  data-ocid="finance-project-filter"
                >
                  <SelectValue placeholder="Select project…" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All projects (combined)</SelectItem>
                  {allProjects.map((p: Project) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {isLoading ? (
              <Skeleton className="h-36 rounded-none" />
            ) : filteredProject ? (
              <BudgetCategoryTable
                project={filteredProject}
                invoices={allInvoices}
              />
            ) : (
              // Combined view across all projects
              <div className="border border-border overflow-hidden">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-muted/60 border-b border-border">
                      <th className="px-3 py-2 text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                        Category
                      </th>
                      <th className="px-3 py-2 text-right text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                        Allocated
                      </th>
                      <th className="px-3 py-2 text-right text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                        Spent
                      </th>
                      <th className="px-3 py-2 text-right text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                        Variance
                      </th>
                      <th className="px-3 py-2 text-center text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                        % Used
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {CATEGORIES.map((cat) => {
                      const allocated = allProjects.reduce(
                        (s, p) => s + p.budget * CATEGORY_ALLOCATION[cat],
                        0,
                      );
                      const invoiceSpent = allInvoices
                        .filter((i) => i.category === cat)
                        .reduce((s, i) => s + i.amount, 0);
                      const spent =
                        invoiceSpent > 0
                          ? invoiceSpent
                          : totalSpent * CATEGORY_ALLOCATION[cat] * 0.9;
                      const pct = Math.round((spent / allocated) * 100);
                      return (
                        <tr
                          key={cat}
                          className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                          data-ocid="finance-combined-category-row"
                        >
                          <td className="px-3 py-2.5 font-medium text-foreground">
                            {cat}
                          </td>
                          <td className="px-3 py-2.5 text-right font-mono text-muted-foreground">
                            {fmtFull(allocated)}
                          </td>
                          <td className="px-3 py-2.5 text-right font-mono text-foreground">
                            {fmtFull(spent)}
                          </td>
                          <td
                            className={`px-3 py-2.5 text-right font-mono font-semibold ${allocated - spent >= 0 ? "text-teal-600 dark:text-teal-400" : "text-destructive"}`}
                          >
                            {allocated - spent >= 0 ? "+" : ""}
                            {fmtFull(allocated - spent)}
                          </td>
                          <td className="px-3 py-2.5">
                            <div className="flex flex-col items-center gap-1">
                              <div className="w-full h-1 bg-muted overflow-hidden">
                                <div
                                  className={`h-full ${pct > 100 ? "bg-destructive" : pct > 80 ? "bg-orange-500" : "bg-teal-600"}`}
                                  style={{ width: `${Math.min(pct, 100)}%` }}
                                />
                              </div>
                              <UsagePill pct={pct} />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── TAB: Spending Report ── */}
      {activeTab === "report" && (
        <div className="space-y-5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <Clock className="w-3.5 h-3.5" />
            Spending breakdown across all active projects and phases
          </div>
          {isLoading ? (
            <Skeleton className="h-48 rounded-none" />
          ) : (
            <SpendingReport projects={allProjects} invoices={allInvoices} />
          )}

          {/* All invoices summary table */}
          <div>
            <h2 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
              All Invoices
            </h2>
            <div className="border border-border overflow-hidden">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-muted/60 border-b border-border">
                    <th className="px-3 py-2 text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                      Invoice #
                    </th>
                    <th className="px-3 py-2 text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                      Supplier
                    </th>
                    <th className="px-3 py-2 text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-wide hidden md:table-cell">
                      Category
                    </th>
                    <th className="px-3 py-2 text-right text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                      Amount
                    </th>
                    <th className="px-3 py-2 text-center text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allInvoices.map((inv: Invoice) => (
                    <tr
                      key={inv.id}
                      className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                      data-ocid="finance-invoice-row"
                    >
                      <td className="px-3 py-2.5 font-mono font-medium text-foreground">
                        {inv.invoiceNumber}
                      </td>
                      <td className="px-3 py-2.5 text-foreground">
                        <p>{inv.supplier}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {inv.projectName}
                        </p>
                      </td>
                      <td className="px-3 py-2.5 text-muted-foreground hidden md:table-cell">
                        {inv.category}
                      </td>
                      <td className="px-3 py-2.5 text-right font-mono font-semibold text-foreground">
                        {fmtFull(inv.amount)}
                      </td>
                      <td className="px-3 py-2.5 text-center">
                        <InvoiceStatusBadge status={inv.status} />
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-muted/40 border-t-2 border-border">
                    <td
                      colSpan={3}
                      className="px-3 py-2.5 font-bold text-foreground"
                    >
                      Total
                    </td>
                    <td className="px-3 py-2.5 text-right font-mono font-bold text-foreground">
                      {fmtFull(allInvoices.reduce((s, i) => s + i.amount, 0))}
                    </td>
                    <td />
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: Pending Payments ── */}
      {activeTab === "pending" && (
        <div className="space-y-5">
          {/* Alert banner for overdue */}
          {allInvoices.filter((i) => i.status === "Overdue").length > 0 && (
            <div
              className="flex items-start gap-3 bg-destructive/5 border border-destructive/30 px-4 py-3"
              data-ocid="finance-overdue-alert"
            >
              <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-destructive">
                  {allInvoices.filter((i) => i.status === "Overdue").length}{" "}
                  overdue invoice
                  {allInvoices.filter((i) => i.status === "Overdue").length > 1
                    ? "s"
                    : ""}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Total overdue amount:{" "}
                  <span className="font-mono font-semibold text-destructive">
                    {fmtFull(overdueAmount)}
                  </span>{" "}
                  — immediate action required
                </p>
              </div>
            </div>
          )}

          <div>
            <h2 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
              Pending &amp; Overdue Invoices
            </h2>
            {isLoading ? (
              <Skeleton className="h-36 rounded-none" />
            ) : (
              <PendingPayments invoices={allInvoices} />
            )}
          </div>

          {/* Disputed invoices */}
          {allInvoices.some((i) => i.status === "Disputed") && (
            <div>
              <h2 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                Disputed Invoices
              </h2>
              <div className="border border-border overflow-hidden">
                {allInvoices
                  .filter((i) => i.status === "Disputed")
                  .map((inv) => (
                    <div
                      key={inv.id}
                      className="px-4 py-3 border-b border-border last:border-0 flex items-center gap-3"
                      data-ocid="finance-disputed-row"
                    >
                      <AlertTriangle className="w-4 h-4 text-accent shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-foreground font-mono">
                          {inv.invoiceNumber}
                        </p>
                        <p className="text-[10px] text-muted-foreground truncate">
                          {inv.description}
                        </p>
                      </div>
                      <span className="font-mono text-xs font-semibold text-foreground shrink-0">
                        {fmtFull(inv.amount)}
                      </span>
                      <InvoiceStatusBadge status={inv.status} />
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
