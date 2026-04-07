import { c as createLucideIcon, b as useProjects, r as reactExports, j as jsxRuntimeExports, B as Button, g as Building2, S as StatusBadge, h as Badge, C as ChevronRight, e as useMaterials } from "./index-ZaE-Lxb-.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-VCOmHL6h.js";
import { D as DataTable, L as Label, I as Input } from "./DataTable-BIlNCIaN.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CoYAKacq.js";
import { S as Separator } from "./separator-Bx5xQGRh.js";
import { S as Skeleton } from "./skeleton-t8sFPTil.js";
import { T as Textarea } from "./textarea-NP5asvhu.js";
import { C as CirclePlus, u as ue } from "./index-Pb_URToS.js";
import { E as EmptyState } from "./EmptyState-CI8B8Z0h.js";
import { P as PageHeader, S as StatCard } from "./StatCard-CeCUcyBE.js";
import { T as TrendingUp } from "./trending-up-C0j9q7wi.js";
import { C as Clock } from "./clock-C4dHmbCD.js";
import { X } from "./x-JEdWMEji.js";
import { T as TrendingDown } from "./trending-down-D5eAIwpy.js";
import "./index-CS-OeuZH.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
];
const Layers = createLucideIcon("layers", __iconNode$1);
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
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode);
const STATUS_FILTERS = [
  "All",
  "Active",
  "OnHold",
  "Completed",
  "Cancelled"
];
const PHASE_OPTIONS = [
  "Foundation",
  "Structure",
  "Finishing",
  "Handover"
];
const PHASES_SEED = [
  {
    id: "ph1",
    name: "Site Preparation",
    budget: 0,
    status: "Completed"
  },
  {
    id: "ph2",
    name: "Foundation Works",
    budget: 0,
    status: "Completed"
  },
  {
    id: "ph3",
    name: "Structural Frame",
    budget: 0,
    status: "InProgress"
  },
  { id: "ph4", name: "MEP Rough-in", budget: 0, status: "Planned" },
  {
    id: "ph5",
    name: "Finishing & Fitout",
    budget: 0,
    status: "Planned"
  }
];
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
function BudgetBar({ pct, warn }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full bg-muted overflow-hidden min-w-[60px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `h-full transition-all ${warn ? "bg-orange-500" : "bg-teal-600"}`,
      style: { width: `${Math.min(pct, 100)}%` }
    }
  ) });
}
function PhaseStatusBadge({ status }) {
  const map = {
    Planned: "bg-muted text-muted-foreground border-border",
    InProgress: "bg-teal-500/15 text-teal-700 dark:text-teal-400 border-teal-500/30",
    Completed: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      variant: "outline",
      className: `text-[10px] px-1.5 py-0 border rounded-none font-medium ${map[status]}`,
      children: status
    }
  );
}
function AddPhaseDialog({
  open,
  onClose,
  projectName
}) {
  const [form, setForm] = reactExports.useState({
    name: "",
    budget: "",
    status: "Planned"
  });
  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) return;
    ue.success(`Phase "${form.name}" added to ${projectName}`);
    setForm({ name: "", budget: "", status: "Planned" });
    onClose();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "rounded-none max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display text-base", children: [
      "Add Phase — ",
      projectName
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4 mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: "phase-name",
            className: "text-xs font-semibold uppercase tracking-wide",
            children: "Phase Name"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "phase-name",
            placeholder: "e.g. Foundation Works",
            value: form.name,
            onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
            className: "rounded-none",
            required: true,
            "data-ocid": "phase-name-input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: "phase-budget",
            className: "text-xs font-semibold uppercase tracking-wide",
            children: "Budget Allocation (£)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "phase-budget",
            type: "number",
            min: "0",
            placeholder: "e.g. 250000",
            value: form.budget,
            onChange: (e) => setForm((f) => ({ ...f, budget: e.target.value })),
            className: "rounded-none font-mono",
            "data-ocid": "phase-budget-input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wide", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: form.status,
            onValueChange: (v) => setForm((f) => ({ ...f, status: v })),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "rounded-none",
                  "data-ocid": "phase-status-select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Planned", children: "Planned" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "InProgress", children: "In Progress" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Completed", children: "Completed" })
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            size: "sm",
            className: "rounded-none bg-teal-600 hover:bg-teal-700 text-white flex-1",
            "data-ocid": "add-phase-submit",
            children: "Add Phase"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            className: "rounded-none",
            onClick: onClose,
            children: "Cancel"
          }
        )
      ] })
    ] })
  ] }) });
}
function ProjectDetailPanel({
  project,
  onClose
}) {
  const { data: materials } = useMaterials(project.id);
  const [addPhaseOpen, setAddPhaseOpen] = reactExports.useState(false);
  const budgetPct = Math.round(project.spent / project.budget * 100);
  const overBudget = budgetPct > 85;
  const remaining = project.budget - project.spent;
  const phases = PHASES_SEED.slice(0, 4).map((ph, i) => ({
    ...ph,
    budget: Math.round(project.budget * [0.08, 0.22, 0.45, 0.25][i])
  }));
  const phaseCols = [
    { key: "name", label: "Phase" },
    {
      key: "budget",
      label: "Allocated",
      align: "right",
      render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm", children: fmtFull(r.budget) })
    },
    {
      key: "status",
      label: "Status",
      render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsx(PhaseStatusBadge, { status: r.status })
    }
  ];
  const matCols = [
    { key: "name", label: "Material" },
    { key: "category", label: "Category" },
    {
      key: "currentStock",
      label: "Stock",
      align: "right",
      render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-sm", children: [
        r.currentStock,
        " ",
        r.unit
      ] })
    },
    {
      key: "status",
      label: "Status",
      render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatusBadge,
        {
          status: r.status,
          size: "sm"
        }
      )
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 bg-foreground/20 z-40",
        onClick: onClose,
        onKeyDown: (e) => e.key === "Escape" && onClose(),
        "aria-hidden": true
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "aside",
      {
        className: "fixed right-0 top-0 h-full w-full max-w-xl bg-card border-l border-border z-50 overflow-y-auto flex flex-col",
        "data-ocid": "project-detail-panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 px-5 py-4 border-b border-border bg-muted/30 sticky top-0 z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground truncate", children: project.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-0.5 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: project.site })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: project.status }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "p-1 hover:bg-muted transition-colors rounded-sm",
                  "aria-label": "Close panel",
                  "data-ocid": "close-detail-panel",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 text-muted-foreground" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 px-5 py-4 flex flex-col gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background border border-border p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide mb-1", children: "Total Budget" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono font-semibold text-sm text-foreground", children: fmtFull(project.budget) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background border border-border p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide mb-1", children: "Spent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: `font-mono font-semibold text-sm ${overBudget ? "text-orange-600 dark:text-orange-400" : "text-foreground"}`,
                    children: fmtFull(project.spent)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background border border-border p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide mb-1", children: "Remaining" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: `font-mono font-semibold text-sm flex items-center gap-1 ${remaining < 0 ? "text-destructive" : "text-teal-600 dark:text-teal-400"}`,
                    children: [
                      remaining < 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3 h-3" }),
                      fmtFull(Math.abs(remaining))
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs mb-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-medium", children: "Budget Utilisation" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: `font-mono font-semibold ${overBudget ? "text-orange-600 dark:text-orange-400" : "text-foreground"}`,
                    children: [
                      budgetPct,
                      "%"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(BudgetBar, { pct: budgetPct, warn: overBudget }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px] text-muted-foreground mt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "£0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fmt(project.budget) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs mb-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-medium", children: "Overall Progress" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-semibold text-teal-600 dark:text-teal-400", children: [
                  project.progress,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-full bg-teal-600 transition-all",
                  style: { width: `${project.progress}%` }
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-x-4 gap-y-2 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wide text-muted-foreground mb-0.5", children: "Current Phase" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-[10px] rounded-none border-border text-muted-foreground",
                    children: project.phase
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wide text-muted-foreground mb-0.5", children: "Timeline" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs text-foreground flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                  project.startDate,
                  project.endDate ? ` → ${project.endDate}` : ""
                ] })
              ] })
            ] }),
            project.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground bg-muted/40 px-3 py-2 border-l-2 border-teal-500", children: project.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-3.5 h-3.5" }),
                  " Project Phases"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "h-7 text-xs rounded-none gap-1",
                    onClick: () => setAddPhaseOpen(true),
                    "data-ocid": "add-phase-btn",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-3.5 h-3.5" }),
                      " Add Phase"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                DataTable,
                {
                  columns: phaseCols,
                  data: phases,
                  rowKey: (r) => r.id,
                  "data-ocid": "phases-table"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3", children: [
                "Materials on Site (",
                (materials == null ? void 0 : materials.length) ?? 0,
                " items)"
              ] }),
              materials && materials.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                DataTable,
                {
                  columns: matCols,
                  data: materials,
                  rowKey: (r) => r.id,
                  "data-ocid": "project-materials-table"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground py-3 text-center", children: "No materials assigned to this project." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3", children: "Budget Breakdown" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border divide-y divide-border", children: [
                { cat: "Labour", pct: 38 },
                { cat: "Materials", pct: 41 },
                { cat: "Equipment", pct: 12 },
                { cat: "Subcontractors", pct: 6 },
                { cat: "Contingency", pct: 3 }
              ].map(({ cat, pct }) => {
                const amount = project.spent * (pct / 100);
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-2 flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground w-28 shrink-0", children: cat }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-full bg-teal-600/70",
                      style: { width: `${pct}%` }
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground w-20 text-right shrink-0", children: fmtFull(amount) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-mono text-muted-foreground w-8 text-right shrink-0", children: [
                    pct,
                    "%"
                  ] })
                ] }, cat);
              }) })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddPhaseDialog,
      {
        open: addPhaseOpen,
        onClose: () => setAddPhaseOpen(false),
        projectName: project.name
      }
    )
  ] });
}
const EMPTY_FORM = {
  name: "",
  site: "",
  description: "",
  budget: "",
  status: "Active",
  phase: "Foundation",
  startDate: "",
  endDate: ""
};
function CreateProjectDialog({
  open,
  onClose
}) {
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  function set(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.site.trim() || !form.budget) return;
    ue.success(`Project "${form.name}" created successfully`);
    setForm(EMPTY_FORM);
    onClose();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "rounded-none max-w-lg max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-base", children: "New Construction Project" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4 mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: "proj-name",
            className: "text-xs font-semibold uppercase tracking-wide",
            children: "Project Name *"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "proj-name",
            placeholder: "e.g. Riverside Tower Block B",
            value: form.name,
            onChange: (e) => set("name", e.target.value),
            className: "rounded-none",
            required: true,
            "data-ocid": "proj-name-input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: "proj-site",
            className: "text-xs font-semibold uppercase tracking-wide",
            children: "Site Location *"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "proj-site",
            placeholder: "e.g. Riverside Tech Park",
            value: form.site,
            onChange: (e) => set("site", e.target.value),
            className: "rounded-none",
            required: true,
            "data-ocid": "proj-site-input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: "proj-description",
            className: "text-xs font-semibold uppercase tracking-wide",
            children: "Description"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "proj-description",
            placeholder: "Brief project scope and objectives...",
            value: form.description,
            onChange: (e) => set("description", e.target.value),
            className: "rounded-none text-sm resize-none",
            rows: 3,
            "data-ocid": "proj-description-input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: "proj-budget",
            className: "text-xs font-semibold uppercase tracking-wide",
            children: "Total Budget (£) *"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "proj-budget",
            type: "number",
            min: "0",
            placeholder: "e.g. 2500000",
            value: form.budget,
            onChange: (e) => set("budget", e.target.value),
            className: "rounded-none font-mono",
            required: true,
            "data-ocid": "proj-budget-input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wide", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.status,
              onValueChange: (v) => set("status", v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "rounded-none",
                    "data-ocid": "proj-status-select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Active", children: "Active" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "OnHold", children: "On Hold" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Completed", children: "Completed" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Cancelled", children: "Cancelled" })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wide", children: "Initial Phase" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.phase,
              onValueChange: (v) => set("phase", v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "rounded-none",
                    "data-ocid": "proj-phase-select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: PHASE_OPTIONS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p, children: p }, p)) })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "proj-start",
              className: "text-xs font-semibold uppercase tracking-wide",
              children: "Start Date"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "proj-start",
              type: "date",
              value: form.startDate,
              onChange: (e) => set("startDate", e.target.value),
              className: "rounded-none font-mono",
              "data-ocid": "proj-start-date"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "proj-end",
              className: "text-xs font-semibold uppercase tracking-wide",
              children: "End Date"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "proj-end",
              type: "date",
              value: form.endDate,
              onChange: (e) => set("endDate", e.target.value),
              className: "rounded-none font-mono",
              "data-ocid": "proj-end-date"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "submit",
            size: "sm",
            className: "rounded-none bg-teal-600 hover:bg-teal-700 text-white flex-1",
            "data-ocid": "create-project-submit",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-4 h-4 mr-1.5" }),
              " Create Project"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            className: "rounded-none",
            onClick: onClose,
            "data-ocid": "create-project-cancel",
            children: "Cancel"
          }
        )
      ] })
    ] })
  ] }) });
}
function buildColumns(onView) {
  return [
    {
      key: "name",
      label: "Name",
      sortable: true,
      render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-foreground truncate max-w-[180px]", children: r.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-2.5 h-2.5" }),
          r.site
        ] })
      ] })
    },
    {
      key: "status",
      label: "Status",
      render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: r.status, size: "sm" })
    },
    {
      key: "phase",
      label: "Phase",
      render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Badge,
        {
          variant: "outline",
          className: "text-[10px] rounded-none border-border text-muted-foreground",
          children: r.phase
        }
      )
    },
    {
      key: "budget",
      label: "Budget",
      sortable: true,
      align: "right",
      render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm", children: fmt(r.budget) })
    },
    {
      key: "spent",
      label: "Spent",
      sortable: true,
      align: "right",
      render: (r) => {
        const pct = Math.round(r.spent / r.budget * 100);
        const warn = pct > 85;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `font-mono text-sm font-semibold ${warn ? "text-orange-600 dark:text-orange-400" : "text-foreground"}`,
              children: fmt(r.spent)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 w-full justify-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BudgetBar, { pct, warn }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-mono text-muted-foreground w-8 text-right", children: [
              pct,
              "%"
            ] })
          ] })
        ] });
      }
    },
    {
      key: "progress",
      label: "Progress",
      sortable: true,
      align: "right",
      render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 justify-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-14 bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-full bg-teal-600",
            style: { width: `${r.progress}%` }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-teal-600 dark:text-teal-400 w-8", children: [
          r.progress,
          "%"
        ] })
      ] })
    },
    {
      key: "startDate",
      label: "Started",
      sortable: true,
      render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: r.startDate })
    },
    {
      key: "id",
      label: "",
      render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: (e) => {
            e.stopPropagation();
            onView(r);
          },
          className: "flex items-center gap-0.5 text-xs text-teal-600 dark:text-teal-400 hover:underline",
          "data-ocid": "view-project-btn",
          children: [
            "View ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" })
          ]
        }
      )
    }
  ];
}
function ProjectsPage() {
  const { data: projects, isLoading } = useProjects();
  const [filter, setFilter] = reactExports.useState("All");
  const [createOpen, setCreateOpen] = reactExports.useState(false);
  const [selectedProject, setSelectedProject] = reactExports.useState(null);
  const [viewMode, setViewMode] = reactExports.useState("cards");
  const filtered = (projects == null ? void 0 : projects.filter((p) => filter === "All" || p.status === filter)) ?? [];
  const active = (projects == null ? void 0 : projects.filter((p) => p.status === "Active").length) ?? 0;
  const totalBudget = (projects == null ? void 0 : projects.reduce((s, p) => s + p.budget, 0)) ?? 0;
  const totalSpent = (projects == null ? void 0 : projects.reduce((s, p) => s + p.spent, 0)) ?? 0;
  const columns = buildColumns((p) => setSelectedProject(p));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "projects-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Projects",
        subtitle: "All construction projects across sites",
        action: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex border border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setViewMode("cards"),
                className: `text-xs px-3 py-1.5 font-medium transition-colors ${viewMode === "cards" ? "bg-teal-600 text-white" : "bg-card text-muted-foreground hover:bg-muted"}`,
                "data-ocid": "view-mode-cards",
                children: "Cards"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setViewMode("table"),
                className: `text-xs px-3 py-1.5 font-medium transition-colors ${viewMode === "table" ? "bg-teal-600 text-white" : "bg-card text-muted-foreground hover:bg-muted"}`,
                "data-ocid": "view-mode-table",
                children: "Table"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              className: "rounded-none gap-1.5 bg-teal-600 hover:bg-teal-700 text-white",
              onClick: () => setCreateOpen(true),
              "data-ocid": "new-project-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-4 h-4" }),
                " New Project"
              ]
            }
          )
        ] }),
        "data-ocid": "projects-header"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-grid mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Total Projects",
          value: (projects == null ? void 0 : projects.length) ?? 0,
          accent: "teal",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Active Projects",
          value: active,
          accent: "teal",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Total Budget",
          value: fmt(totalBudget),
          accent: "neutral"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Total Spent",
          value: fmt(totalSpent),
          sub: `${totalBudget ? Math.round(totalSpent / totalBudget * 100) : 0}% utilised`,
          accent: totalBudget && totalSpent / totalBudget > 0.85 ? "orange" : "neutral"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 mb-4", "data-ocid": "project-filter-bar", children: STATUS_FILTERS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setFilter(s),
        "data-ocid": `filter-${s.toLowerCase()}`,
        className: `text-xs px-3 py-1.5 border font-medium transition-colors ${filter === s ? "bg-teal-600 text-white border-teal-600" : "bg-card border-border text-muted-foreground hover:border-teal-500/50"}`,
        children: s === "All" ? `All (${(projects == null ? void 0 : projects.length) ?? 0})` : `${s} (${(projects == null ? void 0 : projects.filter((p) => p.status === s).length) ?? 0})`
      },
      s
    )) }),
    isLoading ? viewMode === "cards" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4", children: Array.from({ length: 4 }).map((_, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-56 rounded-none" }, i)
    )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 rounded-none" }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        title: "No projects found",
        description: filter === "All" ? "Create your first project to get started." : "No projects match the selected filter.",
        variant: "projects",
        "data-ocid": "projects-empty"
      }
    ) : viewMode === "cards" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4", children: filtered.map((project) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProjectCard,
      {
        project,
        onView: () => setSelectedProject(project)
      },
      project.id
    )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      DataTable,
      {
        columns,
        data: filtered,
        rowKey: (r) => r.id,
        searchable: true,
        searchKeys: ["name", "site"],
        onRowClick: (r) => setSelectedProject(r),
        "data-ocid": "projects-table"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CreateProjectDialog,
      {
        open: createOpen,
        onClose: () => setCreateOpen(false)
      }
    ),
    selectedProject && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProjectDetailPanel,
      {
        project: selectedProject,
        onClose: () => setSelectedProject(null)
      }
    )
  ] });
}
function ProjectCard({
  project,
  onView
}) {
  const budgetPct = Math.round(project.spent / project.budget * 100);
  const overBudget = budgetPct > 85;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      className: "bg-card border border-border hover:border-teal-500/40 transition-all shadow-elevation-1 p-4 flex flex-col gap-3 cursor-pointer text-left w-full",
      "data-ocid": "project-card",
      onClick: onView,
      "aria-label": `View ${project.name}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground truncate", children: project.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-0.5 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: project.site })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: project.status })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Progress" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-medium text-teal-600 dark:text-teal-400", children: [
              project.progress,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full bg-teal-600",
              style: { width: `${project.progress}%` }
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "text-[10px] rounded-none border-border text-muted-foreground",
              children: project.phase
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
            project.startDate,
            project.endDate ? ` – ${project.endDate}` : ""
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-3 grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide", children: "Budget" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm font-semibold text-foreground", children: fmt(project.budget) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide", children: "Spent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: `font-mono text-sm font-semibold ${overBudget ? "text-orange-600 dark:text-orange-400" : "text-foreground"}`,
                children: [
                  fmt(project.spent),
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-normal", children: [
                    "(",
                    budgetPct,
                    "%)"
                  ] })
                ]
              }
            )
          ] })
        ] }),
        project.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 border-t border-border pt-2", children: project.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-teal-600 dark:text-teal-400 flex items-center gap-0.5 hover:underline", children: [
          "View details ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" })
        ] }) })
      ]
    }
  );
}
export {
  ProjectsPage as default
};
