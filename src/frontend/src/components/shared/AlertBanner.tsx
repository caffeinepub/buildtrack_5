import { Button } from "@/components/ui/button";
import { AlertCircle, AlertTriangle, Info, X } from "lucide-react";
import type { AlertSeverity } from "../../types";

interface AlertBannerProps {
  severity?: AlertSeverity;
  title: string;
  message?: string;
  onDismiss?: () => void;
  "data-ocid"?: string;
}

const CONFIG = {
  Critical: {
    bar: "bg-destructive",
    bg: "bg-destructive/8 border-destructive/30",
    icon: <AlertCircle className="w-4 h-4 text-destructive shrink-0" />,
    titleClass: "text-destructive font-semibold",
  },
  Warning: {
    bar: "bg-orange-500",
    bg: "bg-orange-500/8 border-orange-500/30",
    icon: (
      <AlertTriangle className="w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0" />
    ),
    titleClass: "text-orange-700 dark:text-orange-400 font-semibold",
  },
  Info: {
    bar: "bg-teal-500",
    bg: "bg-teal-500/8 border-teal-500/30",
    icon: (
      <Info className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
    ),
    titleClass: "text-teal-700 dark:text-teal-400 font-semibold",
  },
};

export function AlertBanner({
  severity = "Info",
  title,
  message,
  onDismiss,
  "data-ocid": ocid,
}: AlertBannerProps) {
  const cfg = CONFIG[severity];
  return (
    <div
      data-ocid={ocid}
      className={`relative flex items-start gap-3 border px-4 py-3 rounded-none overflow-hidden ${cfg.bg}`}
    >
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${cfg.bar}`} />
      {cfg.icon}
      <div className="flex-1 min-w-0">
        <p className={`text-sm ${cfg.titleClass}`}>{title}</p>
        {message && (
          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
            {message}
          </p>
        )}
      </div>
      {onDismiss && (
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 shrink-0 rounded-none"
          onClick={onDismiss}
          aria-label="Dismiss alert"
        >
          <X className="w-3 h-3" />
        </Button>
      )}
    </div>
  );
}
