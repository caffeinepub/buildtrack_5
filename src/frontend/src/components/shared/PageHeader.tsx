import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface Crumb {
  label: string;
  onClick?: () => void;
}

interface PageHeaderProps {
  title: string;
  breadcrumbs?: Crumb[];
  action?: React.ReactNode;
  subtitle?: string;
  "data-ocid"?: string;
}

export function PageHeader({
  title,
  breadcrumbs,
  action,
  subtitle,
  "data-ocid": ocid,
}: PageHeaderProps) {
  return (
    <div
      data-ocid={ocid}
      className="flex items-start justify-between gap-4 py-4 border-b border-border mb-5"
    >
      <div className="min-w-0">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1 mb-1">
            {breadcrumbs.map((crumb, idx) => (
              <span
                key={crumb.label}
                className="flex items-center gap-1 text-xs text-muted-foreground"
              >
                {idx > 0 && <ChevronRight className="w-3 h-3" />}
                {crumb.onClick ? (
                  <button
                    type="button"
                    onClick={crumb.onClick}
                    className="hover:text-foreground transition-colors"
                  >
                    {crumb.label}
                  </button>
                ) : (
                  <span>{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="font-display font-bold text-xl text-foreground truncate">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
        )}
      </div>
      {action && (
        <div className="shrink-0 flex items-center gap-2">{action}</div>
      )}
    </div>
  );
}
