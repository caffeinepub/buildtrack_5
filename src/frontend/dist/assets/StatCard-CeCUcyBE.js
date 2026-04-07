import { c as createLucideIcon, j as jsxRuntimeExports, C as ChevronRight, G as Card } from "./index-ZaE-Lxb-.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
];
const ArrowDown = createLucideIcon("arrow-down", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
  ["path", { d: "M12 19V5", key: "x0mq9r" }]
];
const ArrowUp = createLucideIcon("arrow-up", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode);
function PageHeader({
  title,
  breadcrumbs,
  action,
  subtitle,
  "data-ocid": ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": ocid,
      className: "flex items-start justify-between gap-4 py-4 border-b border-border mb-5",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          breadcrumbs && breadcrumbs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex items-center gap-1 mb-1", children: breadcrumbs.map((crumb, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "flex items-center gap-1 text-xs text-muted-foreground",
              children: [
                idx > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
                crumb.onClick ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: crumb.onClick,
                    className: "hover:text-foreground transition-colors",
                    children: crumb.label
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: crumb.label })
              ]
            },
            crumb.label
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground truncate", children: title }),
          subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: subtitle })
        ] }),
        action && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 flex items-center gap-2", children: action })
      ]
    }
  );
}
const accentBar = {
  teal: "bg-teal-500",
  orange: "bg-orange-500",
  neutral: "bg-primary",
  red: "bg-destructive"
};
function StatCard({
  label,
  value,
  sub,
  change,
  changeLabel,
  icon,
  accent = "neutral",
  "data-ocid": ocid
}) {
  const barClass = accentBar[accent] ?? accentBar.neutral;
  const isUp = change !== void 0 && change > 0;
  const isDown = change !== void 0 && change < 0;
  const isFlat = change === 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      "data-ocid": ocid,
      className: "relative overflow-hidden border border-border bg-card rounded-none shadow-elevation-1 p-4 flex flex-col gap-2",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute top-0 left-0 right-0 h-0.5 ${barClass}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider", children: label }),
          icon && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: icon })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-2xl text-foreground leading-none", children: value }),
        (sub || change !== void 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
          change !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: `flex items-center gap-0.5 font-medium ${isUp ? "text-teal-600 dark:text-teal-400" : isDown ? "text-destructive" : "text-muted-foreground"}`,
              children: [
                isUp && /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "w-3 h-3" }),
                isDown && /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "w-3 h-3" }),
                isFlat && /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3 h-3" }),
                Math.abs(change),
                "%"
              ]
            }
          ),
          changeLabel && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: changeLabel }),
          sub && !changeLabel && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: sub })
        ] })
      ]
    }
  );
}
export {
  PageHeader as P,
  StatCard as S
};
