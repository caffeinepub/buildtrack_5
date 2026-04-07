import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Alert,
  BudgetVariance,
  DashboardStats,
  InventoryLog,
  Invoice,
  InvoiceStatus,
  Material,
  Project,
  Supplier,
} from "../types";

// ─── Static seed data (replaces backend until bindgen exposes methods) ────────

const PROJECTS: Project[] = [
  {
    id: "p1",
    name: "Riverside Tower Block A",
    site: "Riverside Tech Park",
    status: "Active",
    phase: "Structure",
    budget: 4200000,
    spent: 2840000,
    progress: 72,
    startDate: "2024-01-15",
    endDate: "2024-12-31",
    description: "14-storey residential tower, phase 2 structural work ongoing",
  },
  {
    id: "p2",
    name: "Eastside Residential Dev",
    site: "Eastside Borough",
    status: "Active",
    phase: "Foundation",
    budget: 2900000,
    spent: 1450000,
    progress: 38,
    startDate: "2024-03-01",
    endDate: "2025-06-30",
    description: "Mixed-use development, 6 blocks of 8 storeys each",
  },
  {
    id: "p3",
    name: "Main Stadium Renovation",
    site: "City Centre",
    status: "Active",
    phase: "Finishing",
    budget: 7100000,
    spent: 6200000,
    progress: 89,
    startDate: "2023-06-01",
    endDate: "2024-06-30",
    description: "Stadium facade, seating, and infrastructure upgrade",
  },
  {
    id: "p4",
    name: "Industrial Park Unit C",
    site: "North Industrial Zone",
    status: "OnHold",
    phase: "Foundation",
    budget: 1800000,
    spent: 320000,
    progress: 12,
    startDate: "2024-05-01",
    description: "Warehouse complex on hold pending site clearance",
  },
];

const MATERIALS: Material[] = [
  {
    id: "m1",
    name: "Portland Cement",
    category: "Binding",
    unit: "bags",
    currentStock: 1250,
    reorderLevel: 500,
    maxCapacity: 3000,
    projectId: "p1",
    lastDeliveryDate: "2024-10-05",
    supplier: "CemCo Supplies",
    unitCost: 12.5,
    status: "InStock",
  },
  {
    id: "m2",
    name: "Rebar Steel 12mm",
    category: "Structural",
    unit: "tonnes",
    currentStock: 87,
    reorderLevel: 40,
    maxCapacity: 200,
    projectId: "p1",
    lastDeliveryDate: "2024-10-23",
    supplier: "SteelMax Ltd",
    unitCost: 890,
    status: "InStock",
  },
  {
    id: "m3",
    name: "Coarse Aggregate",
    category: "Aggregate",
    unit: "m³",
    currentStock: 320,
    reorderLevel: 150,
    maxCapacity: 800,
    projectId: "p1",
    lastDeliveryDate: "2024-10-30",
    supplier: "Quarry Direct",
    unitCost: 45,
    status: "InStock",
  },
  {
    id: "m4",
    name: "Portland Cement",
    category: "Binding",
    unit: "bags",
    currentStock: 180,
    reorderLevel: 300,
    maxCapacity: 2000,
    projectId: "p2",
    lastDeliveryDate: "2024-12-09",
    supplier: "CemCo Supplies",
    unitCost: 12.5,
    status: "LowStock",
  },
  {
    id: "m5",
    name: "Concrete Blocks",
    category: "Masonry",
    unit: "pieces",
    currentStock: 2400,
    reorderLevel: 1000,
    maxCapacity: 10000,
    projectId: "p2",
    lastDeliveryDate: "2024-12-30",
    supplier: "BlockMakers Inc",
    unitCost: 3.2,
    status: "InStock",
  },
  {
    id: "m6",
    name: "Sand (Fine)",
    category: "Aggregate",
    unit: "m³",
    currentStock: 28,
    reorderLevel: 80,
    maxCapacity: 300,
    projectId: "p3",
    lastDeliveryDate: "2024-12-30",
    supplier: "River Sand Co",
    unitCost: 35,
    status: "Critical",
  },
  {
    id: "m7",
    name: "Structural Steel H-beam",
    category: "Structural",
    unit: "tonnes",
    currentStock: 12,
    reorderLevel: 10,
    maxCapacity: 60,
    projectId: "p3",
    lastDeliveryDate: "2024-10-30",
    supplier: "SteelMax Ltd",
    unitCost: 1200,
    status: "LowStock",
  },
  {
    id: "m8",
    name: "Ceramic Floor Tiles",
    category: "Finishes",
    unit: "m²",
    currentStock: 0,
    reorderLevel: 200,
    maxCapacity: 2000,
    projectId: "p3",
    lastDeliveryDate: "2024-10-30",
    supplier: "TileWorld",
    unitCost: 28,
    status: "OutOfStock",
  },
];

