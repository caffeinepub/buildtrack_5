import { c as createLucideIcon, r as reactExports, i as useDirection, k as useControllableState, j as jsxRuntimeExports, l as Primitive, m as useId, R as Root, I as Item, n as composeEventHandlers, o as Presence, p as createRovingFocusGroupScope, q as createContextScope, s as cn, b as useProjects, e as useMaterials, t as useInventoryLogs, B as Button, P as Package, S as StatusBadge, h as Badge, v as useLogMaterialInflow, w as useLogMaterialOutflow } from "./index-ZaE-Lxb-.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-VCOmHL6h.js";
import { D as DataTable, L as Label, I as Input } from "./DataTable-BIlNCIaN.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CoYAKacq.js";
import { T as Textarea } from "./textarea-NP5asvhu.js";
import { E as EmptyState } from "./EmptyState-CI8B8Z0h.js";
import { P as PageHeader, S as StatCard } from "./StatCard-CeCUcyBE.js";
import { T as TrendingDown } from "./trending-down-D5eAIwpy.js";
import { T as TriangleAlert } from "./triangle-alert-B9I-LafY.js";
import { X } from "./x-JEdWMEji.js";
import "./index-CS-OeuZH.js";
import "./skeleton-t8sFPTil.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "M12 17V3", key: "1cwfxf" }],
  ["path", { d: "m6 11 6 6 6-6", key: "12ii2o" }],
  ["path", { d: "M19 21H5", key: "150jfl" }]
];
const ArrowDownToLine = createLucideIcon("arrow-down-to-line", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "m18 9-6-6-6 6", key: "kcunyi" }],
  ["path", { d: "M12 3v14", key: "7cf3v8" }],
  ["path", { d: "M5 21h14", key: "11awu3" }]
];
const ArrowUpFromLine = createLucideIcon("arrow-up-from-line", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }],
  ["path", { d: "M7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16", key: "qmtpty" }],
  ["path", { d: "M9.5 4h5L17 7h3a2 2 0 0 1 2 2v7.5", key: "1ufyfc" }],
  ["path", { d: "M14.121 15.121A3 3 0 1 1 9.88 10.88", key: "11zox6" }]
];
const CameraOff = createLucideIcon("camera-off", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",
      key: "1tc9qg"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]
];
const Camera = createLucideIcon("camera", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }],
  ["path", { d: "M7 12h10", key: "b7w52i" }]
];
const ScanLine = createLucideIcon("scan-line", __iconNode);
var TABS_NAME = "Tabs";
var [createTabsContext] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 outline-none", className),
      ...props
    }
  );
}
const JSQR_CDN = "https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js";
function useQRScanner(config = {}) {
  const {
    facingMode = "environment",
    scanInterval = 150,
    maxResults = 5
  } = config;
  const videoRef = reactExports.useRef(null);
  const canvasRef = reactExports.useRef(null);
  const streamRef = reactExports.useRef(null);
  const intervalRef = reactExports.useRef(null);
  const [qrResults, setQrResults] = reactExports.useState([]);
  const [isScanning, setIsScanning] = reactExports.useState(false);
  const [isActive, setIsActive] = reactExports.useState(false);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [jsQRLoaded, setJsQRLoaded] = reactExports.useState(!!window.jsQR);
  const [error, setError] = reactExports.useState(null);
  const [isSupported, setIsSupported] = reactExports.useState(null);
  const [currentFacingMode, setCurrentFacingMode] = reactExports.useState(facingMode);
  reactExports.useEffect(() => {
    setIsSupported(
      typeof navigator !== "undefined" && !!navigator.mediaDevices && !!navigator.mediaDevices.getUserMedia
    );
  }, []);
  reactExports.useEffect(() => {
    if (window.jsQR) {
      setJsQRLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.src = JSQR_CDN;
    script.async = true;
    script.onload = () => setJsQRLoaded(true);
    script.onerror = () => setError({
      message: "Failed to load QR decoder. Check your connection."
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);
  const stopScanning = reactExports.useCallback(async () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (streamRef.current) {
      for (const track of streamRef.current.getTracks()) track.stop();
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
    setIsActive(false);
  }, []);
  const startScanning = reactExports.useCallback(async () => {
    if (!isSupported) return false;
    setIsLoading(true);
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: currentFacingMode },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setIsActive(true);
      setIsScanning(true);
      intervalRef.current = setInterval(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas || !window.jsQR || video.readyState < 2) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = window.jsQR(
          imageData.data,
          imageData.width,
          imageData.height
        );
        if (code) {
          setQrResults((prev) => {
            const isDupe = prev.some(
              (r) => r.data === code.data && Date.now() - r.timestamp < 2e3
            );
            if (isDupe) return prev;
            return [{ data: code.data, timestamp: Date.now() }, ...prev].slice(
              0,
              maxResults
            );
          });
        }
      }, scanInterval);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Camera access denied";
      setError({ message, code: "CAMERA_ERROR" });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [isSupported, currentFacingMode, scanInterval, maxResults]);
  const switchCamera = reactExports.useCallback(async () => {
    await stopScanning();
    setCurrentFacingMode((m) => m === "user" ? "environment" : "user");
    return true;
  }, [stopScanning]);
  const clearResults = reactExports.useCallback(() => setQrResults([]), []);
  const reset = reactExports.useCallback(async () => {
    await stopScanning();
    setQrResults([]);
    setError(null);
  }, [stopScanning]);
  const retry = reactExports.useCallback(async () => {
    await reset();
    return startScanning();
  }, [reset, startScanning]);
  reactExports.useEffect(() => {
    return () => {
      stopScanning();
    };
  }, [stopScanning]);
  const isReady = (isSupported ?? false) && jsQRLoaded;
  const canStartScanning = isReady && !isLoading && !isScanning;
  return {
    qrResults,
    isScanning,
    jsQRLoaded,
    isActive,
    isSupported,
    error,
    isLoading,
    currentFacingMode,
    startScanning,
    stopScanning,
    switchCamera,
    clearResults,
    reset,
    retry,
    videoRef,
    canvasRef,
    isReady,
    canStartScanning
  };
}
function fmt(n) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0
  }).format(n);
}
const MATERIAL_COLUMNS = [
  { key: "name", label: "Material", sortable: true },
  { key: "category", label: "Category", sortable: true },
  {
    key: "currentStock",
    label: "Current Stock",
    sortable: true,
    align: "right",
    render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-sm font-medium", children: [
      row.currentStock.toLocaleString(),
      " ",
      row.unit
    ] })
  },
  {
    key: "reorderLevel",
    label: "Reorder",
    align: "right",
    render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground", children: [
      row.reorderLevel,
      " ",
      row.unit
    ] })
  },
  {
    key: "status",
    label: "Status",
    render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: row.status })
  },
  { key: "supplier", label: "Supplier", sortable: true },
  { key: "lastDeliveryDate", label: "Last Delivery", sortable: true },
  {
    key: "unitCost",
    label: "Unit Cost",
    align: "right",
    render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs", children: fmt(row.unitCost) })
  }
];
const LOG_COLUMNS = [
  {
    key: "type",
    label: "Type",
    render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: `flex items-center gap-1.5 text-xs font-semibold ${row.type === "Inflow" ? "text-teal-600 dark:text-teal-400" : "text-orange-600 dark:text-orange-400"}`,
        children: [
          row.type === "Inflow" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownToLine, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpFromLine, { className: "w-3.5 h-3.5" }),
          row.type
        ]
      }
    )
  },
  { key: "materialName", label: "Material", sortable: true },
  {
    key: "quantity",
    label: "Qty",
    align: "right",
    render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm", children: row.quantity.toLocaleString() })
  },
  { key: "date", label: "Date", sortable: true },
  {
    key: "notes",
    label: "Notes",
    render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground truncate max-w-40 block", children: row.notes ?? "—" })
  },
  {
    key: "loggedBy",
    label: "Logged By",
    render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: row.loggedBy ?? "—" })
  }
];
function ProjectBalanceCard({ projectName, materials }) {
  const totalValue = materials.reduce(
    (s, m) => s + m.currentStock * m.unitCost,
    0
  );
  const criticalItems = materials.filter(
    (m) => m.status === "Critical" || m.status === "OutOfStock"
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border p-4 flex flex-col gap-3",
      "data-ocid": "project-balance-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground truncate", children: projectName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm font-bold text-teal-600 dark:text-teal-400 shrink-0", children: fmt(totalValue) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            materials.length,
            " materials"
          ] }),
          criticalItems.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-orange-600 dark:text-orange-400 font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3" }),
            criticalItems.length,
            " critical"
          ] })
        ] }),
        criticalItems.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5", children: [
          criticalItems.slice(0, 3).map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "text-[10px] px-1.5 py-0 bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/30",
              children: m.name
            },
            m.id
          )),
          criticalItems.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "outline",
              className: "text-[10px] px-1.5 py-0 bg-muted text-muted-foreground border-border",
              children: [
                "+",
                criticalItems.length - 3,
                " more"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: materials.slice(0, 4).map((m) => {
          const pct = Math.min(100, m.currentStock / m.maxCapacity * 100);
          const barColor = m.status === "InStock" ? "bg-teal-500" : m.status === "LowStock" ? "bg-amber-500" : m.status === "Critical" ? "bg-orange-500" : "bg-destructive";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground w-28 truncate shrink-0", children: m.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1 bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `h-full ${barColor} transition-all`,
                style: { width: `${pct}%` }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] text-muted-foreground w-8 text-right shrink-0", children: [
              Math.round(pct),
              "%"
            ] })
          ] }, m.id);
        }) })
      ]
    }
  );
}
function InflowForm({
  materials,
  onClose,
  prefillMaterialId
}) {
  const [materialId, setMaterialId] = reactExports.useState(prefillMaterialId ?? "");
  const [quantity, setQuantity] = reactExports.useState("");
  const [unitCost, setUnitCost] = reactExports.useState("");
  const [supplier, setSupplier] = reactExports.useState("");
  const [date, setDate] = reactExports.useState((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
  const [notes, setNotes] = reactExports.useState("");
  const logInflow = useLogMaterialInflow();
  const selectedMaterial = materials.find((m) => m.id === materialId);
  reactExports.useEffect(() => {
    if (selectedMaterial) setUnitCost(String(selectedMaterial.unitCost));
  }, [selectedMaterial]);
  function handleSubmit(e) {
    e.preventDefault();
    logInflow.mutate(
      { materialId, quantity: Number(quantity), supplier, date, notes },
      { onSuccess: onClose }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wide", children: "Material *" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: materialId, onValueChange: setMaterialId, required: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            className: "rounded-none",
            "data-ocid": "inflow-material-select",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select material…" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "rounded-none", children: materials.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: m.id, children: [
          m.name,
          " — ",
          m.currentStock,
          " ",
          m.unit,
          " in stock"
        ] }, m.id)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs font-semibold uppercase tracking-wide", children: [
          "Quantity *",
          selectedMaterial ? ` (${selectedMaterial.unit})` : ""
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            min: "1",
            required: true,
            className: "rounded-none font-mono",
            value: quantity,
            onChange: (e) => setQuantity(e.target.value),
            placeholder: "0",
            "data-ocid": "inflow-quantity-input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wide", children: "Unit Cost (£)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            min: "0",
            step: "0.01",
            className: "rounded-none font-mono",
            value: unitCost,
            onChange: (e) => setUnitCost(e.target.value),
            placeholder: "0.00",
            "data-ocid": "inflow-cost-input"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wide", children: "Supplier" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          className: "rounded-none",
          value: supplier,
          onChange: (e) => setSupplier(e.target.value),
          placeholder: "Supplier name",
          "data-ocid": "inflow-supplier-input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wide", children: "Date *" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          type: "date",
          required: true,
          className: "rounded-none font-mono",
          value: date,
          onChange: (e) => setDate(e.target.value),
          "data-ocid": "inflow-date-input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wide", children: "Notes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          className: "rounded-none text-sm resize-none h-20",
          value: notes,
          onChange: (e) => setNotes(e.target.value),
          placeholder: "Delivery PO, batch reference…",
          "data-ocid": "inflow-notes-input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          className: "rounded-none",
          onClick: onClose,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "submit",
          disabled: logInflow.isPending || !materialId || !quantity,
          className: "rounded-none bg-teal-600 hover:bg-teal-700 text-white gap-1.5",
          "data-ocid": "inflow-submit-btn",
          children: [
            logInflow.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownToLine, { className: "w-3.5 h-3.5" }),
            "Log Inflow"
          ]
        }
      )
    ] })
  ] });
}
const PROJECT_PHASES = [
  "Foundation",
  "Structure",
  "Finishing",
  "Handover"
];
function OutflowForm({
  materials,
  onClose,
  prefillMaterialId
}) {
  const [materialId, setMaterialId] = reactExports.useState(prefillMaterialId ?? "");
  const [quantity, setQuantity] = reactExports.useState("");
  const [phase, setPhase] = reactExports.useState("");
  const [date, setDate] = reactExports.useState((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
  const [notes, setNotes] = reactExports.useState("");
  const logOutflow = useLogMaterialOutflow();
  const selectedMaterial = materials.find((m) => m.id === materialId);
  function handleSubmit(e) {
    e.preventDefault();
    logOutflow.mutate(
      {
        materialId,
        quantity: Number(quantity),
        date,
        notes: notes || (phase ? `Phase: ${phase}` : "")
      },
      { onSuccess: onClose }
    );
  }
  const overLimit = selectedMaterial && quantity ? Number(quantity) > selectedMaterial.currentStock : false;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wide", children: "Material *" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: materialId, onValueChange: setMaterialId, required: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            className: "rounded-none",
            "data-ocid": "outflow-material-select",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select or scan material…" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "rounded-none", children: materials.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: m.id, children: [
          m.name,
          " — ",
          m.currentStock,
          " ",
          m.unit,
          " available"
        ] }, m.id)) })
      ] }),
      selectedMaterial && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        "Available:",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-medium text-foreground", children: [
          selectedMaterial.currentStock,
          " ",
          selectedMaterial.unit
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs font-semibold uppercase tracking-wide", children: [
          "Quantity *",
          selectedMaterial ? ` (${selectedMaterial.unit})` : ""
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            min: "1",
            max: selectedMaterial == null ? void 0 : selectedMaterial.currentStock,
            required: true,
            className: `rounded-none font-mono ${overLimit ? "border-destructive focus-visible:ring-destructive/30" : ""}`,
            value: quantity,
            onChange: (e) => setQuantity(e.target.value),
            placeholder: "0",
            "data-ocid": "outflow-quantity-input"
          }
        ),
        overLimit && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: "Exceeds available stock" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wide", children: "Project Phase *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: phase,
            onValueChange: (v) => setPhase(v),
            required: true,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "rounded-none",
                  "data-ocid": "outflow-phase-select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select phase…" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "rounded-none", children: PROJECT_PHASES.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p, children: p }, p)) })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wide", children: "Date *" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          type: "date",
          required: true,
          className: "rounded-none font-mono",
          value: date,
          onChange: (e) => setDate(e.target.value),
          "data-ocid": "outflow-date-input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wide", children: "Notes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          className: "rounded-none text-sm resize-none h-20",
          value: notes,
          onChange: (e) => setNotes(e.target.value),
          placeholder: "Usage location, crew, task reference…",
          "data-ocid": "outflow-notes-input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          className: "rounded-none",
          onClick: onClose,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "submit",
          disabled: logOutflow.isPending || !materialId || !quantity || !phase || overLimit,
          className: "rounded-none bg-orange-600 hover:bg-orange-700 text-white gap-1.5",
          "data-ocid": "outflow-submit-btn",
          children: [
            logOutflow.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpFromLine, { className: "w-3.5 h-3.5" }),
            "Log Outflow"
          ]
        }
      )
    ] })
  ] });
}
function QRScannerPanel({
  materials,
  onMaterialScanned,
  onClose
}) {
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
    canvasRef
  } = useQRScanner({
    facingMode: "environment",
    scanInterval: 150,
    maxResults: 5
  });
  const lastResult = qrResults[0];
  const matchedMaterial = reactExports.useMemo(() => {
    if (!lastResult) return null;
    return materials.find(
      (m) => m.id === lastResult.data || m.name.toLowerCase() === lastResult.data.toLowerCase()
    ) ?? null;
  }, [lastResult, materials]);
  const handleUseResult = reactExports.useCallback(() => {
    if (matchedMaterial) {
      onMaterialScanned(matchedMaterial.id);
      stopScanning();
      onClose();
    }
  }, [matchedMaterial, onMaterialScanned, stopScanning, onClose]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4", children: isSupported === false ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 py-8 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CameraOff, { className: "w-10 h-10 text-muted-foreground" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Camera not supported on this device or browser." })
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-muted border border-border overflow-hidden aspect-video", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "video",
        {
          ref: videoRef,
          className: "w-full h-full object-cover",
          playsInline: true,
          muted: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, className: "hidden" }),
      isActive && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-48 h-48 border-2 border-teal-400 opacity-70", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-teal-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-teal-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-teal-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-teal-400" })
      ] }) }),
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-background/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-6 h-6 text-teal-600 animate-spin" }) }),
      !isActive && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-10 h-10 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Camera off — press Start to scan" })
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive bg-destructive/10 border border-destructive/30 px-3 py-2", children: error.message }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      !isScanning ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: startScanning,
          disabled: !canStartScanning,
          className: "rounded-none bg-teal-600 hover:bg-teal-700 text-white gap-1.5 flex-1",
          "data-ocid": "qr-start-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ScanLine, { className: "w-4 h-4" }),
            "Start Scanning"
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: stopScanning,
          variant: "outline",
          className: "rounded-none gap-1.5 flex-1",
          "data-ocid": "qr-stop-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }),
            "Stop"
          ]
        }
      ),
      qrResults.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          className: "rounded-none text-xs",
          onClick: clearResults,
          children: "Clear"
        }
      )
    ] }),
    qrResults.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "border border-border divide-y divide-border",
        "data-ocid": "qr-results",
        children: qrResults.map((result) => {
          const mat = materials.find(
            (m) => m.id === result.data || m.name.toLowerCase() === result.data.toLowerCase()
          );
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-3 px-3 py-2.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-foreground truncate", children: result.data }),
                  mat ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-teal-600 dark:text-teal-400 font-medium mt-0.5", children: [
                    "✓ Matched: ",
                    mat.name
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "No material match" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground shrink-0", children: new Date(result.timestamp).toLocaleTimeString() })
              ]
            },
            result.timestamp
          );
        })
      }
    ),
    matchedMaterial && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        onClick: handleUseResult,
        className: "rounded-none bg-teal-600 hover:bg-teal-700 text-white gap-1.5",
        "data-ocid": "qr-use-result-btn",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpFromLine, { className: "w-4 h-4" }),
          'Use "',
          matchedMaterial.name,
          '" for Outflow'
        ]
      }
    )
  ] }) });
}
function InventoryPage() {
  const { data: projects } = useProjects();
  const [projectId, setProjectId] = reactExports.useState("all");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [categoryFilter, setCategoryFilter] = reactExports.useState("all");
  const [activeModal, setActiveModal] = reactExports.useState(null);
  const [prefillMaterialId, setPrefillMaterialId] = reactExports.useState();
  const [activeTab, setActiveTab] = reactExports.useState("materials");
  const { data: allMaterials, isLoading } = useMaterials(
    projectId === "all" ? void 0 : projectId
  );
  const { data: logs } = useInventoryLogs(
    projectId === "all" ? void 0 : projectId
  );
  const categories = reactExports.useMemo(() => {
    const cats = Array.from(
      new Set((allMaterials == null ? void 0 : allMaterials.map((m) => m.category)) ?? [])
    );
    return cats.sort();
  }, [allMaterials]);
  const filteredMaterials = reactExports.useMemo(() => {
    if (!allMaterials) return [];
    return allMaterials.filter((m) => {
      if (statusFilter !== "all" && m.status !== statusFilter) return false;
      if (categoryFilter !== "all" && m.category !== categoryFilter)
        return false;
      return true;
    });
  }, [allMaterials, statusFilter, categoryFilter]);
  const totalValue = reactExports.useMemo(
    () => (allMaterials == null ? void 0 : allMaterials.reduce((s, m) => s + m.currentStock * m.unitCost, 0)) ?? 0,
    [allMaterials]
  );
  const lowStockCount = (allMaterials == null ? void 0 : allMaterials.filter((m) => m.status !== "InStock").length) ?? 0;
  const criticalCount = (allMaterials == null ? void 0 : allMaterials.filter(
    (m) => m.status === "Critical" || m.status === "OutOfStock"
  ).length) ?? 0;
  const materialsByProject = reactExports.useMemo(() => {
    const grouped = {};
    for (const m of allMaterials ?? []) {
      if (!grouped[m.projectId]) {
        const proj = projects == null ? void 0 : projects.find((p) => p.id === m.projectId);
        grouped[m.projectId] = {
          name: (proj == null ? void 0 : proj.name) ?? m.projectId,
          materials: []
        };
      }
      grouped[m.projectId].materials.push(m);
    }
    return grouped;
  }, [allMaterials, projects]);
  function openOutflowWithMaterial(materialId) {
    setPrefillMaterialId(materialId);
    setActiveModal("outflow");
  }
  function closeModal() {
    setActiveModal(null);
    setPrefillMaterialId(void 0);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "inventory-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Inventory",
        subtitle: "Real-time material stock levels, inflows and outflows",
        action: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "rounded-none gap-1.5",
              onClick: () => {
                setPrefillMaterialId(void 0);
                setActiveModal("outflow");
              },
              "data-ocid": "log-outflow-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpFromLine, { className: "w-3.5 h-3.5" }),
                " Log Outflow"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "rounded-none gap-1.5",
              onClick: () => {
                setPrefillMaterialId(void 0);
                setActiveModal("inflow");
              },
              "data-ocid": "log-inflow-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownToLine, { className: "w-3.5 h-3.5" }),
                " Log Inflow"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              className: "rounded-none gap-1.5 bg-teal-600 hover:bg-teal-700 text-white",
              onClick: () => setActiveModal("qr"),
              "data-ocid": "scan-qr-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ScanLine, { className: "w-3.5 h-3.5" }),
                " Scan QR"
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-grid mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Total Materials",
          value: (allMaterials == null ? void 0 : allMaterials.length) ?? 0,
          accent: "teal",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4" }),
          "data-ocid": "stat-total-materials"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Total Stock Value",
          value: fmt(totalValue),
          accent: "neutral",
          "data-ocid": "stat-stock-value"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Below Reorder Level",
          value: lowStockCount,
          accent: lowStockCount > 2 ? "orange" : "neutral",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-4 h-4" }),
          "data-ocid": "stat-low-stock"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Critical / Out of Stock",
          value: criticalCount,
          accent: criticalCount > 0 ? "red" : "neutral",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4" }),
          "data-ocid": "stat-critical"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 mb-4 py-3 border-y border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Filters" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: projectId, onValueChange: setProjectId, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            className: "w-52 h-8 text-sm rounded-none",
            "data-ocid": "filter-project",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Projects" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "rounded-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Projects" }),
          projects == null ? void 0 : projects.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p.id, children: p.name }, p.id))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: categoryFilter, onValueChange: setCategoryFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            className: "w-40 h-8 text-sm rounded-none",
            "data-ocid": "filter-category",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Categories" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "rounded-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Categories" }),
          categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: statusFilter,
          onValueChange: (v) => setStatusFilter(v),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "w-36 h-8 text-sm rounded-none",
                "data-ocid": "filter-status",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Statuses" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "rounded-none", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Statuses" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "InStock", children: "In Stock" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "LowStock", children: "Low Stock" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Critical", children: "Critical" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "OutOfStock", children: "Out of Stock" })
            ] })
          ]
        }
      ),
      (statusFilter !== "all" || categoryFilter !== "all") && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          className: "rounded-none h-8 text-xs text-muted-foreground",
          onClick: () => {
            setStatusFilter("all");
            setCategoryFilter("all");
          },
          "data-ocid": "clear-filters-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3 mr-1" }),
            " Clear filters"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "rounded-none h-9 bg-muted/50 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "materials",
            className: "rounded-none text-xs",
            "data-ocid": "tab-materials",
            children: [
              "Materials (",
              filteredMaterials.length,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TabsTrigger,
          {
            value: "balance",
            className: "rounded-none text-xs",
            "data-ocid": "tab-balance",
            children: "Project Balance"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "history",
            className: "rounded-none text-xs",
            "data-ocid": "tab-history",
            children: [
              "Transaction History (",
              (logs == null ? void 0 : logs.length) ?? 0,
              ")"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "materials", className: "mt-0", children: !isLoading && filteredMaterials.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          title: "No materials found",
          description: "Adjust filters or add materials to start tracking inventory.",
          variant: "inventory",
          "data-ocid": "inventory-empty"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        DataTable,
        {
          columns: MATERIAL_COLUMNS,
          data: filteredMaterials,
          isLoading,
          rowKey: (r) => r.id,
          searchable: true,
          searchKeys: ["name", "category", "supplier"],
          "data-ocid": "inventory-table"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "balance", className: "mt-0", children: Object.keys(materialsByProject).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          title: "No project data",
          description: "No materials assigned to projects yet.",
          variant: "inventory"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4 py-2.5 px-4 bg-card border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Total Inventory Value" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-xl text-teal-600 dark:text-teal-400", children: fmt(totalValue) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4",
            "data-ocid": "balance-grid",
            children: Object.entries(materialsByProject).map(
              ([pid, { name, materials: mats }]) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                ProjectBalanceCard,
                {
                  projectName: name,
                  materials: mats
                },
                pid
              )
            )
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "history", className: "mt-0", children: !logs || logs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          title: "No transactions yet",
          description: "Log inflows and outflows to see transaction history here.",
          variant: "inventory",
          "data-ocid": "history-empty"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        DataTable,
        {
          columns: LOG_COLUMNS,
          data: logs,
          isLoading: false,
          rowKey: (r) => r.id,
          searchable: true,
          searchKeys: ["materialName", "notes", "loggedBy"],
          "data-ocid": "history-table"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: activeModal === "inflow",
        onOpenChange: (o) => !o && closeModal(),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "rounded-none max-w-md",
            "data-ocid": "inflow-modal",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2 font-display text-base", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownToLine, { className: "w-4 h-4 text-teal-600" }),
                "Log Material Inflow"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                InflowForm,
                {
                  materials: allMaterials ?? [],
                  onClose: closeModal,
                  prefillMaterialId
                }
              )
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: activeModal === "outflow",
        onOpenChange: (o) => !o && closeModal(),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "rounded-none max-w-md",
            "data-ocid": "outflow-modal",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2 font-display text-base", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpFromLine, { className: "w-4 h-4 text-orange-600" }),
                "Log Material Outflow"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                OutflowForm,
                {
                  materials: allMaterials ?? [],
                  onClose: closeModal,
                  prefillMaterialId
                }
              )
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: activeModal === "qr",
        onOpenChange: (o) => !o && closeModal(),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "rounded-none max-w-md", "data-ocid": "qr-modal", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2 font-display text-base", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ScanLine, { className: "w-4 h-4 text-teal-600" }),
            "Scan Material QR Code"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            QRScannerPanel,
            {
              materials: allMaterials ?? [],
              onMaterialScanned: openOutflowWithMaterial,
              onClose: closeModal
            }
          )
        ] })
      }
    )
  ] });
}
export {
  InventoryPage as default
};
