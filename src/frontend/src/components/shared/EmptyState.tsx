import { Button } from "@/components/ui/button";
import { BarChart3, FileSearch, PackageOpen, Users } from "lucide-react";

type EmptyVariant =
  | "default"
  | "inventory"
  | "invoices"
  | "projects"
  | "analytics";

interface EmptyStateProps {
  title: string;
  description?: string;
  variant?: EmptyVariant;
  action?: { label: string; onClick: () => void };
  "data-ocid"?: string;
}

const ICONS: Record<EmptyVariant, React.ReactNode> = {
  default: <PackageOpen className="w-10 h-10 text-muted-foreground/40" />,
  inventory: <PackageOpen className="w-10 h-10 text-muted-foreground/40" />,
  invoices: <FileSearch className="w-10 h-10 text-muted-foreground/40" />,
  projects: <Users className="w-10 h-10 text-muted-foreground/40" />,
  analytics: <BarChart3 className="w-10 h-10 text-muted-foreground/40" />,
};

export function EmptyState({
  title,
  description,
  variant = "default",
  action,
  "data-ocid": ocid,
}: EmptyStateProps) {
  return (
    <div
      data-ocid={ocid}
      className="flex flex-col items-center justify-center gap-3 py-16 px-6 border border-dashed border-border text-center"
    >
      {ICONS[variant]}
      <div>
        <p className="font-semibold text-foreground">{title}</p>
        {description && (
          <p className="text-sm text-muted-foreground mt-1 max-w-xs">
            {description}
          </p>
        )}
      </div>
      {action && (
        <Button
          size="sm"
          className="mt-2 rounded-none"
          onClick={action.onClick}
          data-ocid={ocid ? `${ocid}-cta` : undefined}
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}