const INVOICES: Invoice[] = [
  {
    id: "i1",
    invoiceNumber: "INV-2024-0841",
    supplier: "CemCo Supplies",
    projectId: "p1",
    projectName: "Riverside Tower Block A",
    amount: 156250,
    status: "Paid",
    issueDate: "2024-10-01",
    dueDate: "2024-10-31",
    paidDate: "2024-10-28",
    description: "Cement batch delivery Oct 2024",
    category: "Material",
  },
  {
    id: "i2",
    invoiceNumber: "INV-2024-0892",
    supplier: "SteelMax Ltd",
    projectId: "p1",
    projectName: "Riverside Tower Block A",
    amount: 289100,
    status: "Approved",
    issueDate: "2024-10-15",
    dueDate: "2024-11-15",
    description: "Rebar supply floors 7–10",
    category: "Material",
  },
  {
    id: "i3",
    invoiceNumber: "INV-2024-0934",
    supplier: "Construct Labour Agency",
    projectId: "p2",
    projectName: "Eastside Residential Dev",
    amount: 84000,
    status: "Pending",
    issueDate: "2024-11-01",
    dueDate: "2024-11-30",
    description: "Labour hire November – foundation crew",
    category: "Labor",
  },
  {
    id: "i4",
    invoiceNumber: "INV-2024-0756",
    supplier: "Crane Hire UK",
    projectId: "p3",
    projectName: "Main Stadium Renovation",
    amount: 47500,
    status: "Overdue",
    issueDate: "2024-09-01",
    dueDate: "2024-09-30",
    description: "Tower crane hire September",
    category: "Equipment",
  },
  {
    id: "i5",
    invoiceNumber: "INV-2024-1001",
    supplier: "BlockMakers Inc",
    projectId: "p2",
    projectName: "Eastside Residential Dev",
    amount: 38400,
    status: "Pending",
    issueDate: "2024-11-10",
    dueDate: "2024-12-10",
    description: "Concrete block delivery batch 3",
    category: "Material",
  },
  {
    id: "i6",
    invoiceNumber: "INV-2024-1045",
    supplier: "TileWorld",
    projectId: "p3",
    projectName: "Main Stadium Renovation",
    amount: 112000,
    status: "Disputed",
    issueDate: "2024-11-20",
    dueDate: "2024-12-20",
    description: "Floor tiles – quantity dispute",
    category: "Material",
  },
  {
    id: "i7",
    invoiceNumber: "INV-2024-1102",
    supplier: "Site Safety Solutions",
    projectId: "p1",
    projectName: "Riverside Tower Block A",
    amount: 22800,
    status: "Draft",
    issueDate: "2024-12-01",
    dueDate: "2025-01-01",
    description: "Safety equipment Q4 2024",
    category: "Service",
  },
];

