import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";
import { useAuth } from "./hooks/useAuth";
import LoginPage from "./pages/LoginPage";

// Lazy-loaded pages
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const InventoryPage = lazy(() => import("./pages/InventoryPage"));
const FinancePage = lazy(() => import("./pages/FinancePage"));
const InvoicesPage = lazy(() => import("./pages/InvoicesPage"));
const SuppliersPage = lazy(() => import("./pages/SuppliersPage"));
const AlertsPage = lazy(() => import("./pages/AlertsPage"));

function PageLoader() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="w-6 h-6 border-2 border-teal-600/30 border-t-teal-600 rounded-full animate-spin" />
    </div>
  );
}

// ─── Auth guard wrapper ───────────────────────────────────────────────────────

function AppShell() {
  const auth = useAuth();

  if (auth.isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-teal-600/30 border-t-teal-600 rounded-full animate-spin" />
          <span className="text-xs text-muted-foreground font-mono">
            Initialising…
          </span>
        </div>
      </div>
    );
  }

  if (!auth.isAuthenticated || !auth.role) {
    return (
      <LoginPage
        onLogin={auth.login}
        onRoleSelect={auth.setRole}
        selectedRole={auth.role}
        isLoading={auth.isLoading}
      />
    );
  }

  return (
    <Layout
      role={auth.role}
      principalId={auth.principalId}
      onLogout={auth.logout}
    />
  );
}

// ─── Router (created once, static) ───────────────────────────────────────────

const rootRoute = createRootRoute({ component: () => <Outlet /> });

const shellRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: AppShell,
});

function makePage(Component: React.ComponentType) {
  return () => (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
}

const dashboardRoute = createRoute({
  getParentRoute: () => shellRoute,
  path: "dashboard",
  component: makePage(DashboardPage),
});
const projectsRoute = createRoute({
  getParentRoute: () => shellRoute,
  path: "projects",
  component: makePage(ProjectsPage),
});
const inventoryRoute = createRoute({
  getParentRoute: () => shellRoute,
  path: "inventory",
  component: makePage(InventoryPage),
});
const financeRoute = createRoute({
  getParentRoute: () => shellRoute,
  path: "finance",
  component: makePage(FinancePage),
});
const invoicesRoute = createRoute({
  getParentRoute: () => shellRoute,
  path: "invoices",
  component: makePage(InvoicesPage),
});
const suppliersRoute = createRoute({
  getParentRoute: () => shellRoute,
  path: "suppliers",
  component: makePage(SuppliersPage),
});
const alertsRoute = createRoute({
  getParentRoute: () => shellRoute,
  path: "alerts",
  component: makePage(AlertsPage),
});

const routeTree = rootRoute.addChildren([
  shellRoute.addChildren([
    dashboardRoute,
    projectsRoute,
    inventoryRoute,
    financeRoute,
    invoicesRoute,
    suppliersRoute,
    alertsRoute,
  ]),
]);

const router = createRouter({ routeTree, defaultPreload: "intent" });

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
