import { d as useAlerts, a8 as useAcknowledgeAlert, r as reactExports, j as jsxRuntimeExports, a9 as Bell, h as Badge, B as Button } from "./index-ZaE-Lxb-.js";
import { A as AlertBanner } from "./AlertBanner-QS3cr6tG.js";
import { C as ConfirmDialog } from "./ConfirmDialog-u-u9NpQp.js";
import { E as EmptyState } from "./EmptyState-CI8B8Z0h.js";
import { P as PageHeader, S as StatCard } from "./StatCard-CeCUcyBE.js";
import { C as CircleAlert } from "./circle-alert-D67ol7GU.js";
import { T as TriangleAlert } from "./triangle-alert-B9I-LafY.js";
import { C as CircleCheck } from "./circle-check-BHAXK1Gd.js";
import "./x-JEdWMEji.js";
const SEVERITY_FILTERS = [
  "All",
  "Unacknowledged",
  "Critical",
  "Warning",
  "Info"
];
function AlertsPage() {
  const { data: alerts, isLoading } = useAlerts();
  const { mutate: acknowledge } = useAcknowledgeAlert();
  const [filter, setFilter] = reactExports.useState("Unacknowledged");
  const [confirmId, setConfirmId] = reactExports.useState(null);
  const filtered = (alerts == null ? void 0 : alerts.filter((a) => {
    if (filter === "All") return true;
    if (filter === "Unacknowledged") return !a.acknowledged;
    return a.severity === filter;
  })) ?? [];
  const critical = (alerts == null ? void 0 : alerts.filter((a) => a.severity === "Critical" && !a.acknowledged).length) ?? 0;
  const warnings = (alerts == null ? void 0 : alerts.filter((a) => a.severity === "Warning" && !a.acknowledged).length) ?? 0;
  const total = (alerts == null ? void 0 : alerts.filter((a) => !a.acknowledged).length) ?? 0;
  const confirmAlert = alerts == null ? void 0 : alerts.find((a) => a.id === confirmId);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "alerts-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Alerts",
        subtitle: "System alerts for inventory, budget, and invoice issues",
        "data-ocid": "alerts-header"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Total Unacknowledged",
          value: total,
          accent: total > 0 ? "orange" : "teal",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4" }),
          "data-ocid": "stat-total-alerts"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Critical",
          value: critical,
          accent: critical > 0 ? "red" : "neutral",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4" }),
          "data-ocid": "stat-critical"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Warnings",
          value: warnings,
          accent: warnings > 0 ? "orange" : "neutral",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4" }),
          "data-ocid": "stat-warnings"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Acknowledged",
          value: (alerts == null ? void 0 : alerts.filter((a) => a.acknowledged).length) ?? 0,
          accent: "teal",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
          "data-ocid": "stat-acknowledged"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 mb-4", "data-ocid": "alert-filter-bar", children: SEVERITY_FILTERS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setFilter(s),
        "data-ocid": `alert-filter-${s.toLowerCase()}`,
        className: `text-xs px-3 py-1.5 border font-medium transition-colors ${filter === s ? "bg-teal-600 text-white border-teal-600" : "bg-card border-border text-muted-foreground hover:border-teal-500/50"}`,
        children: s
      },
      s
    )) }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ["sk1", "sk2", "sk3", "sk4"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-14 bg-muted/40 border border-border animate-pulse"
      },
      id
    )) }),
    !isLoading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        title: "No alerts",
        description: filter === "Unacknowledged" ? "All alerts have been acknowledged." : "No alerts match this filter.",
        variant: "default",
        "data-ocid": "alerts-empty"
      }
    ),
    !isLoading && filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: filtered.map((alert) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-stretch gap-0",
        "data-ocid": "alert-row",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            AlertBanner,
            {
              severity: alert.severity,
              title: alert.title,
              message: alert.message
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-between border border-l-0 border-border bg-card px-3 py-2 gap-2 min-w-24", children: [
            alert.acknowledged ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "text-[10px] bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 border rounded-none", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 mr-1" }),
              " Acked"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "h-7 text-xs rounded-none",
                onClick: () => setConfirmId(alert.id),
                "data-ocid": "alert-acknowledge-btn",
                children: "Acknowledge"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground text-center", children: new Date(alert.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short"
            }) })
          ] })
        ]
      },
      alert.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDialog,
      {
        open: !!confirmId,
        onOpenChange: (v) => !v && setConfirmId(null),
        title: "Acknowledge Alert",
        description: `Mark "${confirmAlert == null ? void 0 : confirmAlert.title}" as acknowledged? This action confirms you have reviewed this issue.`,
        confirmLabel: "Acknowledge",
        onConfirm: () => {
          if (confirmId) acknowledge(confirmId);
          setConfirmId(null);
        },
        "data-ocid": "confirm-acknowledge-dialog"
      }
    )
  ] });
}
export {
  AlertsPage as default
};
