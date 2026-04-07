import { c as createLucideIcon, r as reactExports, J as useComposedRefs, i as useDirection, j as jsxRuntimeExports, l as Primitive, o as Presence, q as createContextScope, n as composeEventHandlers, K as useCallbackRef, L as useLayoutEffect2, s as cn, f as useInvoices, B as Button, F as FileText, M as useUpdateInvoiceStatus, N as useSuppliers, S as StatusBadge, G as Card, b as useProjects, O as useCreateInvoice } from "./index-ZaE-Lxb-.js";
import { D as DataTable, L as Label, I as Input } from "./DataTable-BIlNCIaN.js";
import { e as clamp, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CoYAKacq.js";
import { S as Separator } from "./separator-Bx5xQGRh.js";
import { R as Root$1, C as Content, a as Close, T as Title, P as Portal, O as Overlay, E as EmptyState } from "./EmptyState-CI8B8Z0h.js";
import { X } from "./x-JEdWMEji.js";
import { T as Textarea } from "./textarea-NP5asvhu.js";
import { C as ConfirmDialog } from "./ConfirmDialog-u-u9NpQp.js";
import { P as PageHeader, S as StatCard } from "./StatCard-CeCUcyBE.js";
import { P as Plus } from "./plus-sm6-0jy2.js";
import { T as TriangleAlert } from "./triangle-alert-B9I-LafY.js";
import { C as Clock } from "./clock-C4dHmbCD.js";
import { C as CircleCheck } from "./circle-check-BHAXK1Gd.js";
import "./index-CS-OeuZH.js";
import "./skeleton-t8sFPTil.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m4.9 4.9 14.2 14.2", key: "1m5liu" }]
];
const Ban = createLucideIcon("ban", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode$3);
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
      d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
      key: "143wyd"
    }
  ],
  ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6", key: "1itne7" }],
  ["rect", { x: "6", y: "14", width: "12", height: "8", rx: "1", key: "1ue0tg" }]
];
const Printer = createLucideIcon("printer", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z", key: "q3az6g" }
  ],
  ["path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8", key: "1h4pet" }],
  ["path", { d: "M12 17.5v-11", key: "1jc1ny" }]
];
const Receipt = createLucideIcon("receipt", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
function useStateMachine(initialState, machine) {
  return reactExports.useReducer((state, event) => {
    const nextState = machine[state][event];
    return nextState ?? state;
  }, initialState);
}
var SCROLL_AREA_NAME = "ScrollArea";
var [createScrollAreaContext] = createContextScope(SCROLL_AREA_NAME);
var [ScrollAreaProvider, useScrollAreaContext] = createScrollAreaContext(SCROLL_AREA_NAME);
var ScrollArea$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeScrollArea,
      type = "hover",
      dir,
      scrollHideDelay = 600,
      ...scrollAreaProps
    } = props;
    const [scrollArea, setScrollArea] = reactExports.useState(null);
    const [viewport, setViewport] = reactExports.useState(null);
    const [content, setContent] = reactExports.useState(null);
    const [scrollbarX, setScrollbarX] = reactExports.useState(null);
    const [scrollbarY, setScrollbarY] = reactExports.useState(null);
    const [cornerWidth, setCornerWidth] = reactExports.useState(0);
    const [cornerHeight, setCornerHeight] = reactExports.useState(0);
    const [scrollbarXEnabled, setScrollbarXEnabled] = reactExports.useState(false);
    const [scrollbarYEnabled, setScrollbarYEnabled] = reactExports.useState(false);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setScrollArea(node));
    const direction = useDirection(dir);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScrollAreaProvider,
      {
        scope: __scopeScrollArea,
        type,
        dir: direction,
        scrollHideDelay,
        scrollArea,
        viewport,
        onViewportChange: setViewport,
        content,
        onContentChange: setContent,
        scrollbarX,
        onScrollbarXChange: setScrollbarX,
        scrollbarXEnabled,
        onScrollbarXEnabledChange: setScrollbarXEnabled,
        scrollbarY,
        onScrollbarYChange: setScrollbarY,
        scrollbarYEnabled,
        onScrollbarYEnabledChange: setScrollbarYEnabled,
        onCornerWidthChange: setCornerWidth,
        onCornerHeightChange: setCornerHeight,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            ...scrollAreaProps,
            ref: composedRefs,
            style: {
              position: "relative",
              // Pass corner sizes as CSS vars to reduce re-renders of context consumers
              ["--radix-scroll-area-corner-width"]: cornerWidth + "px",
              ["--radix-scroll-area-corner-height"]: cornerHeight + "px",
              ...props.style
            }
          }
        )
      }
    );
  }
);
ScrollArea$1.displayName = SCROLL_AREA_NAME;
var VIEWPORT_NAME = "ScrollAreaViewport";
var ScrollAreaViewport = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeScrollArea, children, nonce, ...viewportProps } = props;
    const context = useScrollAreaContext(VIEWPORT_NAME, __scopeScrollArea);
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref, context.onViewportChange);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: `[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}`
          },
          nonce
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          "data-radix-scroll-area-viewport": "",
          ...viewportProps,
          ref: composedRefs,
          style: {
            /**
             * We don't support `visible` because the intention is to have at least one scrollbar
             * if this component is used and `visible` will behave like `auto` in that case
             * https://developer.mozilla.org/en-US/docs/Web/CSS/overflow#description
             *
             * We don't handle `auto` because the intention is for the native implementation
             * to be hidden if using this component. We just want to ensure the node is scrollable
             * so could have used either `scroll` or `auto` here. We picked `scroll` to prevent
             * the browser from having to work out whether to render native scrollbars or not,
             * we tell it to with the intention of hiding them in CSS.
             */
            overflowX: context.scrollbarXEnabled ? "scroll" : "hidden",
            overflowY: context.scrollbarYEnabled ? "scroll" : "hidden",
            ...props.style
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: context.onContentChange, style: { minWidth: "100%", display: "table" }, children })
        }
      )
    ] });
  }
);
ScrollAreaViewport.displayName = VIEWPORT_NAME;
var SCROLLBAR_NAME = "ScrollAreaScrollbar";
var ScrollAreaScrollbar = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { forceMount, ...scrollbarProps } = props;
    const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
    const { onScrollbarXEnabledChange, onScrollbarYEnabledChange } = context;
    const isHorizontal = props.orientation === "horizontal";
    reactExports.useEffect(() => {
      isHorizontal ? onScrollbarXEnabledChange(true) : onScrollbarYEnabledChange(true);
      return () => {
        isHorizontal ? onScrollbarXEnabledChange(false) : onScrollbarYEnabledChange(false);
      };
    }, [isHorizontal, onScrollbarXEnabledChange, onScrollbarYEnabledChange]);
    return context.type === "hover" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarHover, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "scroll" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarScroll, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "auto" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarAuto, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "always" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarVisible, { ...scrollbarProps, ref: forwardedRef }) : null;
  }
);
ScrollAreaScrollbar.displayName = SCROLLBAR_NAME;
var ScrollAreaScrollbarHover = reactExports.forwardRef((props, forwardedRef) => {
  const { forceMount, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [visible, setVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const scrollArea = context.scrollArea;
    let hideTimer = 0;
    if (scrollArea) {
      const handlePointerEnter = () => {
        window.clearTimeout(hideTimer);
        setVisible(true);
      };
      const handlePointerLeave = () => {
        hideTimer = window.setTimeout(() => setVisible(false), context.scrollHideDelay);
      };
      scrollArea.addEventListener("pointerenter", handlePointerEnter);
      scrollArea.addEventListener("pointerleave", handlePointerLeave);
      return () => {
        window.clearTimeout(hideTimer);
        scrollArea.removeEventListener("pointerenter", handlePointerEnter);
        scrollArea.removeEventListener("pointerleave", handlePointerLeave);
      };
    }
  }, [context.scrollArea, context.scrollHideDelay]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || visible, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarAuto,
    {
      "data-state": visible ? "visible" : "hidden",
      ...scrollbarProps,
      ref: forwardedRef
    }
  ) });
});
var ScrollAreaScrollbarScroll = reactExports.forwardRef((props, forwardedRef) => {
  const { forceMount, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const isHorizontal = props.orientation === "horizontal";
  const debounceScrollEnd = useDebounceCallback(() => send("SCROLL_END"), 100);
  const [state, send] = useStateMachine("hidden", {
    hidden: {
      SCROLL: "scrolling"
    },
    scrolling: {
      SCROLL_END: "idle",
      POINTER_ENTER: "interacting"
    },
    interacting: {
      SCROLL: "interacting",
      POINTER_LEAVE: "idle"
    },
    idle: {
      HIDE: "hidden",
      SCROLL: "scrolling",
      POINTER_ENTER: "interacting"
    }
  });
  reactExports.useEffect(() => {
    if (state === "idle") {
      const hideTimer = window.setTimeout(() => send("HIDE"), context.scrollHideDelay);
      return () => window.clearTimeout(hideTimer);
    }
  }, [state, context.scrollHideDelay, send]);
  reactExports.useEffect(() => {
    const viewport = context.viewport;
    const scrollDirection = isHorizontal ? "scrollLeft" : "scrollTop";
    if (viewport) {
      let prevScrollPos = viewport[scrollDirection];
      const handleScroll = () => {
        const scrollPos = viewport[scrollDirection];
        const hasScrollInDirectionChanged = prevScrollPos !== scrollPos;
        if (hasScrollInDirectionChanged) {
          send("SCROLL");
          debounceScrollEnd();
        }
        prevScrollPos = scrollPos;
      };
      viewport.addEventListener("scroll", handleScroll);
      return () => viewport.removeEventListener("scroll", handleScroll);
    }
  }, [context.viewport, isHorizontal, send, debounceScrollEnd]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || state !== "hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarVisible,
    {
      "data-state": state === "hidden" ? "hidden" : "visible",
      ...scrollbarProps,
      ref: forwardedRef,
      onPointerEnter: composeEventHandlers(props.onPointerEnter, () => send("POINTER_ENTER")),
      onPointerLeave: composeEventHandlers(props.onPointerLeave, () => send("POINTER_LEAVE"))
    }
  ) });
});
var ScrollAreaScrollbarAuto = reactExports.forwardRef((props, forwardedRef) => {
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const { forceMount, ...scrollbarProps } = props;
  const [visible, setVisible] = reactExports.useState(false);
  const isHorizontal = props.orientation === "horizontal";
  const handleResize = useDebounceCallback(() => {
    if (context.viewport) {
      const isOverflowX = context.viewport.offsetWidth < context.viewport.scrollWidth;
      const isOverflowY = context.viewport.offsetHeight < context.viewport.scrollHeight;
      setVisible(isHorizontal ? isOverflowX : isOverflowY);
    }
  }, 10);
  useResizeObserver(context.viewport, handleResize);
  useResizeObserver(context.content, handleResize);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || visible, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarVisible,
    {
      "data-state": visible ? "visible" : "hidden",
      ...scrollbarProps,
      ref: forwardedRef
    }
  ) });
});
var ScrollAreaScrollbarVisible = reactExports.forwardRef((props, forwardedRef) => {
  const { orientation = "vertical", ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const thumbRef = reactExports.useRef(null);
  const pointerOffsetRef = reactExports.useRef(0);
  const [sizes, setSizes] = reactExports.useState({
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  });
  const thumbRatio = getThumbRatio(sizes.viewport, sizes.content);
  const commonProps = {
    ...scrollbarProps,
    sizes,
    onSizesChange: setSizes,
    hasThumb: Boolean(thumbRatio > 0 && thumbRatio < 1),
    onThumbChange: (thumb) => thumbRef.current = thumb,
    onThumbPointerUp: () => pointerOffsetRef.current = 0,
    onThumbPointerDown: (pointerPos) => pointerOffsetRef.current = pointerPos
  };
  function getScrollPosition(pointerPos, dir) {
    return getScrollPositionFromPointer(pointerPos, pointerOffsetRef.current, sizes, dir);
  }
  if (orientation === "horizontal") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScrollAreaScrollbarX,
      {
        ...commonProps,
        ref: forwardedRef,
        onThumbPositionChange: () => {
          if (context.viewport && thumbRef.current) {
            const scrollPos = context.viewport.scrollLeft;
            const offset = getThumbOffsetFromScroll(scrollPos, sizes, context.dir);
            thumbRef.current.style.transform = `translate3d(${offset}px, 0, 0)`;
          }
        },
        onWheelScroll: (scrollPos) => {
          if (context.viewport) context.viewport.scrollLeft = scrollPos;
        },
        onDragScroll: (pointerPos) => {
          if (context.viewport) {
            context.viewport.scrollLeft = getScrollPosition(pointerPos, context.dir);
          }
        }
      }
    );
  }
  if (orientation === "vertical") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScrollAreaScrollbarY,
      {
        ...commonProps,
        ref: forwardedRef,
        onThumbPositionChange: () => {
          if (context.viewport && thumbRef.current) {
            const scrollPos = context.viewport.scrollTop;
            const offset = getThumbOffsetFromScroll(scrollPos, sizes);
            thumbRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
          }
        },
        onWheelScroll: (scrollPos) => {
          if (context.viewport) context.viewport.scrollTop = scrollPos;
        },
        onDragScroll: (pointerPos) => {
          if (context.viewport) context.viewport.scrollTop = getScrollPosition(pointerPos);
        }
      }
    );
  }
  return null;
});
var ScrollAreaScrollbarX = reactExports.forwardRef((props, forwardedRef) => {
  const { sizes, onSizesChange, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [computedStyle, setComputedStyle] = reactExports.useState();
  const ref = reactExports.useRef(null);
  const composeRefs = useComposedRefs(forwardedRef, ref, context.onScrollbarXChange);
  reactExports.useEffect(() => {
    if (ref.current) setComputedStyle(getComputedStyle(ref.current));
  }, [ref]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarImpl,
    {
      "data-orientation": "horizontal",
      ...scrollbarProps,
      ref: composeRefs,
      sizes,
      style: {
        bottom: 0,
        left: context.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
        right: context.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
        ["--radix-scroll-area-thumb-width"]: getThumbSize(sizes) + "px",
        ...props.style
      },
      onThumbPointerDown: (pointerPos) => props.onThumbPointerDown(pointerPos.x),
      onDragScroll: (pointerPos) => props.onDragScroll(pointerPos.x),
      onWheelScroll: (event, maxScrollPos) => {
        if (context.viewport) {
          const scrollPos = context.viewport.scrollLeft + event.deltaX;
          props.onWheelScroll(scrollPos);
          if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
            event.preventDefault();
          }
        }
      },
      onResize: () => {
        if (ref.current && context.viewport && computedStyle) {
          onSizesChange({
            content: context.viewport.scrollWidth,
            viewport: context.viewport.offsetWidth,
            scrollbar: {
              size: ref.current.clientWidth,
              paddingStart: toInt(computedStyle.paddingLeft),
              paddingEnd: toInt(computedStyle.paddingRight)
            }
          });
        }
      }
    }
  );
});
var ScrollAreaScrollbarY = reactExports.forwardRef((props, forwardedRef) => {
  const { sizes, onSizesChange, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [computedStyle, setComputedStyle] = reactExports.useState();
  const ref = reactExports.useRef(null);
  const composeRefs = useComposedRefs(forwardedRef, ref, context.onScrollbarYChange);
  reactExports.useEffect(() => {
    if (ref.current) setComputedStyle(getComputedStyle(ref.current));
  }, [ref]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarImpl,
    {
      "data-orientation": "vertical",
      ...scrollbarProps,
      ref: composeRefs,
      sizes,
      style: {
        top: 0,
        right: context.dir === "ltr" ? 0 : void 0,
        left: context.dir === "rtl" ? 0 : void 0,
        bottom: "var(--radix-scroll-area-corner-height)",
        ["--radix-scroll-area-thumb-height"]: getThumbSize(sizes) + "px",
        ...props.style
      },
      onThumbPointerDown: (pointerPos) => props.onThumbPointerDown(pointerPos.y),
      onDragScroll: (pointerPos) => props.onDragScroll(pointerPos.y),
      onWheelScroll: (event, maxScrollPos) => {
        if (context.viewport) {
          const scrollPos = context.viewport.scrollTop + event.deltaY;
          props.onWheelScroll(scrollPos);
          if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
            event.preventDefault();
          }
        }
      },
      onResize: () => {
        if (ref.current && context.viewport && computedStyle) {
          onSizesChange({
            content: context.viewport.scrollHeight,
            viewport: context.viewport.offsetHeight,
            scrollbar: {
              size: ref.current.clientHeight,
              paddingStart: toInt(computedStyle.paddingTop),
              paddingEnd: toInt(computedStyle.paddingBottom)
            }
          });
        }
      }
    }
  );
});
var [ScrollbarProvider, useScrollbarContext] = createScrollAreaContext(SCROLLBAR_NAME);
var ScrollAreaScrollbarImpl = reactExports.forwardRef((props, forwardedRef) => {
  const {
    __scopeScrollArea,
    sizes,
    hasThumb,
    onThumbChange,
    onThumbPointerUp,
    onThumbPointerDown,
    onThumbPositionChange,
    onDragScroll,
    onWheelScroll,
    onResize,
    ...scrollbarProps
  } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, __scopeScrollArea);
  const [scrollbar, setScrollbar] = reactExports.useState(null);
  const composeRefs = useComposedRefs(forwardedRef, (node) => setScrollbar(node));
  const rectRef = reactExports.useRef(null);
  const prevWebkitUserSelectRef = reactExports.useRef("");
  const viewport = context.viewport;
  const maxScrollPos = sizes.content - sizes.viewport;
  const handleWheelScroll = useCallbackRef(onWheelScroll);
  const handleThumbPositionChange = useCallbackRef(onThumbPositionChange);
  const handleResize = useDebounceCallback(onResize, 10);
  function handleDragScroll(event) {
    if (rectRef.current) {
      const x = event.clientX - rectRef.current.left;
      const y = event.clientY - rectRef.current.top;
      onDragScroll({ x, y });
    }
  }
  reactExports.useEffect(() => {
    const handleWheel = (event) => {
      const element = event.target;
      const isScrollbarWheel = scrollbar == null ? void 0 : scrollbar.contains(element);
      if (isScrollbarWheel) handleWheelScroll(event, maxScrollPos);
    };
    document.addEventListener("wheel", handleWheel, { passive: false });
    return () => document.removeEventListener("wheel", handleWheel, { passive: false });
  }, [viewport, scrollbar, maxScrollPos, handleWheelScroll]);
  reactExports.useEffect(handleThumbPositionChange, [sizes, handleThumbPositionChange]);
  useResizeObserver(scrollbar, handleResize);
  useResizeObserver(context.content, handleResize);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollbarProvider,
    {
      scope: __scopeScrollArea,
      scrollbar,
      hasThumb,
      onThumbChange: useCallbackRef(onThumbChange),
      onThumbPointerUp: useCallbackRef(onThumbPointerUp),
      onThumbPositionChange: handleThumbPositionChange,
      onThumbPointerDown: useCallbackRef(onThumbPointerDown),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          ...scrollbarProps,
          ref: composeRefs,
          style: { position: "absolute", ...scrollbarProps.style },
          onPointerDown: composeEventHandlers(props.onPointerDown, (event) => {
            const mainPointer = 0;
            if (event.button === mainPointer) {
              const element = event.target;
              element.setPointerCapture(event.pointerId);
              rectRef.current = scrollbar.getBoundingClientRect();
              prevWebkitUserSelectRef.current = document.body.style.webkitUserSelect;
              document.body.style.webkitUserSelect = "none";
              if (context.viewport) context.viewport.style.scrollBehavior = "auto";
              handleDragScroll(event);
            }
          }),
          onPointerMove: composeEventHandlers(props.onPointerMove, handleDragScroll),
          onPointerUp: composeEventHandlers(props.onPointerUp, (event) => {
            const element = event.target;
            if (element.hasPointerCapture(event.pointerId)) {
              element.releasePointerCapture(event.pointerId);
            }
            document.body.style.webkitUserSelect = prevWebkitUserSelectRef.current;
            if (context.viewport) context.viewport.style.scrollBehavior = "";
            rectRef.current = null;
          })
        }
      )
    }
  );
});
var THUMB_NAME = "ScrollAreaThumb";
var ScrollAreaThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { forceMount, ...thumbProps } = props;
    const scrollbarContext = useScrollbarContext(THUMB_NAME, props.__scopeScrollArea);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || scrollbarContext.hasThumb, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaThumbImpl, { ref: forwardedRef, ...thumbProps }) });
  }
);
var ScrollAreaThumbImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeScrollArea, style, ...thumbProps } = props;
    const scrollAreaContext = useScrollAreaContext(THUMB_NAME, __scopeScrollArea);
    const scrollbarContext = useScrollbarContext(THUMB_NAME, __scopeScrollArea);
    const { onThumbPositionChange } = scrollbarContext;
    const composedRef = useComposedRefs(
      forwardedRef,
      (node) => scrollbarContext.onThumbChange(node)
    );
    const removeUnlinkedScrollListenerRef = reactExports.useRef(void 0);
    const debounceScrollEnd = useDebounceCallback(() => {
      if (removeUnlinkedScrollListenerRef.current) {
        removeUnlinkedScrollListenerRef.current();
        removeUnlinkedScrollListenerRef.current = void 0;
      }
    }, 100);
    reactExports.useEffect(() => {
      const viewport = scrollAreaContext.viewport;
      if (viewport) {
        const handleScroll = () => {
          debounceScrollEnd();
          if (!removeUnlinkedScrollListenerRef.current) {
            const listener = addUnlinkedScrollListener(viewport, onThumbPositionChange);
            removeUnlinkedScrollListenerRef.current = listener;
            onThumbPositionChange();
          }
        };
        onThumbPositionChange();
        viewport.addEventListener("scroll", handleScroll);
        return () => viewport.removeEventListener("scroll", handleScroll);
      }
    }, [scrollAreaContext.viewport, debounceScrollEnd, onThumbPositionChange]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": scrollbarContext.hasThumb ? "visible" : "hidden",
        ...thumbProps,
        ref: composedRef,
        style: {
          width: "var(--radix-scroll-area-thumb-width)",
          height: "var(--radix-scroll-area-thumb-height)",
          ...style
        },
        onPointerDownCapture: composeEventHandlers(props.onPointerDownCapture, (event) => {
          const thumb = event.target;
          const thumbRect = thumb.getBoundingClientRect();
          const x = event.clientX - thumbRect.left;
          const y = event.clientY - thumbRect.top;
          scrollbarContext.onThumbPointerDown({ x, y });
        }),
        onPointerUp: composeEventHandlers(props.onPointerUp, scrollbarContext.onThumbPointerUp)
      }
    );
  }
);
ScrollAreaThumb.displayName = THUMB_NAME;
var CORNER_NAME = "ScrollAreaCorner";
var ScrollAreaCorner = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useScrollAreaContext(CORNER_NAME, props.__scopeScrollArea);
    const hasBothScrollbarsVisible = Boolean(context.scrollbarX && context.scrollbarY);
    const hasCorner = context.type !== "scroll" && hasBothScrollbarsVisible;
    return hasCorner ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaCornerImpl, { ...props, ref: forwardedRef }) : null;
  }
);
ScrollAreaCorner.displayName = CORNER_NAME;
var ScrollAreaCornerImpl = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeScrollArea, ...cornerProps } = props;
  const context = useScrollAreaContext(CORNER_NAME, __scopeScrollArea);
  const [width, setWidth] = reactExports.useState(0);
  const [height, setHeight] = reactExports.useState(0);
  const hasSize = Boolean(width && height);
  useResizeObserver(context.scrollbarX, () => {
    var _a;
    const height2 = ((_a = context.scrollbarX) == null ? void 0 : _a.offsetHeight) || 0;
    context.onCornerHeightChange(height2);
    setHeight(height2);
  });
  useResizeObserver(context.scrollbarY, () => {
    var _a;
    const width2 = ((_a = context.scrollbarY) == null ? void 0 : _a.offsetWidth) || 0;
    context.onCornerWidthChange(width2);
    setWidth(width2);
  });
  return hasSize ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      ...cornerProps,
      ref: forwardedRef,
      style: {
        width,
        height,
        position: "absolute",
        right: context.dir === "ltr" ? 0 : void 0,
        left: context.dir === "rtl" ? 0 : void 0,
        bottom: 0,
        ...props.style
      }
    }
  ) : null;
});
function toInt(value) {
  return value ? parseInt(value, 10) : 0;
}
function getThumbRatio(viewportSize, contentSize) {
  const ratio = viewportSize / contentSize;
  return isNaN(ratio) ? 0 : ratio;
}
function getThumbSize(sizes) {
  const ratio = getThumbRatio(sizes.viewport, sizes.content);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const thumbSize = (sizes.scrollbar.size - scrollbarPadding) * ratio;
  return Math.max(thumbSize, 18);
}
function getScrollPositionFromPointer(pointerPos, pointerOffset, sizes, dir = "ltr") {
  const thumbSizePx = getThumbSize(sizes);
  const thumbCenter = thumbSizePx / 2;
  const offset = pointerOffset || thumbCenter;
  const thumbOffsetFromEnd = thumbSizePx - offset;
  const minPointerPos = sizes.scrollbar.paddingStart + offset;
  const maxPointerPos = sizes.scrollbar.size - sizes.scrollbar.paddingEnd - thumbOffsetFromEnd;
  const maxScrollPos = sizes.content - sizes.viewport;
  const scrollRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const interpolate = linearScale([minPointerPos, maxPointerPos], scrollRange);
  return interpolate(pointerPos);
}
function getThumbOffsetFromScroll(scrollPos, sizes, dir = "ltr") {
  const thumbSizePx = getThumbSize(sizes);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const scrollbar = sizes.scrollbar.size - scrollbarPadding;
  const maxScrollPos = sizes.content - sizes.viewport;
  const maxThumbPos = scrollbar - thumbSizePx;
  const scrollClampRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const scrollWithoutMomentum = clamp(scrollPos, scrollClampRange);
  const interpolate = linearScale([0, maxScrollPos], [0, maxThumbPos]);
  return interpolate(scrollWithoutMomentum);
}
function linearScale(input, output) {
  return (value) => {
    if (input[0] === input[1] || output[0] === output[1]) return output[0];
    const ratio = (output[1] - output[0]) / (input[1] - input[0]);
    return output[0] + ratio * (value - input[0]);
  };
}
function isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos) {
  return scrollPos > 0 && scrollPos < maxScrollPos;
}
var addUnlinkedScrollListener = (node, handler = () => {
}) => {
  let prevPosition = { left: node.scrollLeft, top: node.scrollTop };
  let rAF = 0;
  (function loop() {
    const position = { left: node.scrollLeft, top: node.scrollTop };
    const isHorizontalScroll = prevPosition.left !== position.left;
    const isVerticalScroll = prevPosition.top !== position.top;
    if (isHorizontalScroll || isVerticalScroll) handler();
    prevPosition = position;
    rAF = window.requestAnimationFrame(loop);
  })();
  return () => window.cancelAnimationFrame(rAF);
};
function useDebounceCallback(callback, delay) {
  const handleCallback = useCallbackRef(callback);
  const debounceTimerRef = reactExports.useRef(0);
  reactExports.useEffect(() => () => window.clearTimeout(debounceTimerRef.current), []);
  return reactExports.useCallback(() => {
    window.clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = window.setTimeout(handleCallback, delay);
  }, [handleCallback, delay]);
}
function useResizeObserver(element, onResize) {
  const handleResize = useCallbackRef(onResize);
  useLayoutEffect2(() => {
    let rAF = 0;
    if (element) {
      const resizeObserver = new ResizeObserver(() => {
        cancelAnimationFrame(rAF);
        rAF = window.requestAnimationFrame(handleResize);
      });
      resizeObserver.observe(element);
      return () => {
        window.cancelAnimationFrame(rAF);
        resizeObserver.unobserve(element);
      };
    }
  }, [element, handleResize]);
}
var Root = ScrollArea$1;
var Viewport = ScrollAreaViewport;
var Corner = ScrollAreaCorner;
function ScrollArea({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Root,
    {
      "data-slot": "scroll-area",
      className: cn("relative", className),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Viewport,
          {
            "data-slot": "scroll-area-viewport",
            className: "focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1",
            children
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollBar, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Corner, {})
      ]
    }
  );
}
function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbar,
    {
      "data-slot": "scroll-area-scrollbar",
      orientation,
      className: cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ScrollAreaThumb,
        {
          "data-slot": "scroll-area-thumb",
          className: "bg-border relative flex-1 rounded-full"
        }
      )
    }
  );
}
function Sheet({ ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root$1, { "data-slot": "sheet", ...props });
}
function SheetPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "sheet-portal", ...props });
}
function SheetOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "sheet-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function SheetContent({
  className,
  children,
  side = "right",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "sheet-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        ),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function SheetHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "sheet-header",
      className: cn("flex flex-col gap-1.5 p-4", className),
      ...props
    }
  );
}
function SheetTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "sheet-title",
      className: cn("text-foreground font-semibold", className),
      ...props
    }
  );
}
function fmt(n) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(n);
}
function fmtDec(n) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(n);
}
const STATUS_FILTERS = [
  "All",
  "Draft",
  "Pending",
  "Approved",
  "Paid",
  "Overdue",
  "Disputed",
  "Cancelled"
];
const CATEGORY_OPTIONS = ["Material", "Labor", "Equipment", "Service"];
const COLUMNS = [
  { key: "invoiceNumber", label: "Invoice #", sortable: true },
  { key: "supplier", label: "Supplier", sortable: true },
  { key: "projectName", label: "Project", sortable: true },
  { key: "category", label: "Category" },
  {
    key: "amount",
    label: "Amount",
    sortable: true,
    align: "right",
    render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-sm", children: fmt(row.amount) })
  },
  {
    key: "status",
    label: "Status",
    render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: row.status })
  },
  { key: "issueDate", label: "Issued", sortable: true },
  {
    key: "dueDate",
    label: "Due Date",
    sortable: true,
    render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: row.status === "Overdue" ? "text-destructive font-medium" : "",
        children: row.dueDate
      }
    )
  }
];
const NEXT_ACTIONS = {
  Draft: [
    {
      label: "Submit for Approval",
      next: "Pending",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
      variant: "teal"
    }
  ],
  Pending: [
    {
      label: "Mark Approved",
      next: "Approved",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
      variant: "teal"
    },
    {
      label: "Mark Disputed",
      next: "Disputed",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5" }),
      variant: "orange"
    }
  ],
  Approved: [
    {
      label: "Mark as Paid",
      next: "Paid",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
      variant: "teal"
    }
  ],
  Overdue: [
    {
      label: "Mark as Paid",
      next: "Paid",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
      variant: "teal"
    },
    {
      label: "Mark Disputed",
      next: "Disputed",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5" }),
      variant: "orange"
    }
  ],
  Disputed: [
    {
      label: "Re-submit Pending",
      next: "Pending",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
      variant: "teal"
    },
    {
      label: "Cancel Invoice",
      next: "Cancelled",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { className: "w-3.5 h-3.5" }),
      variant: "red"
    }
  ]
};
function CreateInvoiceSheet({ open, onClose }) {
  const { data: projects } = useProjects();
  const { data: suppliers } = useSuppliers();
  const createInvoice = useCreateInvoice();
  const [projectId, setProjectId] = reactExports.useState("");
  const [supplierId, setSupplierId] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState("Material");
  const [notes, setNotes] = reactExports.useState("");
  const [lineItems, setLineItems] = reactExports.useState([
    { id: "li1", description: "", quantity: 1, unitPrice: 0 }
  ]);
  const total = lineItems.reduce((s, li) => s + li.quantity * li.unitPrice, 0);
  const selectedProject = projects == null ? void 0 : projects.find((p) => p.id === projectId);
  const selectedSupplier = suppliers == null ? void 0 : suppliers.find((s) => s.id === supplierId);
  function addLine() {
    setLineItems((prev) => [
      ...prev,
      { id: `li${Date.now()}`, description: "", quantity: 1, unitPrice: 0 }
    ]);
  }
  function removeLine(id) {
    setLineItems((prev) => prev.filter((li) => li.id !== id));
  }
  function updateLine(id, field, value) {
    setLineItems(
      (prev) => prev.map((li) => li.id === id ? { ...li, [field]: value } : li)
    );
  }
  function handleSubmit() {
    if (!projectId || !selectedProject) return;
    createInvoice.mutate(
      {
        supplier: (selectedSupplier == null ? void 0 : selectedSupplier.name) ?? "Unknown Supplier",
        projectId,
        projectName: selectedProject.name,
        amount: total,
        status: "Draft",
        description: notes || lineItems.map((li) => li.description).join("; "),
        category
      },
      {
        onSuccess: () => {
          onClose();
          setProjectId("");
          setSupplierId("");
          setNotes("");
          setLineItems([
            { id: "li1", description: "", quantity: 1, unitPrice: 0 }
          ]);
        }
      }
    );
  }
  const canSubmit = projectId && lineItems.some(
    (li) => li.description && li.quantity > 0 && li.unitPrice > 0
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SheetContent,
    {
      side: "right",
      className: "w-full sm:max-w-2xl rounded-none p-0 flex flex-col",
      "data-ocid": "create-invoice-sheet",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { className: "px-6 py-4 border-b border-border bg-card shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetTitle, { className: "font-display text-base flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "w-4 h-4 text-primary" }),
          "New Invoice"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-5 space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "inv-project",
                  className: "text-xs font-medium uppercase tracking-wide text-muted-foreground",
                  children: "Project *"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: projectId, onValueChange: setProjectId, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    id: "inv-project",
                    className: "rounded-none",
                    "data-ocid": "inv-project-select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select project…" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "rounded-none", children: projects == null ? void 0 : projects.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p.id, children: p.name }, p.id)) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "inv-supplier",
                  className: "text-xs font-medium uppercase tracking-wide text-muted-foreground",
                  children: "Supplier"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: supplierId, onValueChange: setSupplierId, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    id: "inv-supplier",
                    className: "rounded-none",
                    "data-ocid": "inv-supplier-select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select supplier…" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "rounded-none", children: suppliers == null ? void 0 : suppliers.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s.id, children: s.name }, s.id)) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium uppercase tracking-wide text-muted-foreground", children: "Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: CATEGORY_OPTIONS.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setCategory(cat),
                className: `text-xs px-3 py-1.5 border font-medium transition-colors ${category === cat ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground hover:border-primary/50"}`,
                "data-ocid": `inv-cat-${cat.toLowerCase()}`,
                children: cat
              },
              cat
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium uppercase tracking-wide text-muted-foreground", children: "Line Items" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  onClick: addLine,
                  className: "h-7 gap-1 text-xs rounded-none text-primary hover:text-primary",
                  "data-ocid": "add-line-item",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
                    " Add Row"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1fr_80px_100px_32px] gap-1.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground px-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Description" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right", children: "Qty" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right", children: "Unit Price (£)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", {})
            ] }),
            lineItems.map((li, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "grid grid-cols-[1fr_80px_100px_32px] gap-1.5 items-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: li.description,
                      onChange: (e) => updateLine(li.id, "description", e.target.value),
                      placeholder: `Item ${idx + 1}`,
                      className: "rounded-none h-8 text-sm",
                      "data-ocid": `line-desc-${idx}`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "number",
                      min: 1,
                      value: li.quantity,
                      onChange: (e) => updateLine(li.id, "quantity", Number(e.target.value)),
                      className: "rounded-none h-8 text-sm text-right",
                      "data-ocid": `line-qty-${idx}`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "number",
                      min: 0,
                      step: 0.01,
                      value: li.unitPrice,
                      onChange: (e) => updateLine(li.id, "unitPrice", Number(e.target.value)),
                      className: "rounded-none h-8 text-sm text-right font-mono",
                      "data-ocid": `line-price-${idx}`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => removeLine(li.id),
                      disabled: lineItems.length === 1,
                      className: "flex items-center justify-center h-8 w-8 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-30",
                      "aria-label": "Remove line",
                      "data-ocid": `line-remove-${idx}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                    }
                  )
                ]
              },
              li.id
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pt-2 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right space-y-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-xl text-foreground font-mono", children: fmtDec(total) })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "inv-notes",
                className: "text-xs font-medium uppercase tracking-wide text-muted-foreground",
                children: "Notes"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "inv-notes",
                value: notes,
                onChange: (e) => setNotes(e.target.value),
                placeholder: "Additional notes or payment terms…",
                className: "rounded-none text-sm resize-none",
                rows: 3,
                "data-ocid": "inv-notes"
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 border-t border-border bg-card flex items-center justify-between gap-3 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: onClose,
              className: "rounded-none",
              "data-ocid": "create-invoice-cancel",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              disabled: !canSubmit || createInvoice.isPending,
              onClick: handleSubmit,
              className: "rounded-none gap-1.5 bg-teal-600 hover:bg-teal-700 text-white",
              "data-ocid": "create-invoice-submit",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "w-4 h-4" }),
                createInvoice.isPending ? "Creating…" : "Create Invoice"
              ]
            }
          )
        ] })
      ]
    }
  ) });
}
function InvoiceDetail({ invoice, onBack }) {
  const updateStatus = useUpdateInvoiceStatus();
  const { data: suppliers } = useSuppliers();
  const printRef = reactExports.useRef(null);
  const [confirmAction, setConfirmAction] = reactExports.useState(null);
  const supplier = suppliers == null ? void 0 : suppliers.find((s) => s.name === invoice.supplier);
  const actions = NEXT_ACTIONS[invoice.status] ?? [];
  function handlePrint() {
    if (!printRef.current) return;
    const content = printRef.current.innerHTML;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`<!DOCTYPE html><html><head>
      <title>Invoice ${invoice.invoiceNumber}</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', system-ui, sans-serif; font-size: 13px; color: #111; padding: 40px; }
        h1 { font-size: 22px; font-weight: 800; letter-spacing: -0.02em; }
        h2 { font-size: 14px; font-weight: 700; margin-bottom: 6px; }
        table { width: 100%; border-collapse: collapse; margin-top: 16px; }
        th { text-align: left; padding: 6px 8px; border-bottom: 2px solid #111; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; }
        td { padding: 6px 8px; border-bottom: 1px solid #e5e7eb; vertical-align: top; }
        .text-right { text-align: right; }
        .mono { font-family: 'JetBrains Mono', monospace; }
        .total-row td { font-weight: 700; border-top: 2px solid #111; border-bottom: none; padding-top: 10px; }
        .badge { display: inline-block; padding: 2px 8px; border: 1px solid #ccc; border-radius: 2px; font-size: 11px; }
        .section { margin-bottom: 24px; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px; }
        .label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 2px; }
        .teal-bar { height: 3px; background: #0d9488; margin-bottom: 24px; }
      </style>
    </head><body>${content}</body></html>`);
    win.document.close();
    win.focus();
    win.print();
    win.close();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "invoice-detail", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: `Invoice ${invoice.invoiceNumber}`,
        breadcrumbs: [
          { label: "Invoices", onClick: onBack },
          { label: invoice.invoiceNumber }
        ],
        subtitle: `${invoice.supplier} · ${invoice.projectName}`,
        action: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: handlePrint,
              className: "rounded-none gap-1.5",
              "data-ocid": "invoice-print-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "w-3.5 h-3.5" }),
                " Print"
              ]
            }
          ),
          actions.map((action) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              onClick: () => setConfirmAction({ label: action.label, next: action.next }),
              className: `rounded-none gap-1.5 text-white ${action.variant === "teal" ? "bg-teal-600 hover:bg-teal-700" : action.variant === "orange" ? "bg-orange-500 hover:bg-orange-600" : "bg-destructive hover:bg-destructive/90"}`,
              "data-ocid": `invoice-action-${action.next.toLowerCase()}`,
              children: [
                action.icon,
                action.label
              ]
            },
            action.next
          ))
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: printRef, className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden print:block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              height: "3px",
              background: "#0d9488",
              marginBottom: "24px"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "BuildTrack" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#6b7280", fontSize: "12px" }, children: "Construction Management Platform" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 bg-muted/40 border border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: invoice.status }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          "Issued ",
          invoice.issueDate,
          " · Due ",
          invoice.dueDate,
          invoice.paidDate && ` · Paid ${invoice.paidDate}`
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-none border border-border p-5 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Invoice Details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "space-y-2", children: [
            { label: "Invoice Number", value: invoice.invoiceNumber },
            { label: "Project", value: invoice.projectName },
            { label: "Category", value: invoice.category },
            { label: "Issue Date", value: invoice.issueDate },
            { label: "Due Date", value: invoice.dueDate },
            ...invoice.paidDate ? [{ label: "Paid Date", value: invoice.paidDate }] : []
          ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-medium text-foreground text-right", children: value })
          ] }, label)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-none border border-border p-5 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Supplier Details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border" }),
          supplier ? /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "space-y-2", children: [
            { label: "Company", value: supplier.name },
            { label: "Contact", value: supplier.contact },
            { label: "Email", value: supplier.email },
            { label: "Phone", value: supplier.phone },
            {
              label: "Rating",
              value: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                "★".repeat(Math.floor(supplier.rating)),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground ml-1", children: [
                  "(",
                  supplier.rating,
                  ")"
                ] })
              ] })
            }
          ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex justify-between gap-2 text-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-medium text-foreground text-right", children: value })
              ]
            },
            label
          )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground font-medium", children: invoice.supplier }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No supplier record found" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-none border border-border overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-3 border-b border-border bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Line Items" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground w-24", children: "Qty" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground w-32", children: "Unit Price" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground w-32", children: "Total" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-foreground", children: invoice.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-right text-muted-foreground font-mono", children: "1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-right font-mono", children: fmtDec(invoice.amount) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-right font-mono font-semibold", children: fmtDec(invoice.amount) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tfoot", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t-2 border-border bg-muted/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "td",
              {
                colSpan: 3,
                className: "px-5 py-3 text-right text-sm font-semibold text-muted-foreground uppercase tracking-wide",
                children: "Total"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-right font-display font-bold text-lg text-foreground font-mono", children: fmtDec(invoice.amount) })
          ] }) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-none border border-border p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3", children: "Status Timeline" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
          ["Draft", "Pending", "Approved", "Paid"].map(
            (s, idx) => {
              const statuses = [
                "Draft",
                "Pending",
                "Approved",
                "Paid",
                "Overdue",
                "Disputed"
              ];
              const currentIdx = statuses.indexOf(invoice.status);
              const stepIdx = statuses.indexOf(s);
              const isPast = stepIdx < currentIdx && invoice.status !== "Overdue" && invoice.status !== "Disputed";
              const isCurrent = s === invoice.status;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                idx > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `h-px w-8 ${isPast ? "bg-teal-500" : "bg-border"}`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `flex items-center gap-1.5 text-xs font-medium ${isCurrent ? "text-teal-600 dark:text-teal-400" : isPast ? "text-muted-foreground" : "text-muted-foreground/40"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: `w-2 h-2 rounded-full ${isCurrent ? "bg-teal-500" : isPast ? "bg-teal-500/50" : "bg-border"}`
                        }
                      ),
                      s
                    ]
                  }
                )
              ] }, s);
            }
          ),
          (invoice.status === "Overdue" || invoice.status === "Disputed") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs font-medium text-orange-600 dark:text-orange-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-orange-500" }),
            invoice.status
          ] })
        ] })
      ] })
    ] }),
    confirmAction && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDialog,
      {
        open: true,
        onOpenChange: (v) => !v && setConfirmAction(null),
        title: confirmAction.label,
        description: `Update invoice ${invoice.invoiceNumber} status to "${confirmAction.next}"?`,
        confirmLabel: confirmAction.label,
        onConfirm: () => {
          updateStatus.mutate({ id: invoice.id, status: confirmAction.next });
          setConfirmAction(null);
        },
        "data-ocid": "invoice-status-confirm"
      }
    )
  ] });
}
function InvoicesPage() {
  const { data: invoices, isLoading } = useInvoices();
  const [statusFilter, setStatusFilter] = reactExports.useState(
    "All"
  );
  const [supplierFilter, setSupplierFilter] = reactExports.useState("All");
  const [view, setView] = reactExports.useState("list");
  const [selectedInvoice, setSelectedInvoice] = reactExports.useState(null);
  const [showCreate, setShowCreate] = reactExports.useState(false);
  const totalAmount = (invoices == null ? void 0 : invoices.reduce((s, i) => s + i.amount, 0)) ?? 0;
  const pendingAmount = (invoices == null ? void 0 : invoices.filter((i) => i.status === "Pending" || i.status === "Approved").reduce((s, i) => s + i.amount, 0)) ?? 0;
  const paidThisMonth = (invoices == null ? void 0 : invoices.filter((i) => {
    if (i.status !== "Paid" || !i.paidDate) return false;
    const d = new Date(i.paidDate);
    const now = /* @__PURE__ */ new Date();
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  }).reduce((s, i) => s + i.amount, 0)) ?? 0;
  const overdueCount = (invoices == null ? void 0 : invoices.filter((i) => i.status === "Overdue").length) ?? 0;
  const filtered = (invoices == null ? void 0 : invoices.filter((i) => {
    if (statusFilter !== "All" && i.status !== statusFilter) return false;
    if (supplierFilter !== "All" && i.supplier !== supplierFilter)
      return false;
    return true;
  })) ?? [];
  const uniqueSuppliers = [...new Set((invoices == null ? void 0 : invoices.map((i) => i.supplier)) ?? [])];
  if (view === "detail" && selectedInvoice) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      InvoiceDetail,
      {
        invoice: selectedInvoice,
        onBack: () => {
          setView("list");
          setSelectedInvoice(null);
        }
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "invoices-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Invoices",
        subtitle: "Procurement invoices, approvals, and payment tracking",
        action: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            onClick: () => setShowCreate(true),
            className: "rounded-none gap-1.5 bg-teal-600 hover:bg-teal-700 text-white",
            "data-ocid": "new-invoice-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              " New Invoice"
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Total Invoiced",
          value: fmt(totalAmount),
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4" }),
          accent: "neutral",
          "data-ocid": "stat-total-invoiced"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Pending Amount",
          value: fmt(pendingAmount),
          sub: `${(invoices == null ? void 0 : invoices.filter((i) => i.status === "Pending" || i.status === "Approved").length) ?? 0} invoices`,
          accent: "neutral",
          "data-ocid": "stat-pending"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Paid This Month",
          value: fmt(paidThisMonth),
          accent: "teal",
          "data-ocid": "stat-paid-month"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Overdue",
          value: overdueCount,
          sub: overdueCount > 0 ? "Requires attention" : "All clear",
          accent: overdueCount > 0 ? "orange" : "neutral",
          icon: overdueCount > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4" }) : void 0,
          "data-ocid": "stat-overdue-count"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-wrap items-center gap-3 mb-4",
        "data-ocid": "invoice-filters",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", "data-ocid": "invoice-filter-bar", children: STATUS_FILTERS.map((s) => {
            const count = s === "All" ? invoices == null ? void 0 : invoices.length : invoices == null ? void 0 : invoices.filter((i) => i.status === s).length;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setStatusFilter(s),
                "data-ocid": `invoice-filter-${s.toLowerCase()}`,
                className: `text-xs px-3 py-1.5 border font-medium transition-colors ${statusFilter === s ? "bg-teal-600 text-white border-teal-600" : "bg-card border-border text-muted-foreground hover:border-teal-500/50"}`,
                children: [
                  s,
                  count !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 opacity-70", children: [
                    "(",
                    count,
                    ")"
                  ] })
                ]
              },
              s
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: supplierFilter, onValueChange: setSupplierFilter, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "w-48 h-8 rounded-none text-xs",
                "data-ocid": "invoice-supplier-filter",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Suppliers" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "rounded-none", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "All", children: "All Suppliers" }),
              uniqueSuppliers.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s))
            ] })
          ] }),
          (statusFilter !== "All" || supplierFilter !== "All") && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                setStatusFilter("All");
                setSupplierFilter("All");
              },
              className: "text-xs flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors",
              "data-ocid": "invoice-clear-filters",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" }),
                " Clear"
              ]
            }
          )
        ]
      }
    ),
    !isLoading && filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        title: "No invoices found",
        description: "No invoices match the selected filters.",
        variant: "invoices",
        action: {
          label: "Clear Filters",
          onClick: () => {
            setStatusFilter("All");
            setSupplierFilter("All");
          }
        },
        "data-ocid": "invoices-empty"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      DataTable,
      {
        columns: [
          ...COLUMNS,
          {
            key: "id",
            label: "Actions",
            render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: (e) => {
                  e.stopPropagation();
                  setSelectedInvoice(row);
                  setView("detail");
                },
                className: "text-xs flex items-center gap-1 text-muted-foreground hover:text-teal-600 transition-colors px-2 py-1 border border-transparent hover:border-teal-500/40",
                "data-ocid": `invoice-view-${row.id}`,
                "aria-label": "View invoice",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3 h-3" }),
                  "View"
                ]
              }
            ) })
          }
        ],
        data: filtered,
        isLoading,
        rowKey: (r) => r.id,
        searchable: true,
        searchKeys: ["invoiceNumber", "supplier", "projectName"],
        onRowClick: (row) => {
          setSelectedInvoice(row);
          setView("detail");
        },
        "data-ocid": "invoices-table"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CreateInvoiceSheet,
      {
        open: showCreate,
        onClose: () => setShowCreate(false)
      }
    )
  ] });
}
export {
  InvoicesPage as default
};
