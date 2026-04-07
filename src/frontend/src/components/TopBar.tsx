import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "@tanstack/react-router";
import { Bell, LogOut, Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import { useAlerts } from "../hooks/useBackend";
import type { UserRole } from "../types";
import { StatusBadge } from "./shared/StatusBadge";

interface TopBarProps {
  role: UserRole;
  principalId?: string | null;
  onLogout: () => void;
}

const ROLE_LABELS: Record<UserRole, string> = {
  ProjectManager: "Project Manager",
  SiteEngineer: "Site Engineer",
  Finance: "Finance",
  Admin: "Admin",
};

export function TopBar({ role, principalId, onLogout }: TopBarProps) {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const { data: alerts } = useAlerts();
  const unacked = alerts?.filter((a) => !a.acknowledged).length ?? 0;

  return (
    <header
      data-ocid="topbar"
      className="h-12 bg-card border-b border-border flex items-center justify-between px-4 shrink-0 shadow-elevation-1"
    >
      {/* Left: live indicator */}
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1.5 text-xs text-teal-600 dark:text-teal-400 font-medium">
          <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse" />
          LIVE
        </span>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-1">
        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-none"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
          data-ocid="topbar-theme"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </Button>

        {/* Alerts bell */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-none relative"
          onClick={() => navigate({ to: "/alerts" })}
          aria-label={`${unacked} unacknowledged alerts`}
          data-ocid="topbar-alerts"
        >
          <Bell className="w-4 h-4" />
          {unacked > 0 && (
            <Badge className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 text-[10px] bg-orange-500 hover:bg-orange-500 text-white rounded-sm">
              {unacked}
            </Badge>
          )}
        </Button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 px-2 gap-2 rounded-none text-sm"
              data-ocid="topbar-user-menu"
            >
              <div className="w-6 h-6 bg-muted border border-border flex items-center justify-center">
                <User className="w-3 h-3 text-muted-foreground" />
              </div>
              <span className="hidden sm:block text-xs font-medium">
                {ROLE_LABELS[role]}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52 rounded-none">
            <DropdownMenuLabel className="text-xs">
              <div className="flex flex-col gap-1">
                <StatusBadge
                  status={
                    role === "ProjectManager"
                      ? "OnTrack"
                      : role === "SiteEngineer"
                        ? "Active"
                        : "Approved"
                  }
                  size="sm"
                />
                <span className="font-semibold">{ROLE_LABELS[role]}</span>
                {principalId && (
                  <span className="font-mono text-[10px] text-muted-foreground truncate">
                    {principalId.slice(0, 20)}…
                  </span>
                )}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive cursor-pointer rounded-none"
              onClick={onLogout}
              data-ocid="topbar-logout"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
