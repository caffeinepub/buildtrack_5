import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  Building2,
  ClipboardList,
  FileText,
  Package,
  Plus,
  TrendingUp,
  Zap,
} from "lucide-react";
import { AlertBanner } from "../components/shared/AlertBanner";
import { PageHeader } from "../components/shared/PageHeader";
import { StatCard } from "../components/shared/StatCard";
import { StatusBadge } from "../components/shared/StatusBadge";
import {
  useAlerts,
  useDashboardStats,
  useInvoices,
  useMaterials,
  useProjects,
} from "../hooks/useBackend";

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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
      {children}
    </h2>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: projects, isLoading: projLoading } = useProjects();
  const { data: alerts } = useAlerts();
  const { data: materials } = useMaterials();
  const { data: invoices, isLoading: invLoading } = useInvoices();

  const criticalAlerts =
    alerts?.filter((a) => !a.acknowledged && a.severity === "Critical") ?? [];
  const unacknowledgedAlerts = alerts?.filter((a) => !a.acknowledged) ?? [];

  const lowStockItems =
    materials?.filter(
      (m) =>
        m.status === "LowStock" ||
        m.status === "Critical" ||
        m.status === "OutOfStock",
    ) ?? [];

  const budgetOverruns =
    projects?.filter((p) => p.spent / p.budget > 0.85) ?? [];

  const recentInvoices = invoices
    ? [...invoices]
        .sort(
          (a, b) =>
            new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime(),
        )
        .slice(0, 5)
    : [];

  const budgetPct = stats
    ? Math.round((stats.totalSpent / stats.totalBudget) * 100)
    : 0;

  return (
    <div data-ocid="dashboard-page" className="space-y-6">
      <PageHeader
        title="Dashboard Overview"
        subtitle="Real-time construction management across all sites"
        data-ocid="dashboard-header"
        action={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-none gap-1.5 text-xs font-medium border-border"
              onClick={() => navigate({ to: "/inventory" })}
              data-ocid="quick-action-log-material"
            >
              <Package className="w-3.5 h-3.5" />
              Log Material
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-none gap-1.5 text-xs font-medium border-border"
              onClick={() => navigate({ to: "/invoices" })}
              data-ocid="quick-action-create-invoice"
            >
              <Plus className="w-3.5 h-3.5" />
              Create Invoice
            </Button>
            <Button
              size="sm"
              className="rounded-none gap-1.5 text-xs font-medium bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => navigate({ to: "/alerts" })}
              data-ocid="quick-action-view-alerts"
            >
              <Zap className="w-3.5 h-3.5" />
              View Alerts
              {criticalAlerts.length > 0 && (
                <span className="ml-1 bg-white/20 px-1.5 py-0.5 text-[10px] font-mono leading-none">
                  {criticalAlerts.length}
                </span>
              )}
            </Button>
          </div>
        }
      />

      {/* Critical alert strip */}
      {criticalAlerts.length > 0 && (
        <div className="space-y-2" data-ocid="dashboard-critical-alerts">
          {criticalAlerts.slice(0, 2).map((alert) => (
            <AlertBanner
              key={alert.id}
              severity={alert.severity}
              title={alert.title}
              message={alert.message}
              data-ocid="dashboard-alert-banner"
            />
          ))}
        </div>
      )}

      {/* ── Stat Cards ─────────────────────────────────────────────────────────── */}
      <div className="section-grid" data-ocid="dashboard-stats">
        {statsLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
            <Skeleton key={i} className="h-24 rounded-none" />
          ))
        ) : (
          <>
            <StatCard
              label="Total Projects"
              value={stats?.totalProjects ?? 0}
              sub={`${stats?.activeProjects ?? 0} active`}
              accent="teal"
              icon={<Building2 className="w-4 h-4" />}
              data-ocid="stat-total-projects"
            />
            <StatCard
              label="Active Alerts"
              value={unacknowledgedAlerts.length}
              sub={`${criticalAlerts.length} critical`}
              accent={criticalAlerts.length > 0 ? "orange" : "neutral"}
              icon={<AlertTriangle className="w-4 h-4" />}
              data-ocid="stat-active-alerts"
            />
            <StatCard
              label="Materials on Site"
              value={materials?.length ?? 0}
              sub={`${lowStockItems.length} low / out of stock`}
              accent={lowStockItems.length > 2 ? "orange" : "teal"}
              icon={<Package className="w-4 h-4" />}
              data-ocid="stat-materials-onsite"
            />
            <StatCard
              label="Budget Utilisation"
              value={`${budgetPct}%`}
              sub={`${fmt(stats?.totalSpent ?? 0)} of ${fmt(stats?.totalBudget ?? 0)}`}
              accent={budgetPct > 85 ? "orange" : "teal"}
              icon={<TrendingUp className="w-4 h-4" />}
              data-ocid="stat-budget-utilisation"
            />
          </>
        )}
      </div>

      {/* ── Projects Table + Alerts Column ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Projects table — spans 2 cols */}
        <div className="xl:col-span-2">
          <SectionLabel>
            <Building2 className="w-3.5 h-3.5" />
            Projects
          </SectionLabel>
          <div className="border border-border overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-0 bg-muted/50 border-b border-border px-4 py-2">
              <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                Project / Location
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground text-right pr-4 min-w-[80px]">
                Budget
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground text-right pr-4 min-w-[80px]">
                Spent
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground text-right pr-4 min-w-[56px]">
                Progress
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground min-w-[80px]">
                Status
              </span>
            </div>
            {projLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
                  <div key={i} className="border-b border-border px-4 py-3">
                    <Skeleton className="h-12 rounded-none" />
                  </div>
                ))
              : projects?.map((project) => {
                  const pct = Math.round(
                    (project.spent / project.budget) * 100,
                  );
                  const isOverBudget = pct > 90;
                  return (
                    <div
                      key={project.id}
                      className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-0 items-center border-b border-border last:border-0 px-4 py-3 hover:bg-muted/30 transition-colors"
                      data-ocid="dashboard-project-row"
                    >
                      {/* Name + site */}
                      <div className="min-w-0 pr-3">
                        <p className="font-semibold text-sm text-foreground truncate">
                          {project.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {project.site} · {project.phase}
                        </p>
                      </div>
                      {/* Budget */}
                      <div className="text-right pr-4 min-w-[80px]">
                        <span className="font-mono text-xs text-foreground">
                          {fmt(project.budget)}
                        </span>
                      </div>
                      {/* Spent */}
                      <div className="text-right pr-4 min-w-[80px]">
                        <span
                          className={`font-mono text-xs ${isOverBudget ? "text-orange-600 dark:text-orange-400 font-semibold" : "text-foreground"}`}
                        >
                          {fmt(project.spent)}
                        </span>
                      </div>
                      {/* Progress bar */}
                      <div className="pr-4 min-w-[56px]">
                        <div className="flex items-center gap-1.5">
                          <div className="w-10 h-1.5 bg-muted overflow-hidden">
                            <div
                              className={`h-full transition-all ${isOverBudget ? "bg-orange-500" : "bg-teal-600"}`}
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-mono text-muted-foreground w-6 text-right">
                            {project.progress}%
                          </span>
                        </div>
                      </div>
                      {/* Status */}
                      <div className="min-w-[80px]">
                        <StatusBadge status={project.status} size="sm" />
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>

        {/* Alerts column */}
        <div className="space-y-5">
          {/* Inventory alerts */}
          <div>
            <SectionLabel>
              <AlertTriangle className="w-3.5 h-3.5 text-orange-500" />
              Inventory Alerts
              {lowStockItems.length > 0 && (
                <span className="ml-auto text-[10px] bg-orange-500 text-white px-1.5 py-0.5 font-mono leading-none">
                  {lowStockItems.length}
                </span>
              )}
            </SectionLabel>
            <div className="border border-border overflow-hidden">
              {lowStockItems.length === 0 ? (
                <div className="px-4 py-5 text-center text-sm text-muted-foreground flex flex-col items-center gap-2">
                  <Package className="w-5 h-5 text-teal-500" />
                  All materials adequately stocked
                </div>
              ) : (
                lowStockItems.slice(0, 5).map((m) => {
                  const proj = projects?.find((p) => p.id === m.projectId);
                  return (
                    <div
                      key={m.id}
                      className="border-b border-border last:border-0 px-3 py-2.5 flex items-center justify-between gap-2"
                      data-ocid="dashboard-stock-row"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-foreground truncate">
                          {m.name}
                        </p>
                        <p className="text-[10px] text-muted-foreground truncate">
                          {proj?.name ?? m.projectId}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-mono text-xs text-foreground">
                          {m.currentStock} / {m.reorderLevel}{" "}
                          <span className="text-muted-foreground">
                            {m.unit}
                          </span>
                        </p>
                        <StatusBadge status={m.status} size="sm" />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Budget overrun alerts */}
          <div>
            <SectionLabel>
              <TrendingUp className="w-3.5 h-3.5 text-orange-500" />
              Budget Overrun Alerts
              {budgetOverruns.length > 0 && (
                <span className="ml-auto text-[10px] bg-orange-500 text-white px-1.5 py-0.5 font-mono leading-none">
                  {budgetOverruns.length}
                </span>
              )}
            </SectionLabel>
            <div className="border border-border overflow-hidden">
              {budgetOverruns.length === 0 ? (
                <div className="px-4 py-5 text-center text-sm text-muted-foreground flex flex-col items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-teal-500" />
                  All projects within budget
                </div>
              ) : (
                budgetOverruns.map((p) => {
                  const overage = p.spent - p.budget;
                  const pct = Math.round((p.spent / p.budget) * 100);
                  return (
                    <div
                      key={p.id}
                      className="border-b border-border last:border-0 px-3 py-2.5"
                      data-ocid="dashboard-budget-overrun-row"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <p className="text-xs font-medium text-foreground truncate">
                          {p.name}
                        </p>
                        <span className="text-[10px] font-mono text-orange-600 dark:text-orange-400 font-semibold shrink-0">
                          {pct}%
                        </span>
                      </div>
                      <div className="w-full h-1 bg-muted overflow-hidden mb-1.5">
                        <div
                          className="h-full bg-orange-500 transition-all"
                          style={{ width: `${Math.min(pct, 100)}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                        <span>
                          Spent:{" "}
                          <span className="font-mono text-foreground">
                            {fmt(p.spent)}
                          </span>
                        </span>
                        {overage > 0 ? (
                          <span className="text-orange-600 dark:text-orange-400 font-mono font-semibold">
                            +{fmt(overage)} over
                          </span>
                        ) : (
                          <span className="text-muted-foreground font-mono">
                            {fmt(-overage)} remaining
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-0" />

      {/* ── Bottom row: Active Alerts + Recent Invoices ─────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Active alerts list */}
        <div>
          <SectionLabel>
            <ClipboardList className="w-3.5 h-3.5" />
            Active Alerts
            {unacknowledgedAlerts.length > 0 && (
              <span className="ml-auto text-[10px] bg-orange-500 text-white px-1.5 py-0.5 font-mono leading-none">
                {unacknowledgedAlerts.length}
              </span>
            )}
          </SectionLabel>
          <div className="space-y-2" data-ocid="dashboard-alerts-list">
            {unacknowledgedAlerts.length === 0 ? (
              <div className="border border-border px-4 py-5 text-center text-sm text-muted-foreground flex flex-col items-center gap-2">
                <Zap className="w-5 h-5 text-teal-500" />
                No active alerts
              </div>
            ) : (
              unacknowledgedAlerts
                .slice(0, 5)
                .map((alert) => (
                  <AlertBanner
                    key={alert.id}
                    severity={alert.severity}
                    title={alert.title}
                    message={alert.message}
                    data-ocid="dashboard-mini-alert"
                  />
                ))
            )}
            {unacknowledgedAlerts.length > 5 && (
              <button
                type="button"
                onClick={() => navigate({ to: "/alerts" })}
                className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors py-2 border border-border border-dashed"
                data-ocid="dashboard-view-all-alerts"
              >
                View all {unacknowledgedAlerts.length} alerts →
              </button>
            )}
          </div>
        </div>

        {/* Recent invoices */}
        <div>
          <SectionLabel>
            <FileText className="w-3.5 h-3.5" />
            Recent Invoices
          </SectionLabel>
          <div
            className="border border-border overflow-hidden"
            data-ocid="dashboard-invoices-list"
          >
            {/* Table header */}
            <div className="grid grid-cols-[auto_1fr_auto_auto] gap-0 bg-muted/50 border-b border-border px-3 py-2">
              <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground pr-3 min-w-[120px]">
                Invoice #
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                Supplier / Project
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground text-right pr-3 min-w-[80px]">
                Amount
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground min-w-[72px]">
                Status
              </span>
            </div>
            {invLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
                <div key={i} className="border-b border-border px-3 py-3">
                  <Skeleton className="h-8 rounded-none" />
                </div>
              ))
            ) : recentInvoices.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                No invoices yet
              </div>
            ) : (
              recentInvoices.map((inv) => (
                <div
                  key={inv.id}
                  className="grid grid-cols-[auto_1fr_auto_auto] gap-0 items-center border-b border-border last:border-0 px-3 py-2.5 hover:bg-muted/30 transition-colors"
                  data-ocid="dashboard-invoice-row"
                >
                  <div className="pr-3 min-w-[120px]">
                    <p className="font-mono text-xs text-foreground">
                      {inv.invoiceNumber}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {inv.issueDate}
                    </p>
                  </div>
                  <div className="min-w-0 pr-2">
                    <p className="text-xs font-medium text-foreground truncate">
                      {inv.supplier}
                    </p>
                    <p className="text-[10px] text-muted-foreground truncate">
                      {inv.projectName}
                    </p>
                  </div>
                  <div className="text-right pr-3 min-w-[80px]">
                    <span className="font-mono text-xs text-foreground">
                      {fmtFull(inv.amount)}
                    </span>
                  </div>
                  <div className="min-w-[72px]">
                    <StatusBadge status={inv.status} size="sm" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
