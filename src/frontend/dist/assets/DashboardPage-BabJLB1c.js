import { c as createLucideIcon, u as useNavigate, a as useDashboardStats, b as useProjects, d as useAlerts, e as useMaterials, f as useInvoices, j as jsxRuntimeExports, B as Button, P as Package, g as Building2, S as StatusBadge, F as FileText } from "./index-ZaE-Lxb-.js";
import { S as Separator } from "./separator-Bx5xQGRh.js";
import { S as Skeleton } from "./skeleton-t8sFPTil.js";
import { A as AlertBanner } from "./AlertBanner-QS3cr6tG.js";
import { P as PageHeader, S as StatCard } from "./StatCard-CeCUcyBE.js";
import { P as Plus } from "./plus-sm6-0jy2.js";
import { T as TriangleAlert } from "./triangle-alert-B9I-LafY.js";
import { T as TrendingUp } from "./trending-up-C0j9q7wi.js";
import "./index-CS-OeuZH.js";
import "./x-JEdWMEji.js";
import "./circle-alert-D67ol7GU.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "M12 11h4", key: "1jrz19" }],
  ["path", { d: "M12 16h4", key: "n85exb" }],
  ["path", { d: "M8 11h.01", key: "1dfujw" }],
  ["path", { d: "M8 16h.01", key: "18s6g9" }]
];
const ClipboardList = createLucideIcon("clipboard-list", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
function fmt(n) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    notation: "compact",
    maximumFractionDigits: 1
  }).format(n);
}
function fmtFull(n) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0
  }).format(n);
}
function SectionLabel({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2", children });
}
function DashboardPage() {
  const navigate = useNavigate();
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: projects, isLoading: projLoading } = useProjects();
  const { data: alerts } = useAlerts();
  const { data: materials } = useMaterials();
  const { data: invoices, isLoading: invLoading } = useInvoices();
  const criticalAlerts = (alerts == null ? void 0 : alerts.filter((a) => !a.acknowledged && a.severity === "Critical")) ?? [];
  const unacknowledgedAlerts = (alerts == null ? void 0 : alerts.filter((a) => !a.acknowledged)) ?? [];
  const lowStockItems = (materials == null ? void 0 : materials.filter(
    (m) => m.status === "LowStock" || m.status === "Critical" || m.status === "OutOfStock"
  )) ?? [];
  const budgetOverruns = (projects == null ? void 0 : projects.filter((p) => p.spent / p.budget > 0.85)) ?? [];
  const recentInvoices = invoices ? [...invoices].sort(
    (a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime()
  ).slice(0, 5) : [];
  const budgetPct = stats ? Math.round(stats.totalSpent / stats.totalBudget * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "dashboard-page", className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Dashboard Overview",
        subtitle: "Real-time construction management across all sites",
        "data-ocid": "dashboard-header",
        action: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "rounded-none gap-1.5 text-xs font-medium border-border",
              onClick: () => navigate({ to: "/inventory" }),
              "data-ocid": "quick-action-log-material",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-3.5 h-3.5" }),
                "Log Material"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "rounded-none gap-1.5 text-xs font-medium border-border",
              onClick: () => navigate({ to: "/invoices" }),
              "data-ocid": "quick-action-create-invoice",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
                "Create Invoice"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              className: "rounded-none gap-1.5 text-xs font-medium bg-orange-500 hover:bg-orange-600 text-white",
              onClick: () => navigate({ to: "/alerts" }),
              "data-ocid": "quick-action-view-alerts",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5" }),
                "View Alerts",
                criticalAlerts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 bg-white/20 px-1.5 py-0.5 text-[10px] font-mono leading-none", children: criticalAlerts.length })
              ]
            }
          )
        ] })
      }
    ),
    criticalAlerts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "dashboard-critical-alerts", children: criticalAlerts.slice(0, 2).map((alert) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertBanner,
      {
        severity: alert.severity,
        title: alert.title,
        message: alert.message,
        "data-ocid": "dashboard-alert-banner"
      },
      alert.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-grid", "data-ocid": "dashboard-stats", children: statsLoading ? Array.from({ length: 4 }).map((_, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-none" }, i)
    )) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Total Projects",
          value: (stats == null ? void 0 : stats.totalProjects) ?? 0,
          sub: `${(stats == null ? void 0 : stats.activeProjects) ?? 0} active`,
          accent: "teal",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-4 h-4" }),
          "data-ocid": "stat-total-projects"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Active Alerts",
          value: unacknowledgedAlerts.length,
          sub: `${criticalAlerts.length} critical`,
          accent: criticalAlerts.length > 0 ? "orange" : "neutral",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4" }),
          "data-ocid": "stat-active-alerts"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Materials on Site",
          value: (materials == null ? void 0 : materials.length) ?? 0,
          sub: `${lowStockItems.length} low / out of stock`,
          accent: lowStockItems.length > 2 ? "orange" : "teal",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4" }),
          "data-ocid": "stat-materials-onsite"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Budget Utilisation",
          value: `${budgetPct}%`,
          sub: `${fmt((stats == null ? void 0 : stats.totalSpent) ?? 0)} of ${fmt((stats == null ? void 0 : stats.totalBudget) ?? 0)}`,
          accent: budgetPct > 85 ? "orange" : "teal",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4" }),
          "data-ocid": "stat-budget-utilisation"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "xl:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionLabel, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-3.5 h-3.5" }),
          "Projects"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1fr_auto_auto_auto_auto] gap-0 bg-muted/50 border-b border-border px-4 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-wide text-muted-foreground", children: "Project / Location" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-wide text-muted-foreground text-right pr-4 min-w-[80px]", children: "Budget" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-wide text-muted-foreground text-right pr-4 min-w-[80px]", children: "Spent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-wide text-muted-foreground text-right pr-4 min-w-[56px]", children: "Progress" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-wide text-muted-foreground min-w-[80px]", children: "Status" })
          ] }),
          projLoading ? Array.from({ length: 4 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 rounded-none" }) }, i)
          )) : projects == null ? void 0 : projects.map((project) => {
            const pct = Math.round(
              project.spent / project.budget * 100
            );
            const isOverBudget = pct > 90;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "grid grid-cols-[1fr_auto_auto_auto_auto] gap-0 items-center border-b border-border last:border-0 px-4 py-3 hover:bg-muted/30 transition-colors",
                "data-ocid": "dashboard-project-row",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 pr-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate", children: project.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
                      project.site,
                      " · ",
                      project.phase
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right pr-4 min-w-[80px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-foreground", children: fmt(project.budget) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right pr-4 min-w-[80px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `font-mono text-xs ${isOverBudget ? "text-orange-600 dark:text-orange-400 font-semibold" : "text-foreground"}`,
                      children: fmt(project.spent)
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pr-4 min-w-[56px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-1.5 bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `h-full transition-all ${isOverBudget ? "bg-orange-500" : "bg-teal-600"}`,
                        style: { width: `${project.progress}%` }
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-mono text-muted-foreground w-6 text-right", children: [
                      project.progress,
                      "%"
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-[80px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: project.status, size: "sm" }) })
                ]
              },
              project.id
            );
          })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionLabel, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5 text-orange-500" }),
            "Inventory Alerts",
            lowStockItems.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-[10px] bg-orange-500 text-white px-1.5 py-0.5 font-mono leading-none", children: lowStockItems.length })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border overflow-hidden", children: lowStockItems.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-5 text-center text-sm text-muted-foreground flex flex-col items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-5 h-5 text-teal-500" }),
            "All materials adequately stocked"
          ] }) : lowStockItems.slice(0, 5).map((m) => {
            const proj = projects == null ? void 0 : projects.find((p) => p.id === m.projectId);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "border-b border-border last:border-0 px-3 py-2.5 flex items-center justify-between gap-2",
                "data-ocid": "dashboard-stock-row",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground truncate", children: m.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground truncate", children: (proj == null ? void 0 : proj.name) ?? m.projectId })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs text-foreground", children: [
                      m.currentStock,
                      " / ",
                      m.reorderLevel,
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: m.unit })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: m.status, size: "sm" })
                  ] })
                ]
              },
              m.id
            );
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionLabel, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3.5 h-3.5 text-orange-500" }),
            "Budget Overrun Alerts",
            budgetOverruns.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-[10px] bg-orange-500 text-white px-1.5 py-0.5 font-mono leading-none", children: budgetOverruns.length })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border overflow-hidden", children: budgetOverruns.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-5 text-center text-sm text-muted-foreground flex flex-col items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-teal-500" }),
            "All projects within budget"
          ] }) : budgetOverruns.map((p) => {
            const overage = p.spent - p.budget;
            const pct = Math.round(p.spent / p.budget * 100);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "border-b border-border last:border-0 px-3 py-2.5",
                "data-ocid": "dashboard-budget-overrun-row",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground truncate", children: p.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-mono text-orange-600 dark:text-orange-400 font-semibold shrink-0", children: [
                      pct,
                      "%"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-1 bg-muted overflow-hidden mb-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-full bg-orange-500 transition-all",
                      style: { width: `${Math.min(pct, 100)}%` }
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[10px] text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "Spent:",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: fmt(p.spent) })
                    ] }),
                    overage > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-orange-600 dark:text-orange-400 font-mono font-semibold", children: [
                      "+",
                      fmt(overage),
                      " over"
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground font-mono", children: [
                      fmt(-overage),
                      " remaining"
                    ] })
                  ] })
                ]
              },
              p.id
            );
          }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-2 gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionLabel, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "w-3.5 h-3.5" }),
          "Active Alerts",
          unacknowledgedAlerts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-[10px] bg-orange-500 text-white px-1.5 py-0.5 font-mono leading-none", children: unacknowledgedAlerts.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", "data-ocid": "dashboard-alerts-list", children: [
          unacknowledgedAlerts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border px-4 py-5 text-center text-sm text-muted-foreground flex flex-col items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 text-teal-500" }),
            "No active alerts"
          ] }) : unacknowledgedAlerts.slice(0, 5).map((alert) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            AlertBanner,
            {
              severity: alert.severity,
              title: alert.title,
              message: alert.message,
              "data-ocid": "dashboard-mini-alert"
            },
            alert.id
          )),
          unacknowledgedAlerts.length > 5 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => navigate({ to: "/alerts" }),
              className: "w-full text-xs text-muted-foreground hover:text-foreground transition-colors py-2 border border-border border-dashed",
              "data-ocid": "dashboard-view-all-alerts",
              children: [
                "View all ",
                unacknowledgedAlerts.length,
                " alerts →"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionLabel, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3.5 h-3.5" }),
          "Recent Invoices"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "border border-border overflow-hidden",
            "data-ocid": "dashboard-invoices-list",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[auto_1fr_auto_auto] gap-0 bg-muted/50 border-b border-border px-3 py-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-wide text-muted-foreground pr-3 min-w-[120px]", children: "Invoice #" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-wide text-muted-foreground", children: "Supplier / Project" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-wide text-muted-foreground text-right pr-3 min-w-[80px]", children: "Amount" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-wide text-muted-foreground min-w-[72px]", children: "Status" })
              ] }),
              invLoading ? Array.from({ length: 5 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border px-3 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 rounded-none" }) }, i)
              )) : recentInvoices.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-8 text-center text-sm text-muted-foreground", children: "No invoices yet" }) : recentInvoices.map((inv) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "grid grid-cols-[auto_1fr_auto_auto] gap-0 items-center border-b border-border last:border-0 px-3 py-2.5 hover:bg-muted/30 transition-colors",
                  "data-ocid": "dashboard-invoice-row",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pr-3 min-w-[120px]", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-foreground", children: inv.invoiceNumber }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: inv.issueDate })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 pr-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground truncate", children: inv.supplier }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground truncate", children: inv.projectName })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right pr-3 min-w-[80px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-foreground", children: fmtFull(inv.amount) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-[72px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: inv.status, size: "sm" }) })
                  ]
                },
                inv.id
              ))
            ]
          }
        )
      ] })
    ] })
  ] });
}
export {
  DashboardPage as default
};
