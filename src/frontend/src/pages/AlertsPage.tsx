import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  AlertTriangle,
  Bell,
  CheckCircle2,
  Info,
} from "lucide-react";
import { useState } from "react";
import { AlertBanner } from "../components/shared/AlertBanner";
import { ConfirmDialog } from "../components/shared/ConfirmDialog";
import { EmptyState } from "../components/shared/EmptyState";
import { PageHeader } from "../components/shared/PageHeader";
import { StatCard } from "../components/shared/StatCard";
import { useAcknowledgeAlert, useAlerts } from "../hooks/useBackend";
import type { AlertSeverity } from "../types";

const SEVERITY_FILTERS: (AlertSeverity | "All" | "Unacknowledged")[] = [
  "All",
  "Unacknowledged",
  "Critical",
  "Warning",
  "Info",
];

export default function AlertsPage() {
  const { data: alerts, isLoading } = useAlerts();
  const { mutate: acknowledge } = useAcknowledgeAlert();
  const [filter, setFilter] = useState<
    AlertSeverity | "All" | "Unacknowledged"
  >("Unacknowledged");
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const filtered =
    alerts?.filter((a) => {
      if (filter === "All") return true;
      if (filter === "Unacknowledged") return !a.acknowledged;
      return a.severity === filter;
    }) ?? [];

  const critical =
    alerts?.filter((a) => a.severity === "Critical" && !a.acknowledged)
      .length ?? 0;
  const warnings =
    alerts?.filter((a) => a.severity === "Warning" && !a.acknowledged).length ??
    0;
  const total = alerts?.filter((a) => !a.acknowledged).length ?? 0;

  const confirmAlert = alerts?.find((a) => a.id === confirmId);

  return (
    <div data-ocid="alerts-page">
      <PageHeader
        title="Alerts"
        subtitle="System alerts for inventory, budget, and invoice issues"
        data-ocid="alerts-header"
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        <StatCard
          label="Total Unacknowledged"
          value={total}
          accent={total > 0 ? "orange" : "teal"}
          icon={<Bell className="w-4 h-4" />}
          data-ocid="stat-total-alerts"
        />
        <StatCard
          label="Critical"
          value={critical}
          accent={critical > 0 ? "red" : "neutral"}
          icon={<AlertCircle className="w-4 h-4" />}
          data-ocid="stat-critical"
        />
        <StatCard
          label="Warnings"
          value={warnings}
          accent={warnings > 0 ? "orange" : "neutral"}
          icon={<AlertTriangle className="w-4 h-4" />}
          data-ocid="stat-warnings"
        />
        <StatCard
          label="Acknowledged"
          value={alerts?.filter((a) => a.acknowledged).length ?? 0}
          accent="teal"
          icon={<CheckCircle2 className="w-4 h-4" />}
          data-ocid="stat-acknowledged"
        />
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap gap-1 mb-4" data-ocid="alert-filter-bar">
        {SEVERITY_FILTERS.map((s) => (
          <button
            type="button"
            key={s}
            onClick={() => setFilter(s)}
            data-ocid={`alert-filter-${s.toLowerCase()}`}
            className={`text-xs px-3 py-1.5 border font-medium transition-colors ${filter === s ? "bg-teal-600 text-white border-teal-600" : "bg-card border-border text-muted-foreground hover:border-teal-500/50"}`}
          >
            {s}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="space-y-2">
          {["sk1", "sk2", "sk3", "sk4"].map((id) => (
            <div
              key={id}
              className="h-14 bg-muted/40 border border-border animate-pulse"
            />
          ))}
        </div>
      )}

      {!isLoading && filtered.length === 0 && (
        <EmptyState
          title="No alerts"
          description={
            filter === "Unacknowledged"
              ? "All alerts have been acknowledged."
              : "No alerts match this filter."
          }
          variant="default"
          data-ocid="alerts-empty"
        />
      )}

      {!isLoading && filtered.length > 0 && (
        <div className="space-y-2">
          {filtered.map((alert) => (
            <div
              key={alert.id}
              className="flex items-stretch gap-0"
              data-ocid="alert-row"
            >
              <div className="flex-1">
                <AlertBanner
                  severity={alert.severity}
                  title={alert.title}
                  message={alert.message}
                />
              </div>
              <div className="flex flex-col items-center justify-between border border-l-0 border-border bg-card px-3 py-2 gap-2 min-w-24">
                {alert.acknowledged ? (
                  <Badge className="text-[10px] bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 border rounded-none">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> Acked
                  </Badge>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs rounded-none"
                    onClick={() => setConfirmId(alert.id)}
                    data-ocid="alert-acknowledge-btn"
                  >
                    Acknowledge
                  </Button>
                )}
                <div className="text-[10px] text-muted-foreground text-center">
                  {new Date(alert.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!confirmId}
        onOpenChange={(v) => !v && setConfirmId(null)}
        title="Acknowledge Alert"
        description={`Mark "${confirmAlert?.title}" as acknowledged? This action confirms you have reviewed this issue.`}
        confirmLabel="Acknowledge"
        onConfirm={() => {
          if (confirmId) acknowledge(confirmId);
          setConfirmId(null);
        }}
        data-ocid="confirm-acknowledge-dialog"
      />
    </div>
  );
}
