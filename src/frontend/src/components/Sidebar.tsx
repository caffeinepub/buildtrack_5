import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "@tanstack/react-router";
import {
  Bell,
  Building2,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  FileText,
  FolderOpen,
  LayoutDashboard,
  Package,
  Truck,
} from "lucide-react";
import { useAlerts } from "../hooks/useBackend";
import type { UserRole } from "../types";

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  roles: UserRole[];
  badge?: number;
}

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  role: UserRole;
}

function useUnackedAlertCount() {
  const { data } = useAlerts();
  return (
    data?.filter((a) => !a.acknowledged && a.severity === "Critical").length ??
    0
  );
}

export function Sidebar({ collapsed, onToggle, role }: SidebarProps) {
  const alertCount = useUnackedAlertCount();
  const location = useLocation();

  const NAV_ITEMS: NavItem[] = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-4 h-4" />,
      roles: ["ProjectManager", "SiteEngineer", "Admin"],
    },
    {
      path: "/projects",
      label: "Projects",
      icon: <FolderOpen className="w-4 h-4" />,
      roles: ["ProjectManager", "SiteEngineer", "Admin"],
    },
    {
      path: "/inventory",
      label: "Inventory",
      icon: <Package className="w-4 h-4" />,
      roles: ["ProjectManager", "SiteEngineer", "Admin"],
    },
    {
      path: "/finance",
      label: "Finance",
      icon: <DollarSign className="w-4 h-4" />,
      roles: ["ProjectManager", "Finance", "Admin"],
    },
    {
      path: "/invoices",
      label: "Invoices",
      icon: <FileText className="w-4 h-4" />,
      roles: ["ProjectManager", "Finance", "Admin"],
    },
    {
      path: "/suppliers",
      label: "Suppliers",
      icon: <Truck className="w-4 h-4" />,
      roles: ["ProjectManager", "Admin"],
    },
    {
      path: "/alerts",
      label: "Alerts",
      icon: <Bell className="w-4 h-4" />,
      roles: ["ProjectManager", "SiteEngineer", "Finance", "Admin"],
      badge: alertCount,
    },
  ];

  const visible = NAV_ITEMS.filter((n) => n.roles.includes(role));

  return (
    <aside
      data-ocid="sidebar-nav"
      className={`flex flex-col bg-card border-r border-border transition-all duration-300 ${collapsed ? "w-14" : "w-56"} shrink-0 h-full`}
    >
      {/* Brand */}
      <div
        className={`flex items-center gap-2.5 border-b border-border px-3 h-12 ${collapsed ? "justify-center" : ""}`}
      >
        <div className="w-7 h-7 bg-teal-600 flex items-center justify-center shrink-0">
          <Building2 className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <span className="font-display font-bold text-sm text-foreground tracking-tight truncate">
            Constructly
          </span>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-2 overflow-y-auto">
        {visible.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              data-ocid={`nav-${item.label.toLowerCase()}`}
              className={`relative flex items-center gap-3 px-3 py-2 mx-1 text-sm font-medium transition-colors duration-150
                ${
                  isActive
                    ? "bg-teal-600/10 text-teal-700 dark:text-teal-400 border-l-2 border-teal-600"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground border-l-2 border-transparent"
                }
                ${collapsed ? "justify-center" : ""}`}
            >
              <span
                className={isActive ? "text-teal-600 dark:text-teal-400" : ""}
              >
                {item.icon}
              </span>
              {!collapsed && (
                <span className="flex-1 truncate">{item.label}</span>
              )}
              {!collapsed && item.badge && item.badge > 0 ? (
                <Badge className="h-4 min-w-4 px-1 text-[10px] bg-orange-500 hover:bg-orange-500 text-white rounded-sm">
                  {item.badge}
                </Badge>
              ) : null}
              {collapsed && item.badge && item.badge > 0 ? (
                <span className="absolute right-1.5 top-1.5 w-2 h-2 bg-orange-500 rounded-full" />
              ) : null}
            </Link>
          );
        })}
      </nav>

      {/* Toggle */}
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center justify-center h-10 border-t border-border text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        data-ocid="sidebar-toggle"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>
    </aside>
  );
}
