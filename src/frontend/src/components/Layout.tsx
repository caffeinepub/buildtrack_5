import { Outlet } from "@tanstack/react-router";
import { useState } from "react";
import type { UserRole } from "../types";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

interface LayoutProps {
  role: UserRole;
  principalId?: string | null;
  onLogout: () => void;
}

export function Layout({ role, principalId, onLogout }: LayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
        role={role}
      />

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopBar role={role} principalId={principalId} onLogout={onLogout} />
        <main className="flex-1 overflow-auto bg-background p-5">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="shrink-0 border-t border-border bg-muted/40 px-5 py-2 flex items-center justify-end">
          <p className="text-[11px] text-muted-foreground">
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