const ALERTS: Alert[] = [
  {
    id: "a1",
    type: "LowStock",
    severity: "Critical",
    title: "Sand (Fine) - Critical Stock Level",
    message:
      "Sand at Eastside Residential Dev is at 28 m³ — below reorder level of 80 m³. Immediate procurement needed.",
    projectId: "p2",
    projectName: "Eastside Residential Dev",
    createdAt: "2024-12-30T08:15:00Z",
    acknowledged: false,
  },
  {
    id: "a2",
    type: "LowStock",
    severity: "Warning",
    title: "Cement Low at Eastside Site",
    message:
      "Cement stock at Eastside dropped to 180 bags, reorder level is 300 bags.",
    projectId: "p2",
    projectName: "Eastside Residential Dev",
    createdAt: "2024-12-29T14:30:00Z",
    acknowledged: false,
  },
  {
    id: "a3",
    type: "InvoiceOverdue",
    severity: "Critical",
    title: "Invoice INV-2024-0756 Overdue",
    message:
      "Crane Hire UK invoice of £47,500 was due 2024-09-30. 91 days overdue.",
    projectId: "p3",
    projectName: "Main Stadium Renovation",
    createdAt: "2024-12-31T09:00:00Z",
    acknowledged: false,
  },
  {
    id: "a4",
    type: "BudgetOverrun",
    severity: "Warning",
    title: "Stadium Renovation Approaching Budget Limit",
    message:
      "Main Stadium Renovation has spent 87% of total budget with 11% work remaining.",
    projectId: "p3",
    projectName: "Main Stadium Renovation",
    createdAt: "2024-12-28T10:00:00Z",
    acknowledged: false,
  },
  {
    id: "a5",
    type: "LowStock",
    severity: "Warning",
    title: "Structural Steel H-beam Low",
    message: "H-beam stock at 12 tonnes — nearing reorder level of 10 tonnes.",
    projectId: "p3",
    projectName: "Main Stadium Renovation",
    createdAt: "2024-12-27T11:45:00Z",
    acknowledged: true,
  },
];

const SUPPLIERS: Supplier[] = [
  {
    id: "s1",
    name: "CemCo Supplies",
    contact: "James Hartley",
    email: "james@cemco.co.uk",
    phone: "+44 20 7946 0901",
    materials: ["Cement", "Mortar Mix"],
    rating: 4.5,
    totalOrders: 28,
    pendingAmount: 0,
  },
  {
    id: "s2",
    name: "SteelMax Ltd",
    contact: "Priya Nair",
    email: "priya@steelmax.co.uk",
    phone: "+44 20 7946 0210",
    materials: ["Rebar", "H-beam", "Structural Steel"],
    rating: 4.8,
    totalOrders: 15,
    pendingAmount: 289100,
  },
  {
    id: "s3",
    name: "Quarry Direct",
    contact: "Owen Burke",
    email: "owen@quarrydirect.co.uk",
    phone: "+44 20 7946 0345",
    materials: ["Aggregate", "Gravel", "Sand"],
    rating: 4.2,
    totalOrders: 22,
    pendingAmount: 0,
  },
  {
    id: "s4",
    name: "BlockMakers Inc",
    contact: "Sarah Thompson",
    email: "sarah@blockmakers.co.uk",
    phone: "+44 20 7946 0567",
    materials: ["Concrete Blocks", "Pavers"],
    rating: 3.9,
    totalOrders: 11,
    pendingAmount: 38400,
  },
  {
    id: "s5",
    name: "Crane Hire UK",
    contact: "David Walsh",
    email: "david@cranehire.co.uk",
    phone: "+44 20 7946 0789",
    materials: ["Crane Hire", "Heavy Equipment"],
    rating: 4.1,
    totalOrders: 8,
    pendingAmount: 47500,
  },
  {
    id: "s6",
    name: "TileWorld",
    contact: "Lisa Chen",
    email: "lisa@tileworld.co.uk",
    phone: "+44 20 7946 0123",
    materials: ["Floor Tiles", "Wall Tiles", "Grout"],
    rating: 3.5,
    totalOrders: 5,
    pendingAmount: 112000,
  },
];

