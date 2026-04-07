import { Badge } from "@/components/ui/badge";
import type {
  AlertSeverity,
  InvoiceStatus,
  MaterialStatus,
  ProjectStatus,
} from "../../types";

type StatusVariant =
  | ProjectStatus
  | InvoiceStatus
  | MaterialStatus
  | AlertSeverity
  | "OnTrack"
  | "Delayed"
  | "Delivered"
  | "Transit";

interface StatusBadgeProps {
  status: StatusVariant;
  size?: "sm" | "default";
}

const CONFIG: Record<string, { label: string; className: string }> = {
  // Project
  Active: {
    label: "Active",
    className:
      "bg-teal-500/15 text-teal-700 dark:text-teal-400 border-teal-500/30",
  },
  OnHold: {
    label: "On Hold",
    className:
      "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30",
  },
  Completed: {
    label: "Completed",
    className:
      "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  },
  Cancelled: {
    label: "Cancelled",
    className: "bg-muted text-muted-foreground border-border",
  },
  OnTrack: {
    label: "On Track",
    className:
      "bg-teal-500/15 text-teal-700 dark:text-teal-400 border-teal-500/30",
  },
  Delayed: {
    label: "Delayed",
    className:
      "bg-orange-500/15 text-orange-700 dark:text-orange-400 border-orange-500/30",
  },
  // Invoice
  Draft: {
    label: "Draft",
    className: "bg-muted text-muted-foreground border-border",
  },
  Pending: {
    label: "Pending",
    className:
      "bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30",
  },
  Approved: {
    label: "Approved",
    className:
      "bg-teal-500/15 text-teal-700 dark:text-teal-400 border-teal-500/30",
  },
  Paid: {
    label: "Paid",
    className:
      "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  },
  Overdue: {
    label: "Overdue",
    className: "bg-destructive/15 text-destructive border-destructive/30",
  },
  Disputed: {
    label: "Disputed",
    className:
      "bg-orange-500/15 text-orange-700 dark:text-orange-400 border-orange-500/30",
  },
  // Material
  InStock: {
    label: "In Stock",
    className:
      "bg-teal-500/15 text-teal-700 dark:text-teal-400 border-teal-500/30",
  },
  LowStock: {
    label: "Low Stock",
    className:
      "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30",
  },
  Critical: {
    label: "Critical",
    className:
      "bg-orange-500/15 text-orange-700 dark:text-orange-400 border-orange-500/30",
  },
  OutOfStock: {
    label: "Out of Stock",
    className: "bg-destructive/15 text-destructive border-destructive/30",
  },
  // Alert
  Info: {
    label: "Info",
    className:
      "bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30",
  },
  Warning: {
    label: "Warning",
    className:
      "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30",
  },
  // Delivery
  Delivered: {
    label: "Delivered",
    className:
      "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  },
  Transit: {
    label: "In Transit",
    className:
      "bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30",
  },
};

export function StatusBadge({ status, size = "default" }: StatusBadgeProps) {
  const cfg = CONFIG[status] ?? {
    label: status,
    className: "bg-muted text-muted-foreground border-border",
  };
  return (
    <Badge
      variant="outline"
      className={`border font-medium ${size === "sm" ? "text-[10px] px-1.5 py-0" : "text-xs px-2 py-0.5"} ${cfg.className}`}
    >
      {cfg.label}
    </Badge>
  );
}
