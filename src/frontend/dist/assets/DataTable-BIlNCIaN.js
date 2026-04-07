import { c as createLucideIcon, j as jsxRuntimeExports, s as cn, r as reactExports } from "./index-ZaE-Lxb-.js";
import { P as Primitive } from "./index-CS-OeuZH.js";
import { S as Skeleton } from "./skeleton-t8sFPTil.js";
import { f as ChevronUp, g as ChevronDown } from "./select-CoYAKacq.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
  ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
];
const ChevronsUpDown = createLucideIcon("chevrons-up-down", __iconNode);
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
var NAME = "Label";
var Label$1 = reactExports.forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.label,
    {
      ...props,
      ref: forwardedRef,
      onMouseDown: (event) => {
        var _a;
        const target = event.target;
        if (target.closest("button, input, select, textarea")) return;
        (_a = props.onMouseDown) == null ? void 0 : _a.call(props, event);
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }
    }
  );
});
Label$1.displayName = NAME;
var Root = Label$1;
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
function DataTable({
  columns,
  data,
  isLoading,
  rowKey,
  searchable,
  searchKeys = [],
  onRowClick,
  "data-ocid": ocid
}) {
  const [sort, setSort] = reactExports.useState(null);
  const [query, setQuery] = reactExports.useState("");
  const toggleSort = (key) => {
    setSort(
      (prev) => !prev || prev.key !== key ? { key, dir: "asc" } : prev.dir === "asc" ? { key, dir: "desc" } : null
    );
  };
  const filtered = searchable && query ? data.filter(
    (row) => searchKeys.some(
      (k) => String(row[k] ?? "").toLowerCase().includes(query.toLowerCase())
    )
  ) : data;
  const sorted = sort ? [...filtered].sort((a, b) => {
    const ar = a;
    const br = b;
    const av = ar[sort.key] ?? "";
    const bv = br[sort.key] ?? "";
    const cmp = String(av).localeCompare(String(bv), void 0, {
      numeric: true
    });
    return sort.dir === "asc" ? cmp : -cmp;
  }) : filtered;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", "data-ocid": ocid, children: [
    searchable && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        placeholder: "Search...",
        value: query,
        onChange: (e) => setQuery(e.target.value),
        className: "max-w-xs h-8 text-sm rounded-none",
        "data-ocid": ocid ? `${ocid}-search` : void 0
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm border-collapse", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-muted/50 border-b border-border", children: columns.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          onClick: () => col.sortable ? toggleSort(String(col.key)) : void 0,
          onKeyDown: (e) => col.sortable && (e.key === "Enter" || e.key === " ") ? toggleSort(String(col.key)) : void 0,
          role: col.sortable ? "button" : void 0,
          tabIndex: col.sortable ? 0 : void 0,
          className: `px-3 py-2 text-left font-semibold text-xs uppercase tracking-wide text-muted-foreground whitespace-nowrap select-none ${col.sortable ? "cursor-pointer hover:text-foreground" : ""} ${col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
            col.label,
            col.sortable && ((sort == null ? void 0 : sort.key) === String(col.key) ? sort.dir === "asc" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronsUpDown, { className: "w-3 h-3 opacity-40" }))
          ] })
        },
        String(col.key)
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        isLoading ? Array.from({ length: 5 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton rows have no stable key
          /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border", children: columns.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full rounded-none" }) }, String(col.key))) }, i)
        )) : sorted.map((row, i) => {
          const k = rowKey ? rowKey(row) : String(i);
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "tr",
            {
              "data-ocid": ocid ? `${ocid}-row` : void 0,
              onClick: () => onRowClick == null ? void 0 : onRowClick(row),
              onKeyDown: (e) => (e.key === "Enter" || e.key === " ") && (onRowClick == null ? void 0 : onRowClick(row)),
              role: onRowClick ? "button" : void 0,
              tabIndex: onRowClick ? 0 : void 0,
              className: `border-b border-border last:border-0 hover:bg-muted/40 transition-colors duration-150 ${onRowClick ? "cursor-pointer" : ""}`,
              children: columns.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "td",
                {
                  className: `px-3 py-2 text-foreground ${col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : ""}`,
                  children: col.render ? col.render(row) : String(
                    row[col.key] ?? ""
                  )
                },
                String(col.key)
              ))
            },
            k
          );
        }),
        !isLoading && sorted.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "td",
          {
            colSpan: columns.length,
            className: "px-3 py-8 text-center text-muted-foreground text-sm",
            children: "No records found."
          }
        ) })
      ] })
    ] }) }),
    !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
      sorted.length,
      " record",
      sorted.length !== 1 ? "s" : ""
    ] })
  ] });
}
export {
  DataTable as D,
  Input as I,
  Label as L
};
