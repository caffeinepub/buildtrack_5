import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, o as Presence, l as Primitive, k as useControllableState, J as useComposedRefs, n as composeEventHandlers, Q as useSize, q as createContextScope, s as cn, N as useSuppliers, B as Button, T as Truck, C as ChevronRight, h as Badge, b as useProjects, P as Package } from "./index-ZaE-Lxb-.js";
import { u as usePrevious, C as Check, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CoYAKacq.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-VCOmHL6h.js";
import { D as DataTable, L as Label, I as Input } from "./DataTable-BIlNCIaN.js";
import { S as Separator } from "./separator-Bx5xQGRh.js";
import { C as CirclePlus, u as ue } from "./index-Pb_URToS.js";
import { E as EmptyState } from "./EmptyState-CI8B8Z0h.js";
import { P as PageHeader, S as StatCard } from "./StatCard-CeCUcyBE.js";
import { X } from "./x-JEdWMEji.js";
import { C as CircleCheck } from "./circle-check-BHAXK1Gd.js";
import "./index-CS-OeuZH.js";
import "./skeleton-t8sFPTil.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode$2);
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
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode$1);
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
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode);
var CHECKBOX_NAME = "Checkbox";
var [createCheckboxContext] = createContextScope(CHECKBOX_NAME);
var [CheckboxProviderImpl, useCheckboxContext] = createCheckboxContext(CHECKBOX_NAME);
function CheckboxProvider(props) {
  const {
    __scopeCheckbox,
    checked: checkedProp,
    children,
    defaultChecked,
    disabled,
    form,
    name,
    onCheckedChange,
    required,
    value = "on",
    // @ts-expect-error
    internal_do_not_use_render
  } = props;
  const [checked, setChecked] = useControllableState({
    prop: checkedProp,
    defaultProp: defaultChecked ?? false,
    onChange: onCheckedChange,
    caller: CHECKBOX_NAME
  });
  const [control, setControl] = reactExports.useState(null);
  const [bubbleInput, setBubbleInput] = reactExports.useState(null);
  const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
  const isFormControl = control ? !!form || !!control.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    true
  );
  const context = {
    checked,
    disabled,
    setChecked,
    control,
    setControl,
    name,
    form,
    value,
    hasConsumerStoppedPropagationRef,
    required,
    defaultChecked: isIndeterminate(defaultChecked) ? false : defaultChecked,
    isFormControl,
    bubbleInput,
    setBubbleInput
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CheckboxProviderImpl,
    {
      scope: __scopeCheckbox,
      ...context,
      children: isFunction(internal_do_not_use_render) ? internal_do_not_use_render(context) : children
    }
  );
}
var TRIGGER_NAME = "CheckboxTrigger";
var CheckboxTrigger = reactExports.forwardRef(
  ({ __scopeCheckbox, onKeyDown, onClick, ...checkboxProps }, forwardedRef) => {
    const {
      control,
      value,
      disabled,
      checked,
      required,
      setControl,
      setChecked,
      hasConsumerStoppedPropagationRef,
      isFormControl,
      bubbleInput
    } = useCheckboxContext(TRIGGER_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setControl);
    const initialCheckedStateRef = reactExports.useRef(checked);
    reactExports.useEffect(() => {
      const form = control == null ? void 0 : control.form;
      if (form) {
        const reset = () => setChecked(initialCheckedStateRef.current);
        form.addEventListener("reset", reset);
        return () => form.removeEventListener("reset", reset);
      }
    }, [control, setChecked]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": isIndeterminate(checked) ? "mixed" : checked,
        "aria-required": required,
        "data-state": getState(checked),
        "data-disabled": disabled ? "" : void 0,
        disabled,
        value,
        ...checkboxProps,
        ref: composedRefs,
        onKeyDown: composeEventHandlers(onKeyDown, (event) => {
          if (event.key === "Enter") event.preventDefault();
        }),
        onClick: composeEventHandlers(onClick, (event) => {
          setChecked((prevChecked) => isIndeterminate(prevChecked) ? true : !prevChecked);
          if (bubbleInput && isFormControl) {
            hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
            if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
          }
        })
      }
    );
  }
);
CheckboxTrigger.displayName = TRIGGER_NAME;
var Checkbox$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeCheckbox,
      name,
      checked,
      defaultChecked,
      required,
      disabled,
      value,
      onCheckedChange,
      form,
      ...checkboxProps
    } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CheckboxProvider,
      {
        __scopeCheckbox,
        checked,
        defaultChecked,
        disabled,
        required,
        onCheckedChange,
        name,
        form,
        value,
        internal_do_not_use_render: ({ isFormControl }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxTrigger,
            {
              ...checkboxProps,
              ref: forwardedRef,
              __scopeCheckbox
            }
          ),
          isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxBubbleInput,
            {
              __scopeCheckbox
            }
          )
        ] })
      }
    );
  }
);
Checkbox$1.displayName = CHECKBOX_NAME;
var INDICATOR_NAME = "CheckboxIndicator";
var CheckboxIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeCheckbox, forceMount, ...indicatorProps } = props;
    const context = useCheckboxContext(INDICATOR_NAME, __scopeCheckbox);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Presence,
      {
        present: forceMount || isIndeterminate(context.checked) || context.checked === true,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            "data-state": getState(context.checked),
            "data-disabled": context.disabled ? "" : void 0,
            ...indicatorProps,
            ref: forwardedRef,
            style: { pointerEvents: "none", ...props.style }
          }
        )
      }
    );
  }
);
CheckboxIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "CheckboxBubbleInput";
var CheckboxBubbleInput = reactExports.forwardRef(
  ({ __scopeCheckbox, ...props }, forwardedRef) => {
    const {
      control,
      hasConsumerStoppedPropagationRef,
      checked,
      defaultChecked,
      required,
      disabled,
      name,
      value,
      form,
      bubbleInput,
      setBubbleInput
    } = useCheckboxContext(BUBBLE_INPUT_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setBubbleInput);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = bubbleInput;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      const bubbles = !hasConsumerStoppedPropagationRef.current;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        input.indeterminate = isIndeterminate(checked);
        setChecked.call(input, isIndeterminate(checked) ? false : checked);
        input.dispatchEvent(event);
      }
    }, [bubbleInput, prevChecked, checked, hasConsumerStoppedPropagationRef]);
    const defaultCheckedRef = reactExports.useRef(isIndeterminate(checked) ? false : checked);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.input,
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: defaultChecked ?? defaultCheckedRef.current,
        required,
        disabled,
        name,
        value,
        form,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0,
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          transform: "translateX(-100%)"
        }
      }
    );
  }
);
CheckboxBubbleInput.displayName = BUBBLE_INPUT_NAME;
function isFunction(value) {
  return typeof value === "function";
}
function isIndeterminate(checked) {
  return checked === "indeterminate";
}
function getState(checked) {
  return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Checkbox$1,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CheckboxIndicator,
        {
          "data-slot": "checkbox-indicator",
          className: "flex items-center justify-center text-current transition-none",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5" })
        }
      )
    }
  );
}
const DELIVERY_HISTORY = {
  s1: [
    {
      id: "d1",
      date: "2024-10-05",
      projectName: "Riverside Tower Block A",
      materials: "Portland Cement × 500 bags",
      status: "Delivered",
      amount: 6250
    },
    {
      id: "d2",
      date: "2024-12-09",
      projectName: "Eastside Residential Dev",
      materials: "Portland Cement × 200 bags",
      status: "Delivered",
      amount: 2500
    },
    {
      id: "d3",
      date: "2025-01-15",
      projectName: "Riverside Tower Block A",
      materials: "Portland Cement × 400 bags",
      status: "InTransit",
      amount: 5e3
    }
  ],
  s2: [
    {
      id: "d4",
      date: "2024-10-23",
      projectName: "Riverside Tower Block A",
      materials: "Rebar 12mm × 40 tonnes",
      status: "Delivered",
      amount: 35600
    },
    {
      id: "d5",
      date: "2024-11-15",
      projectName: "Main Stadium Renovation",
      materials: "H-beam × 8 tonnes",
      status: "Delivered",
      amount: 9600
    },
    {
      id: "d6",
      date: "2025-01-20",
      projectName: "Riverside Tower Block A",
      materials: "Rebar 12mm × 25 tonnes",
      status: "Pending",
      amount: 22250
    }
  ],
  s3: [
    {
      id: "d7",
      date: "2024-10-30",
      projectName: "Riverside Tower Block A",
      materials: "Coarse Aggregate × 100 m³",
      status: "Delivered",
      amount: 4500
    },
    {
      id: "d8",
      date: "2024-11-28",
      projectName: "Eastside Residential Dev",
      materials: "Sand Fine × 80 m³",
      status: "Delivered",
      amount: 2800
    }
  ],
  s4: [
    {
      id: "d9",
      date: "2024-11-10",
      projectName: "Eastside Residential Dev",
      materials: "Concrete Blocks × 2400 pcs",
      status: "Delivered",
      amount: 7680
    },
    {
      id: "d10",
      date: "2025-01-08",
      projectName: "Eastside Residential Dev",
      materials: "Concrete Blocks × 1500 pcs",
      status: "Pending",
      amount: 4800
    }
  ],
  s5: [
    {
      id: "d11",
      date: "2024-09-01",
      projectName: "Main Stadium Renovation",
      materials: "Tower Crane — monthly hire",
      status: "Delivered",
      amount: 47500
    },
    {
      id: "d12",
      date: "2024-12-01",
      projectName: "Eastside Residential Dev",
      materials: "Mobile Crane — weekly hire",
      status: "Cancelled",
      amount: 12e3
    }
  ],
  s6: [
    {
      id: "d13",
      date: "2024-11-20",
      projectName: "Main Stadium Renovation",
      materials: "Floor Tiles × 4000 m²",
      status: "Delivered",
      amount: 112e3
    },
    {
      id: "d14",
      date: "2025-01-12",
      projectName: "Riverside Tower Block A",
      materials: "Wall Tiles × 800 m²",
      status: "InTransit",
      amount: 28e3
    }
  ]
};
const ALL_MATERIAL_CATEGORIES = [
  "Cement",
  "Mortar Mix",
  "Rebar",
  "H-beam",
  "Structural Steel",
  "Aggregate",
  "Gravel",
  "Sand",
  "Concrete Blocks",
  "Pavers",
  "Crane Hire",
  "Heavy Equipment",
  "Floor Tiles",
  "Wall Tiles",
  "Grout",
  "Timber",
  "Paint",
  "Plumbing",
  "Electrical"
];
function fmt(n) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0
  }).format(n);
}
function StarRating({ rating }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 text-amber-500 fill-amber-500" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-foreground", children: rating.toFixed(1) })
  ] });
}
function DeliveryBadge({ status }) {
  const map = {
    Pending: "bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30",
    InTransit: "bg-teal-500/15 text-teal-700 dark:text-teal-400 border-teal-500/30",
    Delivered: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
    Cancelled: "bg-muted text-muted-foreground border-border"
  };
  const labels = {
    Pending: "Pending",
    InTransit: "In Transit",
    Delivered: "Delivered",
    Cancelled: "Cancelled"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      variant: "outline",
      className: `text-[10px] px-1.5 py-0 border rounded-none font-medium ${map[status]}`,
      children: labels[status]
    }
  );
}
function UpdateDeliveryDialog({
  delivery,
  onClose
}) {
  const [status, setStatus] = reactExports.useState(delivery.status);
  const FLOW = [
    "Pending",
    "InTransit",
    "Delivered",
    "Cancelled"
  ];
  function handleSubmit(e) {
    e.preventDefault();
    ue.success(`Delivery status updated to "${status}"`);
    onClose();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "rounded-none max-w-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-base", children: "Update Delivery Status" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-xs text-muted-foreground mb-4 bg-muted/40 px-3 py-2 border-l-2 border-teal-500", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: delivery.materials }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5", children: [
        delivery.projectName,
        " · ",
        delivery.date
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wide", children: "New Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: status,
            onValueChange: (v) => setStatus(v),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "rounded-none",
                  "data-ocid": "delivery-status-select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: FLOW.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s === "InTransit" ? "In Transit" : s }, s)) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1", children: FLOW.filter((s) => s !== "Cancelled").map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `h-5 flex-1 text-[9px] flex items-center justify-center font-medium border transition-colors ${status === s ? "bg-teal-600 text-white border-teal-600" : FLOW.indexOf(status) > i ? "bg-teal-600/20 text-teal-700 dark:text-teal-400 border-teal-500/30" : "bg-muted text-muted-foreground border-border"}`,
            children: s === "InTransit" ? "Transit" : s
          }
        ),
        i < 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3 text-muted-foreground shrink-0" })
      ] }, s)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "submit",
            size: "sm",
            className: "rounded-none bg-teal-600 hover:bg-teal-700 text-white flex-1",
            "data-ocid": "update-delivery-submit",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 mr-1.5" }),
              " Update Status"
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
            children: "Cancel"
          }
        )
      ] })
    ] })
  ] }) });
}
const EMPTY_DELIVERY = {
  supplierId: "",
  projectId: "",
  expectedDate: "",
  materials: "",
  quantity: "",
  unit: "bags",
  amount: ""
};
function AddDeliveryDialog({
  open,
  onClose,
  defaultSupplierId
}) {
  const { data: suppliers } = useSuppliers();
  const { data: projects } = useProjects();
  const [form, setForm] = reactExports.useState({
    ...EMPTY_DELIVERY,
    supplierId: defaultSupplierId ?? ""
  });
  function set(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }
  function handleSubmit(e) {
    var _a;
    e.preventDefault();
    if (!form.supplierId || !form.projectId || !form.materials.trim()) return;
    const supplierName = ((_a = suppliers == null ? void 0 : suppliers.find((s) => s.id === form.supplierId)) == null ? void 0 : _a.name) ?? form.supplierId;
    ue.success(`Delivery from ${supplierName} scheduled`);
    setForm(EMPTY_DELIVERY);
    onClose();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "rounded-none max-w-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-base", children: "Schedule Delivery" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4 mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wide", children: "Supplier *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.supplierId,
              onValueChange: (v) => set("supplierId", v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "rounded-none",
                    "data-ocid": "delivery-supplier-select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select supplier" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: suppliers == null ? void 0 : suppliers.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s.id, children: s.name }, s.id)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wide", children: "Project *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.projectId,
              onValueChange: (v) => set("projectId", v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "rounded-none",
                    "data-ocid": "delivery-project-select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select project" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: projects == null ? void 0 : projects.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p.id, children: p.name }, p.id)) })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: "del-materials",
            className: "text-xs font-semibold uppercase tracking-wide",
            children: "Materials *"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "del-materials",
            placeholder: "e.g. Portland Cement, Rebar 12mm",
            value: form.materials,
            onChange: (e) => set("materials", e.target.value),
            className: "rounded-none",
            required: true,
            "data-ocid": "delivery-materials-input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "del-qty",
              className: "text-xs font-semibold uppercase tracking-wide",
              children: "Quantity"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "del-qty",
              type: "number",
              min: "0",
              placeholder: "e.g. 500",
              value: form.quantity,
              onChange: (e) => set("quantity", e.target.value),
              className: "rounded-none font-mono",
              "data-ocid": "delivery-quantity-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wide", children: "Unit" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.unit, onValueChange: (v) => set("unit", v), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "rounded-none",
                "data-ocid": "delivery-unit-select",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: [
              "bags",
              "tonnes",
              "kg",
              "pieces",
              "m³",
              "m²",
              "litres",
              "rolls"
            ].map((u) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: u, children: u }, u)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "del-amount",
              className: "text-xs font-semibold uppercase tracking-wide",
              children: "Amount (£)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "del-amount",
              type: "number",
              min: "0",
              placeholder: "e.g. 5000",
              value: form.amount,
              onChange: (e) => set("amount", e.target.value),
              className: "rounded-none font-mono",
              "data-ocid": "delivery-amount-input"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: "del-date",
            className: "text-xs font-semibold uppercase tracking-wide",
            children: "Expected Date"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "del-date",
            type: "date",
            value: form.expectedDate,
            onChange: (e) => set("expectedDate", e.target.value),
            className: "rounded-none font-mono",
            "data-ocid": "delivery-date-input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "submit",
            size: "sm",
            className: "rounded-none bg-teal-600 hover:bg-teal-700 text-white flex-1",
            "data-ocid": "schedule-delivery-submit",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-4 h-4 mr-1.5" }),
              " Schedule Delivery"
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
            "data-ocid": "schedule-delivery-cancel",
            children: "Cancel"
          }
        )
      ] })
    ] })
  ] }) });
}
const EMPTY_SUPPLIER = {
  name: "",
  contact: "",
  phone: "",
  email: "",
  address: "",
  materials: []
};
function AddSupplierDialog({
  open,
  onClose
}) {
  const [form, setForm] = reactExports.useState(EMPTY_SUPPLIER);
  const [matSearch, setMatSearch] = reactExports.useState("");
  function setField(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }
  function toggleMat(mat) {
    setForm((f) => ({
      ...f,
      materials: f.materials.includes(mat) ? f.materials.filter((m) => m !== mat) : [...f.materials, mat]
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.contact.trim()) return;
    ue.success(`Supplier "${form.name}" added to directory`);
    setForm(EMPTY_SUPPLIER);
    setMatSearch("");
    onClose();
  }
  const filteredMats = ALL_MATERIAL_CATEGORIES.filter(
    (m) => m.toLowerCase().includes(matSearch.toLowerCase())
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "rounded-none max-w-lg max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-base", children: "Add New Supplier" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4 mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: "sup-name",
            className: "text-xs font-semibold uppercase tracking-wide",
            children: "Company Name *"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "sup-name",
            placeholder: "e.g. BuildMat Supplies Ltd",
            value: form.name,
            onChange: (e) => setField("name", e.target.value),
            className: "rounded-none",
            required: true,
            "data-ocid": "sup-name-input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: "sup-contact",
            className: "text-xs font-semibold uppercase tracking-wide",
            children: "Contact Person *"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "sup-contact",
            placeholder: "e.g. Jane Smith",
            value: form.contact,
            onChange: (e) => setField("contact", e.target.value),
            className: "rounded-none",
            required: true,
            "data-ocid": "sup-contact-input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "sup-phone",
              className: "text-xs font-semibold uppercase tracking-wide",
              children: "Phone"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "sup-phone",
              type: "tel",
              placeholder: "+44 20 7946 0000",
              value: form.phone,
              onChange: (e) => setField("phone", e.target.value),
              className: "rounded-none font-mono",
              "data-ocid": "sup-phone-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "sup-email",
              className: "text-xs font-semibold uppercase tracking-wide",
              children: "Email"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "sup-email",
              type: "email",
              placeholder: "contact@supplier.co.uk",
              value: form.email,
              onChange: (e) => setField("email", e.target.value),
              className: "rounded-none",
              "data-ocid": "sup-email-input"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: "sup-address",
            className: "text-xs font-semibold uppercase tracking-wide",
            children: "Address"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "sup-address",
            placeholder: "e.g. 10 Industrial Estate, Manchester",
            value: form.address,
            onChange: (e) => setField("address", e.target.value),
            className: "rounded-none",
            "data-ocid": "sup-address-input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs font-semibold uppercase tracking-wide", children: [
          "Material Categories Supplied",
          form.materials.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 font-mono text-teal-600 dark:text-teal-400", children: [
            "(",
            form.materials.length,
            " selected)"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Filter categories...",
            value: matSearch,
            onChange: (e) => setMatSearch(e.target.value),
            className: "rounded-none h-8 text-xs",
            "data-ocid": "sup-mat-search"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border p-2 max-h-40 overflow-y-auto grid grid-cols-2 gap-1.5", children: filteredMats.map((mat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Checkbox,
            {
              id: `mat-${mat}`,
              checked: form.materials.includes(mat),
              onCheckedChange: () => toggleMat(mat),
              className: "rounded-none h-3.5 w-3.5",
              "data-ocid": `mat-check-${mat.toLowerCase().replace(/\s+/g, "-")}`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: `mat-${mat}`,
              className: "text-xs text-foreground cursor-pointer",
              children: mat
            }
          )
        ] }, mat)) }),
        form.materials.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: form.materials.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            variant: "outline",
            className: "text-[10px] rounded-none bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-500/30 gap-1 pr-1",
            children: [
              m,
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => toggleMat(m),
                  className: "hover:text-destructive",
                  "aria-label": `Remove ${m}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-2.5 h-2.5" })
                }
              )
            ]
          },
          m
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "submit",
            size: "sm",
            className: "rounded-none bg-teal-600 hover:bg-teal-700 text-white flex-1",
            "data-ocid": "add-supplier-submit",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-4 h-4 mr-1.5" }),
              " Add Supplier"
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
            "data-ocid": "add-supplier-cancel",
            children: "Cancel"
          }
        )
      ] })
    ] })
  ] }) });
}
function SupplierDetailPanel({
  supplier,
  onClose
}) {
  const deliveries = DELIVERY_HISTORY[supplier.id] ?? [];
  const [addDeliveryOpen, setAddDeliveryOpen] = reactExports.useState(false);
  const [editingDelivery, setEditingDelivery] = reactExports.useState(
    null
  );
  const delivered = deliveries.filter((d) => d.status === "Delivered").length;
  const pending = deliveries.filter(
    (d) => d.status === "Pending" || d.status === "InTransit"
  ).length;
  const deliveryCols = [
    {
      key: "date",
      label: "Date",
      sortable: true,
      render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs", children: r.date })
    },
    {
      key: "projectName",
      label: "Project",
      render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs truncate max-w-[120px] block", children: r.projectName })
    },
    {
      key: "materials",
      label: "Materials",
      render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground truncate max-w-[140px] block", children: r.materials })
    },
    {
      key: "amount",
      label: "Value",
      sortable: true,
      align: "right",
      render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs", children: fmt(r.amount) })
    },
    {
      key: "status",
      label: "Status",
      render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsx(DeliveryBadge, { status: r.status })
    },
    {
      key: "id",
      label: "",
      render: (r) => r.status !== "Delivered" && r.status !== "Cancelled" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: (e) => {
            e.stopPropagation();
            setEditingDelivery(r);
          },
          className: "text-[10px] text-teal-600 dark:text-teal-400 hover:underline",
          "data-ocid": "update-delivery-status-btn",
          children: "Update"
        }
      ) : null
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
        className: "fixed right-0 top-0 h-full w-full max-w-2xl bg-card border-l border-border z-50 overflow-y-auto flex flex-col",
        "data-ocid": "supplier-detail-panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 px-5 py-4 border-b border-border bg-muted/30 sticky top-0 z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground truncate", children: supplier.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: supplier.contact })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: supplier.rating }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "p-1 hover:bg-muted transition-colors rounded-sm",
                  "aria-label": "Close panel",
                  "data-ocid": "close-supplier-panel",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 text-muted-foreground" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 px-5 py-4 flex flex-col gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background border border-border p-3 flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5 mt-0.5 text-muted-foreground shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wide text-muted-foreground", children: "Phone" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-foreground mt-0.5", children: supplier.phone })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background border border-border p-3 flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3.5 h-3.5 mt-0.5 text-muted-foreground shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wide text-muted-foreground", children: "Email" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: `mailto:${supplier.email}`,
                      className: "text-xs text-teal-600 dark:text-teal-400 hover:underline font-mono mt-0.5 block",
                      children: supplier.email
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2", children: [
              { label: "Total Orders", value: supplier.totalOrders },
              { label: "Delivered", value: delivered },
              { label: "Active", value: pending, highlight: pending > 0 },
              {
                label: "Pending (£)",
                value: supplier.pendingAmount > 0 ? fmt(supplier.pendingAmount) : "—",
                warn: supplier.pendingAmount > 0
              }
            ].map(({ label, value, highlight, warn }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-background border border-border p-2.5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide", children: label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: `font-mono font-semibold text-sm mt-0.5 ${warn ? "text-orange-600 dark:text-orange-400" : highlight ? "text-teal-600 dark:text-teal-400" : "text-foreground"}`,
                      children: String(value)
                    }
                  )
                ]
              },
              label
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] uppercase tracking-wide text-muted-foreground mb-2 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-3 h-3" }),
                " Material Categories"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: supplier.materials.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "text-[10px] rounded-none bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-500/30",
                  children: m
                },
                m
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-3.5 h-3.5" }),
                  " Delivery History"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "h-7 text-xs rounded-none gap-1",
                    onClick: () => setAddDeliveryOpen(true),
                    "data-ocid": "add-delivery-btn",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-3.5 h-3.5" }),
                      " Schedule Delivery"
                    ]
                  }
                )
              ] }),
              deliveries.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                DataTable,
                {
                  columns: deliveryCols,
                  data: deliveries,
                  rowKey: (r) => r.id,
                  "data-ocid": "delivery-history-table"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground py-4 text-center", children: "No delivery history yet." })
            ] })
          ] })
        ]
      }
    ),
    addDeliveryOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddDeliveryDialog,
      {
        open: addDeliveryOpen,
        onClose: () => setAddDeliveryOpen(false),
        defaultSupplierId: supplier.id
      }
    ),
    editingDelivery && /* @__PURE__ */ jsxRuntimeExports.jsx(
      UpdateDeliveryDialog,
      {
        delivery: editingDelivery,
        onClose: () => setEditingDelivery(null)
      }
    )
  ] });
}
const COLUMNS = [
  {
    key: "name",
    label: "Supplier",
    sortable: true,
    render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-foreground", children: row.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: row.contact })
    ] })
  },
  {
    key: "phone",
    label: "Phone",
    render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: row.phone })
  },
  {
    key: "email",
    label: "Email",
    render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "a",
      {
        href: `mailto:${row.email}`,
        className: "text-xs text-teal-600 dark:text-teal-400 hover:underline font-mono",
        onClick: (e) => e.stopPropagation(),
        children: row.email
      }
    )
  },
  {
    key: "materials",
    label: "Materials",
    render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground truncate max-w-32 block", children: row.materials.join(", ") })
  },
  {
    key: "totalOrders",
    label: "Orders",
    sortable: true,
    align: "right",
    render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm", children: row.totalOrders })
  },
  {
    key: "pendingAmount",
    label: "Pending",
    sortable: true,
    align: "right",
    render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: `font-mono text-sm font-semibold ${row.pendingAmount > 0 ? "text-orange-600 dark:text-orange-400" : "text-muted-foreground"}`,
        children: row.pendingAmount > 0 ? fmt(row.pendingAmount) : "—"
      }
    )
  },
  {
    key: "rating",
    label: "Rating",
    sortable: true,
    align: "center",
    render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: row.rating })
  },
  {
    key: "id",
    label: "",
    render: () => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-teal-600 dark:text-teal-400 flex items-center gap-0.5 hover:underline", children: [
      "View ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" })
    ] })
  }
];
function SuppliersPage() {
  const { data: suppliers, isLoading } = useSuppliers();
  const [addOpen, setAddOpen] = reactExports.useState(false);
  const [deliveryOpen, setDeliveryOpen] = reactExports.useState(false);
  const [selectedSupplier, setSelectedSupplier] = reactExports.useState(
    null
  );
  const totalPending = (suppliers == null ? void 0 : suppliers.reduce((s, sup) => s + sup.pendingAmount, 0)) ?? 0;
  const avgRating = suppliers && suppliers.length > 0 ? suppliers.reduce((s, sup) => s + sup.rating, 0) / suppliers.length : 0;
  const totalOrders = (suppliers == null ? void 0 : suppliers.reduce((s, sup) => s + sup.totalOrders, 0)) ?? 0;
  const activeDeliveries = Object.values(DELIVERY_HISTORY).flat().filter((d) => d.status === "Pending" || d.status === "InTransit").length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "suppliers-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Suppliers",
        subtitle: "Supplier directory and procurement overview",
        action: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "rounded-none gap-1.5",
              onClick: () => setDeliveryOpen(true),
              "data-ocid": "schedule-delivery-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-4 h-4" }),
                " Schedule Delivery"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              className: "rounded-none gap-1.5 bg-teal-600 hover:bg-teal-700 text-white",
              onClick: () => setAddOpen(true),
              "data-ocid": "new-supplier-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-4 h-4" }),
                " Add Supplier"
              ]
            }
          )
        ] }),
        "data-ocid": "suppliers-header"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-grid mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Total Suppliers",
          value: (suppliers == null ? void 0 : suppliers.length) ?? 0,
          accent: "teal",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-4 h-4" }),
          "data-ocid": "stat-suppliers"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Total Orders",
          value: totalOrders,
          accent: "neutral",
          "data-ocid": "stat-orders"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Active Deliveries",
          value: activeDeliveries,
          accent: activeDeliveries > 0 ? "teal" : "neutral",
          "data-ocid": "stat-active-deliveries"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Pending Payments",
          value: fmt(totalPending),
          accent: totalPending > 5e4 ? "orange" : "neutral",
          "data-ocid": "stat-pending-payments"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center gap-4 bg-card border border-border px-4 py-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5 text-amber-500 fill-amber-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground", children: "Average Rating" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm font-semibold text-foreground ml-1", children: avgRating.toFixed(1) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "/ 5.0" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 flex-1 bg-muted overflow-hidden max-w-32", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-full bg-amber-500",
          style: { width: `${avgRating / 5 * 100}%` }
        }
      ) }),
      totalPending > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { orientation: "vertical", className: "h-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          "Outstanding payments:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-orange-600 dark:text-orange-400", children: fmt(totalPending) })
        ] })
      ] })
    ] }),
    !isLoading && (suppliers == null ? void 0 : suppliers.length) === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        title: "No suppliers found",
        description: "Add your first supplier to manage procurement and deliveries.",
        variant: "default",
        "data-ocid": "suppliers-empty"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      DataTable,
      {
        columns: COLUMNS,
        data: suppliers ?? [],
        isLoading,
        rowKey: (r) => r.id,
        searchable: true,
        searchKeys: ["name", "contact"],
        onRowClick: (r) => setSelectedSupplier(r),
        "data-ocid": "suppliers-table"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AddSupplierDialog, { open: addOpen, onClose: () => setAddOpen(false) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddDeliveryDialog,
      {
        open: deliveryOpen,
        onClose: () => setDeliveryOpen(false)
      }
    ),
    selectedSupplier && /* @__PURE__ */ jsxRuntimeExports.jsx(
      SupplierDetailPanel,
      {
        supplier: selectedSupplier,
        onClose: () => setSelectedSupplier(null)
      }
    )
  ] });
}
export {
  SuppliersPage as default
};
