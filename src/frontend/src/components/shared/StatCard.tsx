import { Card } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  change?: number; // positive = up, negative = down
  changeLabel?: string;
  icon?: React.ReactNode;
  accent?: "teal" | "orange" | "neutral" | "red";
  "data-ocid"?: string;
}

const accentBar: Record<string, string> = {
  teal: "bg-teal-500",
  orange: "bg-orange-500",
  neutral: "bg-primary",
  red: "bg-destructive",
};

export function StatCard({
  label,
  value,
  sub,
  change,
  changeLabel,
  icon,
  accent = "neutral",
  "data-ocid": ocid,
}: StatCardProps) {
  const barClass = accentBar[accent] ?? accentBar.neutral;
  const isUp = change !== undefined && change > 0;
  const isDown = change !== undefined && change < 0;
  const isFlat = change === 0;

  return (
    <Card
      data-ocid={ocid}
      className="relative overflow-hidden border border-border bg-card rounded-none shadow-elevation-1 p-4 flex flex-col gap-2"
    >
      {/* Accent stripe */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 ${barClass}`} />

      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </span>
        {icon && <span className="text-muted-foreground">{icon}</span>}
      </div>

      <div className="font-display font-bold text-2xl text-foreground leading-none">
        {value}
      </div>

      {(sub || change !== undefined) && (
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          {change !== undefined && (
            <span
              className={`flex items-center gap-0.5 font-medium ${isUp ? "text-teal-600 dark:text-teal-400" : isDown ? "text-destructive" : "text-muted-foreground"}`}
            >
              {isUp && <ArrowUp className="w-3 h-3" />}
              {isDown && <ArrowDown className="w-3 h-3" />}
              {isFlat && <Minus className="w-3 h-3" />}
              {Math.abs(change)}%
            </span>
          )}
          {changeLabel && <span>{changeLabel}</span>}
          {sub && !changeLabel && <span>{sub}</span>}
        </div>
      )}
    </Card>
  );
}
