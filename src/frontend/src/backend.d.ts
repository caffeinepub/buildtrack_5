import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface InvoicePublic {
    id: InvoiceId;
    status: InvoiceStatus;
    lineItems: Array<InvoiceLineItem>;
    createdAt: Timestamp;
    createdBy: UserId;
    dueDate?: Timestamp;
    updatedAt: Timestamp;
    invoiceType: InvoiceType;
    projectId: ProjectId;
    totalAmount: number;
    notes?: string;
    paidAt?: Timestamp;
    supplierId?: SupplierId;
}
export interface BudgetVariance {
    totalAllocated: number;
    projectName: string;
    categoryBreakdown: Array<CategoryVariance>;
    variancePercent: number;
    variance: number;
    totalSpent: number;
    projectId: ProjectId;
    isOverrun: boolean;
}
export type Timestamp = bigint;
export interface MaterialPublic {
    id: MaterialId;
    name: string;
    createdAt: Timestamp;
    unit: string;
    updatedAt: Timestamp;
    projectId: ProjectId;
    category: MaterialCategory;
    currentStock: number;
    reorderThreshold: number;
}
export interface UserPublic {
    id: UserId;
    name: string;
    createdAt: Timestamp;
    role: Role;
    isActive: boolean;
    email: string;
}
export interface PhaseSpending {
    totalSpent: number;
    phaseName: string;
    phaseId: PhaseId;
}
export interface BudgetPublic {
    id: BudgetId;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    projectId: ProjectId;
    notes?: string;
    allocatedAmount: number;
    category: BudgetCategory;
    spentAmount: number;
}
export type BudgetId = bigint;
export interface InventoryTransaction {
    id: TransactionId;
    transactionDate: Timestamp;
    transactionType: TransactionType;
    createdAt: Timestamp;
    invoiceId?: InvoiceId;
    totalCost: number;
    materialId: MaterialId;
    recordedBy: UserId;
    projectId: ProjectId;
    notes?: string;
    quantity: number;
    supplierId?: SupplierId;
    phaseId?: PhaseId;
    unitCost: number;
    qrCode?: string;
}
export interface CreateDeliveryPayload {
    projectId: ProjectId;
    notes?: string;
    expectedDate: Timestamp;
    supplierId: SupplierId;
}
export interface SpendingReport {
    phaseBreakdown: Array<PhaseSpending>;
    projectName: string;
    materialBreakdown: Array<MaterialSpending>;
    reportGeneratedAt: Timestamp;
    totalSpent: number;
    projectId: ProjectId;
}
export interface SupplierPublic {
    id: SupplierId;
    materialCategories: Array<MaterialCategory>;
    name: string;
    createdAt: Timestamp;
    contactPerson: string;
    isActive: boolean;
    email: string;
    updatedAt: Timestamp;
    address: string;
    phone: string;
}
export type TransactionId = bigint;
export interface MaterialSpending {
    totalCost: number;
    materialId: MaterialId;
    materialName: string;
    totalQuantity: number;
}
export interface ProjectPublic {
    id: ProjectId;
    status: ProjectStatus;
    name: string;
    createdAt: Timestamp;
    createdBy: UserId;
    description: string;
    siteLocation: string;
    updatedAt: Timestamp;
    totalBudget: number;
}
export interface DeliveryPublic {
    id: bigint;
    status: DeliveryStatus;
    createdAt: Timestamp;
    actualDate?: Timestamp;
    updatedAt: Timestamp;
    projectId: ProjectId;
    notes?: string;
    expectedDate: Timestamp;
    supplierId: SupplierId;
}
export type SupplierId = bigint;
export interface UpdateInvoiceStatusPayload {
    status: InvoiceStatus;
    invoiceId: InvoiceId;
}
export interface RegisterUserPayload {
    name: string;
    role: Role;
    email: string;
}
export interface LogOutflowPayload {
    transactionDate: Timestamp;
    materialId: MaterialId;
    projectId: ProjectId;
    notes?: string;
    quantity: number;
    phaseId?: PhaseId;
    unitCost: number;
    qrCode?: string;
}
export interface CreateMaterialPayload {
    name: string;
    unit: string;
    projectId: ProjectId;
    category: MaterialCategory;
    reorderThreshold: number;
}
export interface AlertPublic {
    id: AlertId;
    alertType: AlertType;
    acknowledgedAt?: Timestamp;
    acknowledgedBy?: UserId;
    createdAt: Timestamp;
    isAcknowledged: boolean;
    relatedEntityId: bigint;
    projectId: ProjectId;
    message: string;
    severity: AlertSeverity;
}
export interface InventoryBalance {
    isBelowThreshold: boolean;
    unit: string;
    materialId: MaterialId;
    projectId: ProjectId;
    category: MaterialCategory;
    currentStock: number;
    materialName: string;
    reorderThreshold: number;
}
export interface CreateSupplierPayload {
    materialCategories: Array<MaterialCategory>;
    name: string;
    contactPerson: string;
    email: string;
    address: string;
    phone: string;
}
export type PhaseId = bigint;
export interface CreateProjectPayload {
    name: string;
    description: string;
    siteLocation: string;
    totalBudget: number;
}
export interface CategoryVariance {
    allocated: number;
    variance: number;
    spent: number;
    category: BudgetCategory;
}
export interface PhasePublic {
    id: PhaseId;
    status: PhaseStatus;
    endDate?: Timestamp;
    name: string;
    createdAt: Timestamp;
    description: string;
    budgetAllocation: number;
    projectId: ProjectId;
    startDate?: Timestamp;
}
export interface CreateInvoicePayload {
    lineItems: Array<InvoiceLineItem>;
    dueDate?: Timestamp;
    projectId: ProjectId;
    notes?: string;
    supplierId?: SupplierId;
}
export type AlertId = bigint;
export interface UpdateProjectPayload {
    status?: ProjectStatus;
    name?: string;
    description?: string;
    siteLocation?: string;
    totalBudget?: number;
}
export type MaterialId = bigint;
export type UserId = Principal;
export type ProjectId = bigint;
export interface LogInflowPayload {
    transactionDate: Timestamp;
    materialId: MaterialId;
    projectId: ProjectId;
    notes?: string;
    quantity: number;
    supplierId?: SupplierId;
    phaseId?: PhaseId;
    unitCost: number;
    qrCode?: string;
}
export type InvoiceId = bigint;
export interface UpdateBudgetPayload {
    notes?: string;
    allocatedAmount?: number;
}
export interface CreatePhasePayload {
    endDate?: Timestamp;
    name: string;
    description: string;
    budgetAllocation: number;
    projectId: ProjectId;
    startDate?: Timestamp;
}
export interface InvoiceLineItem {
    totalCost: number;
    description: string;
    materialId?: MaterialId;
    quantity: number;
    unitCost: number;
}
export interface CreateBudgetPayload {
    projectId: ProjectId;
    notes?: string;
    allocatedAmount: number;
    category: BudgetCategory;
}
export enum AlertSeverity {
    Info = "Info",
    Critical = "Critical",
    Warning = "Warning"
}
export enum AlertType {
    BudgetOverrun = "BudgetOverrun",
    PendingInvoice = "PendingInvoice",
    LowInventory = "LowInventory"
}
export enum BudgetCategory {
    Labor = "Labor",
    Overhead = "Overhead",
    Materials = "Materials",
    Other = "Other",
    Equipment = "Equipment"
}
export enum DeliveryStatus {
    InTransit = "InTransit",
    Delivered = "Delivered",
    Cancelled = "Cancelled",
    Pending = "Pending"
}
export enum InvoiceStatus {
    Paid = "Paid",
    Draft = "Draft",
    Cancelled = "Cancelled",
    Pending = "Pending"
}
export enum InvoiceType {
    SupplierDelivery = "SupplierDelivery",
    Manual = "Manual"
}
export enum MaterialCategory {
    Steel = "Steel",
    Plumbing = "Plumbing",
    Sand = "Sand",
    Cement = "Cement",
    Wood = "Wood",
    Bricks = "Bricks",
    Aggregate = "Aggregate",
    Paint = "Paint",
    Electrical = "Electrical",
    Other = "Other"
}
export enum PhaseStatus {
    Planned = "Planned",
    InProgress = "InProgress",
    Completed = "Completed"
}
export enum ProjectStatus {
    Inactive = "Inactive",
    Active = "Active",
    Completed = "Completed"
}
export enum Role {
    ProjectManager = "ProjectManager",
    Admin = "Admin",
    SiteEngineer = "SiteEngineer",
    FinanceProcurement = "FinanceProcurement"
}
export enum TransactionType {
    Outflow = "Outflow",
    Inflow = "Inflow"
}
export interface backendInterface {
    acknowledgeAlert(alertId: AlertId): Promise<AlertPublic>;
    createBudget(payload: CreateBudgetPayload): Promise<BudgetPublic>;
    createDelivery(payload: CreateDeliveryPayload): Promise<DeliveryPublic>;
    createInvoice(payload: CreateInvoicePayload): Promise<InvoicePublic>;
    createMaterial(payload: CreateMaterialPayload): Promise<MaterialPublic>;
    createPhase(payload: CreatePhasePayload): Promise<PhasePublic>;
    createProject(payload: CreateProjectPayload): Promise<ProjectPublic>;
    createSupplier(payload: CreateSupplierPayload): Promise<SupplierPublic>;
    getBudgetVariance(projectId: ProjectId): Promise<BudgetVariance>;
    getBudgetsByProject(projectId: ProjectId): Promise<Array<BudgetPublic>>;
    getInventoryBalance(projectId: ProjectId): Promise<Array<InventoryBalance>>;
    getInvoice(invoiceId: InvoiceId): Promise<InvoicePublic | null>;
    getMaterialByQrCode(qrCode: string): Promise<InventoryTransaction | null>;
    getMyProfile(): Promise<UserPublic | null>;
    getPendingInvoices(projectId: ProjectId | null): Promise<Array<InvoicePublic>>;
    getProject(projectId: ProjectId): Promise<ProjectPublic | null>;
    getSpendingReport(projectId: ProjectId): Promise<SpendingReport>;
    getSupplier(supplierId: SupplierId): Promise<SupplierPublic | null>;
    isUserRegistered(): Promise<boolean>;
    listAlerts(projectId: ProjectId | null, onlyUnacknowledged: boolean): Promise<Array<AlertPublic>>;
    listDeliveries(supplierId: SupplierId | null, projectId: ProjectId | null, status: DeliveryStatus | null): Promise<Array<DeliveryPublic>>;
    listInventoryTransactions(projectId: ProjectId | null, materialId: MaterialId | null, txType: TransactionType | null): Promise<Array<InventoryTransaction>>;
    listInvoices(projectId: ProjectId | null, supplierId: SupplierId | null, status: InvoiceStatus | null): Promise<Array<InvoicePublic>>;
    listMaterials(projectId: ProjectId | null): Promise<Array<MaterialPublic>>;
    listPhasesByProject(projectId: ProjectId): Promise<Array<PhasePublic>>;
    listProjects(statusFilter: ProjectStatus | null): Promise<Array<ProjectPublic>>;
    listSuppliers(): Promise<Array<SupplierPublic>>;
    listUsers(): Promise<Array<UserPublic>>;
    logMaterialInflow(payload: LogInflowPayload): Promise<InventoryTransaction>;
    logMaterialOutflow(payload: LogOutflowPayload): Promise<InventoryTransaction>;
    registerUser(payload: RegisterUserPayload): Promise<UserPublic>;
    runAlertChecks(): Promise<bigint>;
    updateBudget(budgetId: BudgetId, payload: UpdateBudgetPayload): Promise<BudgetPublic>;
    updateDeliveryStatus(deliveryId: bigint, status: DeliveryStatus, actualDate: Timestamp | null): Promise<DeliveryPublic>;
    updateInvoiceStatus(payload: UpdateInvoiceStatusPayload): Promise<InvoicePublic>;
    updateProject(projectId: ProjectId, payload: UpdateProjectPayload): Promise<ProjectPublic>;
    updateUserRole(targetId: UserId, role: Role): Promise<UserPublic>;
}