const INV_LOGS: InventoryLog[] = [
  {
    id: "l1",
    materialId: "m1",
    materialName: "Portland Cement",
    type: "Inflow",
    quantity: 500,
    date: "2024-10-05",
    projectId: "p1",
    notes: "Delivery PO-4821",
    loggedBy: "Site Engineer",
  },
  {
    id: "l2",
    materialId: "m1",
    materialName: "Portland Cement",
    type: "Outflow",
    quantity: 120,
    date: "2024-10-12",
    projectId: "p1",
    notes: "Floor 8 slab pour",
    loggedBy: "Site Engineer",
  },
  {
    id: "l3",
    materialId: "m2",
    materialName: "Rebar Steel 12mm",
    type: "Inflow",
    quantity: 40,
    date: "2024-10-23",
    projectId: "p1",
    notes: "Delivery PO-4899",
    loggedBy: "Site Engineer",
  },
  {
    id: "l4",
    materialId: "m6",
    materialName: "Sand (Fine)",
    type: "Outflow",
    quantity: 15,
    date: "2024-12-28",
    projectId: "p3",
    notes: "Plastering crew usage",
    loggedBy: "Site Engineer",
  },
  {
    id: "l5",
    materialId: "m4",
    materialName: "Portland Cement",
    type: "Inflow",
    quantity: 200,
    date: "2024-12-09",
    projectId: "p2",
    notes: "Emergency top-up",
    loggedBy: "Site Engineer",
  },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => PROJECTS,
    staleTime: 30000,
  });
}

export function useProject(id: string) {
  return useQuery<Project | undefined>({
    queryKey: ["project", id],
    queryFn: async () => PROJECTS.find((p) => p.id === id),
    staleTime: 30000,
  });
}

export function useMaterials(projectId?: string) {
  return useQuery<Material[]>({
    queryKey: ["materials", projectId],
    queryFn: async () =>
      projectId
        ? MATERIALS.filter((m) => m.projectId === projectId)
        : MATERIALS,
    staleTime: 15000,
  });
}

export function useInventoryLogs(projectId?: string) {
  return useQuery<InventoryLog[]>({
    queryKey: ["inventory-logs", projectId],
    queryFn: async () =>
      projectId ? INV_LOGS.filter((l) => l.projectId === projectId) : INV_LOGS,
    staleTime: 15000,
  });
}

export function useInvoices(status?: string) {
  return useQuery<Invoice[]>({
    queryKey: ["invoices", status],
    queryFn: async () =>
      status ? INVOICES.filter((i) => i.status === status) : INVOICES,
    staleTime: 15000,
  });
}

export function useAlerts() {
  return useQuery<Alert[]>({
    queryKey: ["alerts"],
    queryFn: async () => ALERTS,
    staleTime: 10000,
    refetchInterval: 30000,
  });
}

export function useSuppliers() {
  return useQuery<Supplier[]>({
    queryKey: ["suppliers"],
    queryFn: async () => SUPPLIERS,
    staleTime: 60000,
  });
}

export function useDashboardStats() {
  return useQuery<DashboardStats>({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const activeProjects = PROJECTS.filter(
        (p) => p.status === "Active",
      ).length;
      const totalBudget = PROJECTS.reduce((s, p) => s + p.budget, 0);
      const totalSpent = PROJECTS.reduce((s, p) => s + p.spent, 0);
      const criticalAlerts = ALERTS.filter(
        (a) => a.severity === "Critical" && !a.acknowledged,
      ).length;
      const lowStockItems = MATERIALS.filter(
        (m) =>
          m.status === "LowStock" ||
          m.status === "Critical" ||
          m.status === "OutOfStock",
      ).length;
      const pendingInvoices = INVOICES.filter(
        (i) => i.status === "Pending" || i.status === "Overdue",
      ).length;
      const pendingAmount = INVOICES.filter(
        (i) => i.status === "Pending" || i.status === "Overdue",
      ).reduce((s, i) => s + i.amount, 0);
      return {
        totalProjects: PROJECTS.length,
        activeProjects,
        totalBudget,
        totalSpent,
        criticalAlerts,
        lowStockItems,
        pendingInvoices,
        pendingAmount,
      };
    },
    staleTime: 10000,
    refetchInterval: 30000,
  });
}

export function useBudgetVariance() {
  return useQuery<BudgetVariance[]>({
    queryKey: ["budget-variance"],
    queryFn: async () =>
      PROJECTS.map((p) => ({
        projectId: p.id,
        projectName: p.name,
        allocated: p.budget,
        spent: p.spent,
        committed: p.spent * 0.08,
        variance: p.budget - p.spent,
        variancePercent: ((p.budget - p.spent) / p.budget) * 100,
      })),
    staleTime: 15000,
  });
}

