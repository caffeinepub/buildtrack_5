import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  Building2,
  DollarSign,
  HardHat,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import type { UserRole } from "../types";

interface LoginPageProps {
  onLogin: () => void;
  onRoleSelect: (role: UserRole) => void;
  selectedRole: UserRole | null;
  isLoading?: boolean;
}

const ROLES: {
  role: UserRole;
  label: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    role: "ProjectManager",
    label: "Project Manager",
    description: "Full access to all projects, inventory, finance & reporting",
    icon: <Building2 className="w-5 h-5" />,
  },
  {
    role: "SiteEngineer",
    label: "Site Engineer",
    description: "Log material usage, view site inventory and deliveries",
    icon: <HardHat className="w-5 h-5" />,
  },
  {
    role: "Finance",
    label: "Finance Officer",
    description: "View and manage invoices, budgets, and cost reports",
    icon: <DollarSign className="w-5 h-5" />,
  },
  {
    role: "Admin",
    label: "Administrator",
    description: "Full system access including user management and settings",
    icon: <ShieldCheck className="w-5 h-5" />,
  },
];

export default function LoginPage({
  onLogin,
  onRoleSelect,
  selectedRole,
  isLoading,
}: LoginPageProps) {
  const [step, setStep] = useState<"role" | "login">("role");

  return (
    <div
      className="min-h-screen bg-background flex items-center justify-center p-4"
      data-ocid="login-page"
    >
      <div className="w-full max-w-lg">
        {/* Brand header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-teal-600 flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-display font-bold text-xl text-foreground">
              Constructly
            </h1>
            <p className="text-xs text-muted-foreground">
              Construction Management Platform
            </p>
          </div>
        </div>

        {/* Accent bar */}
        <div className="h-0.5 w-full bg-gradient-to-r from-teal-600 via-teal-400 to-transparent mb-8" />

        {step === "role" ? (
          <>
            <div className="mb-6">
              <h2 className="font-display font-bold text-lg text-foreground">
                Select your role
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Choose your role to configure your workspace access level.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 mb-6">
              {ROLES.map(({ role, label, description, icon }) => {
                const isSelected = selectedRole === role;
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => onRoleSelect(role)}
                    data-ocid={`role-select-${role.toLowerCase()}`}
                    className={`w-full text-left border transition-all duration-150 p-4 flex items-center gap-4
                      ${
                        isSelected
                          ? "border-teal-600 bg-teal-600/8"
                          : "border-border bg-card hover:border-teal-500/50 hover:bg-muted/40"
                      }`}
                  >
                    <div
                      className={`w-9 h-9 flex items-center justify-center shrink-0 ${isSelected ? "bg-teal-600 text-white" : "bg-muted text-muted-foreground"}`}
                    >
                      {icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`font-semibold text-sm ${isSelected ? "text-teal-700 dark:text-teal-400" : "text-foreground"}`}
                      >
                        {label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {description}
                      </p>
                    </div>
                    {isSelected && (
                      <div className="w-4 h-4 bg-teal-600 flex items-center justify-center shrink-0">
                        <svg
                          viewBox="0 0 12 12"
                          className="w-3 h-3 text-white fill-current"
                          aria-hidden="true"
                        >
                          <title>Selected</title>
                          <path
                            d="M10 3L5 8.5 2 5.5"
                            stroke="white"
                            strokeWidth="1.5"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            <Button
              className="w-full rounded-none h-10 gap-2 bg-teal-600 hover:bg-teal-700 text-white"
              disabled={!selectedRole}
              onClick={() => setStep("login")}
              data-ocid="role-continue-btn"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </Button>
          </>
        ) : (
          <>
            <div className="mb-6">
              <button
                type="button"
                onClick={() => setStep("role")}
                className="text-xs text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1"
              >
                ← Back to role selection
              </button>
              <h2 className="font-display font-bold text-lg text-foreground">
                Sign in with Internet Identity
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Authenticate securely with your Internet Identity principal.
              </p>
            </div>

            <Card className="rounded-none border-border p-5 mb-6 bg-muted/30">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span className="text-sm font-semibold">
                  Secure, decentralised authentication
                </span>
              </div>
              <ul className="text-xs text-muted-foreground space-y-1.5">
                <li>• No password stored on any server</li>
                <li>• Your identity is controlled entirely by you</li>
                <li>• Financial data encrypted on-chain</li>
              </ul>
            </Card>

            <Button
              className="w-full rounded-none h-10 gap-2 bg-teal-600 hover:bg-teal-700 text-white"
              onClick={onLogin}
              disabled={isLoading}
              data-ocid="login-btn"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Connecting…
                </span>
              ) : (
                <>
                  Sign in with Internet Identity{" "}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </>
        )}

        <p className="text-[11px] text-muted-foreground mt-6 text-center">
          © {new Date().getFullYear()}{" "}
          <a
            href="https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );
}
