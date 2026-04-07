import { c as createLucideIcon, j as jsxRuntimeExports, B as Button } from "./index-ZaE-Lxb-.js";
import { X } from "./x-JEdWMEji.js";
import { T as TriangleAlert } from "./triangle-alert-B9I-LafY.js";
import { C as CircleAlert } from "./circle-alert-D67ol7GU.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode);
const CONFIG = {
  Critical: {
    bar: "bg-destructive",
    bg: "bg-destructive/8 border-destructive/30",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 text-destructive shrink-0" }),
    titleClass: "text-destructive font-semibold"
  },
  Warning: {
    bar: "bg-orange-500",
    bg: "bg-orange-500/8 border-orange-500/30",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0" }),
    titleClass: "text-orange-700 dark:text-orange-400 font-semibold"
  },
  Info: {
    bar: "bg-teal-500",
    bg: "bg-teal-500/8 border-teal-500/30",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" }),
    titleClass: "text-teal-700 dark:text-teal-400 font-semibold"
  }
};
function AlertBanner({
  severity = "Info",
  title,
  message,
  onDismiss,
  "data-ocid": ocid
}) {
  const cfg = CONFIG[severity];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": ocid,
      className: `relative flex items-start gap-3 border px-4 py-3 rounded-none overflow-hidden ${cfg.bg}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute left-0 top-0 bottom-0 w-1 ${cfg.bar}` }),
        cfg.icon,
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-sm ${cfg.titleClass}`, children: title }),
          message && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 leading-relaxed", children: message })
        ] }),
        onDismiss && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "h-6 w-6 shrink-0 rounded-none",
            onClick: onDismiss,
            "aria-label": "Dismiss alert",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
          }
        )
      ]
    }
  );
}
export {
  AlertBanner as A
};