// ─── Inventory mutations ──────────────────────────────────────────────────────

export function useLogMaterialInflow() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      materialId,
      quantity,
      supplier,
      date,
      notes,
    }: {
      materialId: string;
      quantity: number;
      supplier: string;
      date: string;
      notes: string;
    }): Promise<void> => {
      const idx = MATERIALS.findIndex((m) => m.id === materialId);
      if (idx === -1) return;
      MATERIALS[idx] = {
        ...MATERIALS[idx],
        currentStock: MATERIALS[idx].currentStock + quantity,
        lastDeliveryDate: date,
        ...(supplier ? { supplier } : {}),
      };
      const mat = MATERIALS[idx];
      const newStatus: Material["status"] =
        mat.currentStock === 0
          ? "OutOfStock"
          : mat.currentStock < mat.reorderLevel * 0.5
            ? "Critical"
            : mat.currentStock < mat.reorderLevel
              ? "LowStock"
              : "InStock";
      MATERIALS[idx] = { ...MATERIALS[idx], status: newStatus };
      INV_LOGS.push({
        id: `l${Date.now()}`,
        materialId,
        materialName: mat.name,
        type: "Inflow",
        quantity,
        date,
        projectId: mat.projectId,
        notes,
        loggedBy: "Site Engineer",
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["materials"] });
      qc.invalidateQueries({ queryKey: ["inventory-logs"] });
      qc.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
  });
}

export function useLogMaterialOutflow() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      materialId,
      quantity,
      date,
      notes,
    }: {
      materialId: string;
      quantity: number;
      date: string;
      notes: string;
    }): Promise<void> => {
      const idx = MATERIALS.findIndex((m) => m.id === materialId);
      if (idx === -1) return;
      const next = Math.max(0, MATERIALS[idx].currentStock - quantity);
      const mat = MATERIALS[idx];
      const newStatus: Material["status"] =
        next === 0
          ? "OutOfStock"
          : next < mat.reorderLevel * 0.5
            ? "Critical"
            : next < mat.reorderLevel
              ? "LowStock"
              : "InStock";
      MATERIALS[idx] = { ...mat, currentStock: next, status: newStatus };
      INV_LOGS.push({
        id: `l${Date.now()}`,
        materialId,
        materialName: mat.name,
        type: "Outflow",
        quantity,
        date,
        projectId: mat.projectId,
        notes,
        loggedBy: "Site Engineer",
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["materials"] });
      qc.invalidateQueries({ queryKey: ["inventory-logs"] });
      qc.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
  });
}

export function useAcknowledgeAlert() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (alertId: string) => alertId,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["alerts"] });
    },
  });
}

// ─── Invoice mutations ────────────────────────────────────────────────────────

let nextInvoiceId = INVOICES.length + 1;

export function useCreateInvoice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (
      payload: Omit<Invoice, "id" | "invoiceNumber" | "issueDate" | "dueDate">,
    ): Promise<Invoice> => {
      const now = new Date();
      const due = new Date(now);
      due.setDate(due.getDate() + 30);
      const pad = (n: number) => String(n).padStart(4, "0");
      const invoice: Invoice = {
        ...payload,
        id: `i${Date.now()}`,
        invoiceNumber: `INV-${now.getFullYear()}-${pad(nextInvoiceId++)}`,
        issueDate: now.toISOString().slice(0, 10),
        dueDate: due.toISOString().slice(0, 10),
      };
      INVOICES.push(invoice);
      return invoice;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["invoices"] });
      qc.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
  });
}

export function useUpdateInvoiceStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: { id: string; status: InvoiceStatus }): Promise<void> => {
      const idx = INVOICES.findIndex((i) => i.id === id);
      if (idx === -1) throw new Error("Invoice not found");
      INVOICES[idx] = {
        ...INVOICES[idx],
        status,
        ...(status === "Paid"
          ? { paidDate: new Date().toISOString().slice(0, 10) }
          : {}),
      };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["invoices"] });
      qc.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
  });
}
