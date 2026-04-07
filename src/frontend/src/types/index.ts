// ─── Domain Types ────────────────────────────────────────────────────────────

export type UserRole = "ProjectManager" | "SiteEngineer" | "Finance" | "Admin";

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  email?: string;
}

export type ProjectStatus = "Active" | "OnHold" | "Completed" | "Cancelled";
export type ProjectPhase =
  | "Foundation"
  | "Structure"
  | "Finishing"
  | "Handover";

export interface Project {
  id: string;
  name: string;
  site: string;
  status: ProjectStatus;
  phase: ProjectPhase;
  budget: number;
  spent: number;
  progress: number;
  startDate: string;
  endDate?: string;
  description?: string;
}

export type MaterialUnit =
  | "bags"
  | "tonnes"
  | "kg"
  | "pieces"
  | "m³"
  | "m²"
  | "litres"
  | "rolls";
export type MaterialStatus = "InStock" | "LowStock" | "Critical" | "OutOfStock";

export interface Material {
  id: string;
  name: string;
  category: string;
  unit: MaterialUnit;
  currentStock: number;
  reorderLevel: number;
  maxCapacity: number;
  projectId: string;
  lastDeliveryDate?: string;
  supplier?: string;
  unitCost: number;
  status: MaterialStatus;
}

export interface InventoryLog {
  id: string;
  materialId: string;
  materialName: string;
  type: "Inflow" | "Outflow";
  quantity: number;
  date: string;
  projectId: string;
  notes?: string;
  loggedBy?: string;
}

export type InvoiceStatus =
  | "Draft"
  | "Pending"
  | "Approved"
  | "Paid"
  | "Overdue"
  | "Disputed"
  | "Cancelled";

export interface Invoice {
  id: string;
  invoiceNumber: string;
  supplier: string;
  projectId: string;
  projectName: string;
  amount: number;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  description: string;
  category: "Material" | "Labor" | "Equipment" | "Service";
}

export interface BudgetVariance {
  projectId: string;
  projectName: string;
  allocated: number;
  spent: number;
  committed: number;
  variance: number;
  variancePercent: number;
}

export type AlertSeverity = "Info" | "Warning" | "Critical";
export type AlertType =
  | "LowStock"
  | "BudgetOverrun"
  | "InvoiceOverdue"
  | "DeliveryDelay"
  | "CostSpike";

export interface Alert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  title: string;
  message: string;
  projectId?: string;
  projectName?: string;
  createdAt: string;
  acknowledged: boolean;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  materials: string[];
  rating: number;
  totalOrders: number;
  pendingAmount: number;
}

// ─── Dashboard Stats ──────────────────────────────────────────────────────────

export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  totalBudget: number;
  totalSpent: number;
  criticalAlerts: number;
  lowStockItems: number;
  pendingInvoices: number;
  pendingAmount: number;
}

// ─── Table / UI Helpers ───────────────────────────────────────────────────────

export type SortDir = "asc" | "desc";

export interface SortState {
  key: string;
  dir: SortDir;
}

export interface Column<T extends object> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  align?: "left" | "right" | "center";
  render?: (row: T) => React.ReactNode;
}
