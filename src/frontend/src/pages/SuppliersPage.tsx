import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  ChevronRight,
  Mail,
  Package,
  Phone,
  PlusCircle,
  Star,
  Truck,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { DataTable } from "../components/shared/DataTable";
import { EmptyState } from "../components/shared/EmptyState";
import { PageHeader } from "../components/shared/PageHeader";
import { StatCard } from "../components/shared/StatCard";
import { StatusBadge } from "../components/shared/StatusBadge";
import { useProjects, useSuppliers } from "../hooks/useBackend";
import type { Column, Supplier } from "../types";

// ─── Types ────────────────────────────────────────────────────────────────────

type DeliveryStatus = "Pending" | "InTransit" | "Delivered" | "Cancelled";

interface DeliveryRecord {
  id: string;
  date: string;
  projectName: string;
  materials: string;
  status: DeliveryStatus;
  amount: number;
}

// ─── Seed data for delivery history ──────────────────────────────────────────

const DELIVERY_HISTORY: Record<string, DeliveryRecord[]> = {
  s1: [
    {
      id: "d1",
      date: "2024-10-05",
      projectName: "Riverside Tower Block A",
      materials: "Portland Cement × 500 bags",
      status: "Delivered",
      amount: 6250,
    },
    {
      id: "d2",
      date: "2024-12-09",
      projectName: "Eastside Residential Dev",
      materials: "Portland Cement × 200 bags",
      status: "Delivered",
      amount: 2500,
    },
    {
      id: "d3",
      date: "2025-01-15",
      projectName: "Riverside Tower Block A",
      materials: "Portland Cement × 400 bags",
      status: "InTransit",
      amount: 5000,
    },
  ],
  s2: [
    {
      id: "d4",
      date: "2024-10-23",
      projectName: "Riverside Tower Block A",
      materials: "Rebar 12mm × 40 tonnes",
      status: "Delivered",
      amount: 35600,
    },
    {
      id: "d5",
      date: "2024-11-15",
      projectName: "Main Stadium Renovation",
      materials: "H-beam × 8 tonnes",
      status: "Delivered",
      amount: 9600,
    },
    {
      id: "d6",
      date: "2025-01-20",
      projectName: "Riverside Tower Block A",
      materials: "Rebar 12mm × 25 tonnes",
      status: "Pending",
      amount: 22250,
    },
  ],
  s3: [
    {
      id: "d7",
      date: "2024-10-30",
      projectName: "Riverside Tower Block A",
      materials: "Coarse Aggregate × 100 m³",
      status: "Delivered",
      amount: 4500,
    },
    {
      id: "d8",
      date: "2024-11-28",
      projectName: "Eastside Residential Dev",
      materials: "Sand Fine × 80 m³",
      status: "Delivered",
      amount: 2800,
    },
  ],
  s4: [
    {
      id: "d9",
      date: "2024-11-10",
      projectName: "Eastside Residential Dev",
      materials: "Concrete Blocks × 2400 pcs",
      status: "Delivered",
      amount: 7680,
    },
    {
      id: "d10",
      date: "2025-01-08",
      projectName: "Eastside Residential Dev",
      materials: "Concrete Blocks × 1500 pcs",
      status: "Pending",
      amount: 4800,
    },
  ],
  s5: [
    {
      id: "d11",
      date: "2024-09-01",
      projectName: "Main Stadium Renovation",
      materials: "Tower Crane — monthly hire",
      status: "Delivered",
      amount: 47500,
    },
    {
      id: "d12",
      date: "2024-12-01",
      projectName: "Eastside Residential Dev",
      materials: "Mobile Crane — weekly hire",
      status: "Cancelled",
      amount: 12000,
    },
  ],
  s6: [
    {
      id: "d13",
      date: "2024-11-20",
      projectName: "Main Stadium Renovation",
      materials: "Floor Tiles × 4000 m²",
      status: "Delivered",
      amount: 112000,
    },
    {
      id: "d14",
      date: "2025-01-12",
      projectName: "Riverside Tower Block A",
      materials: "Wall Tiles × 800 m²",
      status: "InTransit",
      amount: 28000,
    },
  ],
};

const ALL_MATERIAL_CATEGORIES = [
  "Cement",
  "Mortar Mix",
  "Rebar",
  "H-beam",
  "Structural Steel",
  "Aggregate",
  "Gravel",
  "Sand",
  "Concrete Blocks",
  "Pavers",
  "Crane Hire",
  "Heavy Equipment",
  "Floor Tiles",
  "Wall Tiles",
  "Grout",
  "Timber",
  "Paint",
  "Plumbing",
  "Electrical",
];

// ─── Formatters ───────────────────────────────────────────────────────────────

function fmt(n: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(n);
}

// ─── Star Rating ──────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
      <span className="text-xs font-mono text-foreground">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

// ─── Delivery Status Badge ────────────────────────────────────────────────────

function DeliveryBadge({ status }: { status: DeliveryStatus }) {
  const map: Record<DeliveryStatus, string> = {
    Pending:
      "bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30",
    InTransit:
      "bg-teal-500/15 text-teal-700 dark:text-teal-400 border-teal-500/30",
    Delivered:
      "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
    Cancelled: "bg-muted text-muted-foreground border-border",
  };
  const labels: Record<DeliveryStatus, string> = {
    Pending: "Pending",
    InTransit: "In Transit",
    Delivered: "Delivered",
    Cancelled: "Cancelled",
  };
  return (
    <Badge
      variant="outline"
      className={`text-[10px] px-1.5 py-0 border rounded-none font-medium ${map[status]}`}
    >
      {labels[status]}
    </Badge>
  );
}

// ─── Update Delivery Status Dialog ───────────────────────────────────────────

function UpdateDeliveryDialog({
  delivery,
  onClose,
}: {
  delivery: DeliveryRecord;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<DeliveryStatus>(delivery.status);

  const FLOW: DeliveryStatus[] = [
    "Pending",
    "InTransit",
    "Delivered",
    "Cancelled",
  ];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    toast.success(`Delivery status updated to "${status}"`);
    onClose();
  }

  return (
    <Dialog open onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="rounded-none max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-display text-base">
            Update Delivery Status
          </DialogTitle>
        </DialogHeader>
        <div className="mt-2 text-xs text-muted-foreground mb-4 bg-muted/40 px-3 py-2 border-l-2 border-teal-500">
          <p className="font-medium text-foreground">{delivery.materials}</p>
          <p className="mt-0.5">
            {delivery.projectName} · {delivery.date}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-semibold uppercase tracking-wide">
              New Status
            </Label>
            <Select
              value={status}
              onValueChange={(v) => setStatus(v as DeliveryStatus)}
            >
              <SelectTrigger
                className="rounded-none"
                data-ocid="delivery-status-select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FLOW.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s === "InTransit" ? "In Transit" : s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status flow visual */}
          <div className="flex items-center gap-1">
            {FLOW.filter((s) => s !== "Cancelled").map((s, i) => (
              <div key={s} className="flex items-center gap-1 flex-1">
                <div
                  className={`h-5 flex-1 text-[9px] flex items-center justify-center font-medium border transition-colors ${
                    status === s
                      ? "bg-teal-600 text-white border-teal-600"
                      : FLOW.indexOf(status) > i
                        ? "bg-teal-600/20 text-teal-700 dark:text-teal-400 border-teal-500/30"
                        : "bg-muted text-muted-foreground border-border"
                  }`}
                >
                  {s === "InTransit" ? "Transit" : s}
                </div>
                {i < 2 && (
                  <ChevronRight className="w-3 h-3 text-muted-foreground shrink-0" />
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              type="submit"
              size="sm"
              className="rounded-none bg-teal-600 hover:bg-teal-700 text-white flex-1"
              data-ocid="update-delivery-submit"
            >
              <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Update Status
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-none"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Add Delivery Dialog ──────────────────────────────────────────────────────

interface AddDeliveryForm {
  supplierId: string;
  projectId: string;
  expectedDate: string;
  materials: string;
  quantity: string;
  unit: string;
  amount: string;
}

const EMPTY_DELIVERY: AddDeliveryForm = {
  supplierId: "",
  projectId: "",
  expectedDate: "",
  materials: "",
  quantity: "",
  unit: "bags",
  amount: "",
};

function AddDeliveryDialog({
  open,
  onClose,
  defaultSupplierId,
}: {
  open: boolean;
  onClose: () => void;
  defaultSupplierId?: string;
}) {
  const { data: suppliers } = useSuppliers();
  const { data: projects } = useProjects();
  const [form, setForm] = useState<AddDeliveryForm>({
    ...EMPTY_DELIVERY,
    supplierId: defaultSupplierId ?? "",
  });

  function set<K extends keyof AddDeliveryForm>(k: K, v: AddDeliveryForm[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.supplierId || !form.projectId || !form.materials.trim()) return;
    const supplierName =
      suppliers?.find((s) => s.id === form.supplierId)?.name ?? form.supplierId;
    toast.success(`Delivery from ${supplierName} scheduled`);
    setForm(EMPTY_DELIVERY);
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="rounded-none max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-base">
            Schedule Delivery
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wide">
                Supplier *
              </Label>
              <Select
                value={form.supplierId}
                onValueChange={(v) => set("supplierId", v)}
              >
                <SelectTrigger
                  className="rounded-none"
                  data-ocid="delivery-supplier-select"
                >
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  {suppliers?.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wide">
                Project *
              </Label>
              <Select
                value={form.projectId}
                onValueChange={(v) => set("projectId", v)}
              >
                <SelectTrigger
                  className="rounded-none"
                  data-ocid="delivery-project-select"
                >
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  {projects?.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="del-materials"
              className="text-xs font-semibold uppercase tracking-wide"
            >
              Materials *
            </Label>
            <Input
              id="del-materials"
              placeholder="e.g. Portland Cement, Rebar 12mm"
              value={form.materials}
              onChange={(e) => set("materials", e.target.value)}
              className="rounded-none"
              required
              data-ocid="delivery-materials-input"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="del-qty"
                className="text-xs font-semibold uppercase tracking-wide"
              >
                Quantity
              </Label>
              <Input
                id="del-qty"
                type="number"
                min="0"
                placeholder="e.g. 500"
                value={form.quantity}
                onChange={(e) => set("quantity", e.target.value)}
                className="rounded-none font-mono"
                data-ocid="delivery-quantity-input"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wide">
                Unit
              </Label>
              <Select value={form.unit} onValueChange={(v) => set("unit", v)}>
                <SelectTrigger
                  className="rounded-none"
                  data-ocid="delivery-unit-select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "bags",
                    "tonnes",
                    "kg",
                    "pieces",
                    "m³",
                    "m²",
                    "litres",
                    "rolls",
                  ].map((u) => (
                    <SelectItem key={u} value={u}>
                      {u}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="del-amount"
                className="text-xs font-semibold uppercase tracking-wide"
              >
                Amount (£)
              </Label>
              <Input
                id="del-amount"
                type="number"
                min="0"
                placeholder="e.g. 5000"
                value={form.amount}
                onChange={(e) => set("amount", e.target.value)}
                className="rounded-none font-mono"
                data-ocid="delivery-amount-input"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="del-date"
              className="text-xs font-semibold uppercase tracking-wide"
            >
              Expected Date
            </Label>
            <Input
              id="del-date"
              type="date"
              value={form.expectedDate}
              onChange={(e) => set("expectedDate", e.target.value)}
              className="rounded-none font-mono"
              data-ocid="delivery-date-input"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              type="submit"
              size="sm"
              className="rounded-none bg-teal-600 hover:bg-teal-700 text-white flex-1"
              data-ocid="schedule-delivery-submit"
            >
              <Truck className="w-4 h-4 mr-1.5" /> Schedule Delivery
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-none"
              onClick={onClose}
              data-ocid="schedule-delivery-cancel"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Add Supplier Dialog ──────────────────────────────────────────────────────

interface NewSupplierForm {
  name: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
  materials: string[];
}

const EMPTY_SUPPLIER: NewSupplierForm = {
  name: "",
  contact: "",
  phone: "",
  email: "",
  address: "",
  materials: [],
};

function AddSupplierDialog({
  open,
  onClose,
}: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState<NewSupplierForm>(EMPTY_SUPPLIER);
  const [matSearch, setMatSearch] = useState("");

  function setField<K extends keyof NewSupplierForm>(
    k: K,
    v: NewSupplierForm[K],
  ) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function toggleMat(mat: string) {
    setForm((f) => ({
      ...f,
      materials: f.materials.includes(mat)
        ? f.materials.filter((m) => m !== mat)
        : [...f.materials, mat],
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.contact.trim()) return;
    toast.success(`Supplier "${form.name}" added to directory`);
    setForm(EMPTY_SUPPLIER);
    setMatSearch("");
    onClose();
  }

  const filteredMats = ALL_MATERIAL_CATEGORIES.filter((m) =>
    m.toLowerCase().includes(matSearch.toLowerCase()),
  );

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="rounded-none max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-base">
            Add New Supplier
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="sup-name"
              className="text-xs font-semibold uppercase tracking-wide"
            >
              Company Name *
            </Label>
            <Input
              id="sup-name"
              placeholder="e.g. BuildMat Supplies Ltd"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              className="rounded-none"
              required
              data-ocid="sup-name-input"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="sup-contact"
              className="text-xs font-semibold uppercase tracking-wide"
            >
              Contact Person *
            </Label>
            <Input
              id="sup-contact"
              placeholder="e.g. Jane Smith"
              value={form.contact}
              onChange={(e) => setField("contact", e.target.value)}
              className="rounded-none"
              required
              data-ocid="sup-contact-input"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="sup-phone"
                className="text-xs font-semibold uppercase tracking-wide"
              >
                Phone
              </Label>
              <Input
                id="sup-phone"
                type="tel"
                placeholder="+44 20 7946 0000"
                value={form.phone}
                onChange={(e) => setField("phone", e.target.value)}
                className="rounded-none font-mono"
                data-ocid="sup-phone-input"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="sup-email"
                className="text-xs font-semibold uppercase tracking-wide"
              >
                Email
              </Label>
              <Input
                id="sup-email"
                type="email"
                placeholder="contact@supplier.co.uk"
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
                className="rounded-none"
                data-ocid="sup-email-input"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="sup-address"
              className="text-xs font-semibold uppercase tracking-wide"
            >
              Address
            </Label>
            <Input
              id="sup-address"
              placeholder="e.g. 10 Industrial Estate, Manchester"
              value={form.address}
              onChange={(e) => setField("address", e.target.value)}
              className="rounded-none"
              data-ocid="sup-address-input"
            />
          </div>

          {/* Material categories multi-select */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-semibold uppercase tracking-wide">
              Material Categories Supplied
              {form.materials.length > 0 && (
                <span className="ml-2 font-mono text-teal-600 dark:text-teal-400">
                  ({form.materials.length} selected)
                </span>
              )}
            </Label>
            <Input
              placeholder="Filter categories..."
              value={matSearch}
              onChange={(e) => setMatSearch(e.target.value)}
              className="rounded-none h-8 text-xs"
              data-ocid="sup-mat-search"
            />
            <div className="border border-border p-2 max-h-40 overflow-y-auto grid grid-cols-2 gap-1.5">
              {filteredMats.map((mat) => (
                <div key={mat} className="flex items-center gap-1.5">
                  <Checkbox
                    id={`mat-${mat}`}
                    checked={form.materials.includes(mat)}
                    onCheckedChange={() => toggleMat(mat)}
                    className="rounded-none h-3.5 w-3.5"
                    data-ocid={`mat-check-${mat.toLowerCase().replace(/\s+/g, "-")}`}
                  />
                  <label
                    htmlFor={`mat-${mat}`}
                    className="text-xs text-foreground cursor-pointer"
                  >
                    {mat}
                  </label>
                </div>
              ))}
            </div>
            {form.materials.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {form.materials.map((m) => (
                  <Badge
                    key={m}
                    variant="outline"
                    className="text-[10px] rounded-none bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-500/30 gap-1 pr-1"
                  >
                    {m}
                    <button
                      type="button"
                      onClick={() => toggleMat(m)}
                      className="hover:text-destructive"
                      aria-label={`Remove ${m}`}
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              type="submit"
              size="sm"
              className="rounded-none bg-teal-600 hover:bg-teal-700 text-white flex-1"
              data-ocid="add-supplier-submit"
            >
              <PlusCircle className="w-4 h-4 mr-1.5" /> Add Supplier
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-none"
              onClick={onClose}
              data-ocid="add-supplier-cancel"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Supplier Detail Panel ────────────────────────────────────────────────────

function SupplierDetailPanel({
  supplier,
  onClose,
}: {
  supplier: Supplier;
  onClose: () => void;
}) {
  const deliveries = DELIVERY_HISTORY[supplier.id] ?? [];
  const [addDeliveryOpen, setAddDeliveryOpen] = useState(false);
  const [editingDelivery, setEditingDelivery] = useState<DeliveryRecord | null>(
    null,
  );

  const delivered = deliveries.filter((d) => d.status === "Delivered").length;
  const pending = deliveries.filter(
    (d) => d.status === "Pending" || d.status === "InTransit",
  ).length;

  const deliveryCols: Column<DeliveryRecord>[] = [
    {
      key: "date",
      label: "Date",
      sortable: true,
      render: (r) => <span className="font-mono text-xs">{r.date}</span>,
    },
    {
      key: "projectName",
      label: "Project",
      render: (r) => (
        <span className="text-xs truncate max-w-[120px] block">
          {r.projectName}
        </span>
      ),
    },
    {
      key: "materials",
      label: "Materials",
      render: (r) => (
        <span className="text-xs text-muted-foreground truncate max-w-[140px] block">
          {r.materials}
        </span>
      ),
    },
    {
      key: "amount",
      label: "Value",
      sortable: true,
      align: "right",
      render: (r) => <span className="font-mono text-xs">{fmt(r.amount)}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (r) => <DeliveryBadge status={r.status} />,
    },
    {
      key: "id",
      label: "",
      render: (r) =>
        r.status !== "Delivered" && r.status !== "Cancelled" ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setEditingDelivery(r);
            }}
            className="text-[10px] text-teal-600 dark:text-teal-400 hover:underline"
            data-ocid="update-delivery-status-btn"
          >
            Update
          </button>
        ) : null,
    },
  ];

  return (
    <>
      <div
        className="fixed inset-0 bg-foreground/20 z-40"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        aria-hidden
      />
      <aside
        className="fixed right-0 top-0 h-full w-full max-w-2xl bg-card border-l border-border z-50 overflow-y-auto flex flex-col"
        data-ocid="supplier-detail-panel"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 px-5 py-4 border-b border-border bg-muted/30 sticky top-0 z-10">
          <div className="min-w-0">
            <h2 className="font-display font-semibold text-base text-foreground truncate">
              {supplier.name}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {supplier.contact}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <StarRating rating={supplier.rating} />
            <button
              type="button"
              onClick={onClose}
              className="p-1 hover:bg-muted transition-colors rounded-sm"
              aria-label="Close panel"
              data-ocid="close-supplier-panel"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        <div className="flex-1 px-5 py-4 flex flex-col gap-6">
          {/* Contact info */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-background border border-border p-3 flex items-start gap-2">
              <Phone className="w-3.5 h-3.5 mt-0.5 text-muted-foreground shrink-0" />
              <div>
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  Phone
                </p>
                <p className="text-xs font-mono text-foreground mt-0.5">
                  {supplier.phone}
                </p>
              </div>
            </div>
            <div className="bg-background border border-border p-3 flex items-start gap-2">
              <Mail className="w-3.5 h-3.5 mt-0.5 text-muted-foreground shrink-0" />
              <div>
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  Email
                </p>
                <a
                  href={`mailto:${supplier.email}`}
                  className="text-xs text-teal-600 dark:text-teal-400 hover:underline font-mono mt-0.5 block"
                >
                  {supplier.email}
                </a>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "Total Orders", value: supplier.totalOrders },
              { label: "Delivered", value: delivered },
              { label: "Active", value: pending, highlight: pending > 0 },
              {
                label: "Pending (£)",
                value:
                  supplier.pendingAmount > 0
                    ? fmt(supplier.pendingAmount)
                    : "—",
                warn: supplier.pendingAmount > 0,
              },
            ].map(({ label, value, highlight, warn }) => (
              <div
                key={label}
                className="bg-background border border-border p-2.5"
              >
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                  {label}
                </p>
                <p
                  className={`font-mono font-semibold text-sm mt-0.5 ${warn ? "text-orange-600 dark:text-orange-400" : highlight ? "text-teal-600 dark:text-teal-400" : "text-foreground"}`}
                >
                  {String(value)}
                </p>
              </div>
            ))}
          </div>

          {/* Material categories */}
          <div>
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-2 flex items-center gap-1.5">
              <Package className="w-3 h-3" /> Material Categories
            </p>
            <div className="flex flex-wrap gap-1.5">
              {(supplier.materials as string[]).map((m) => (
                <Badge
                  key={m}
                  variant="outline"
                  className="text-[10px] rounded-none bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-500/30"
                >
                  {m}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Delivery history */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" /> Delivery History
              </h3>
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-xs rounded-none gap-1"
                onClick={() => setAddDeliveryOpen(true)}
                data-ocid="add-delivery-btn"
              >
                <PlusCircle className="w-3.5 h-3.5" /> Schedule Delivery
              </Button>
            </div>

            {deliveries.length > 0 ? (
              <DataTable<DeliveryRecord>
                columns={deliveryCols}
                data={deliveries}
                rowKey={(r) => r.id}
                data-ocid="delivery-history-table"
              />
            ) : (
              <p className="text-xs text-muted-foreground py-4 text-center">
                No delivery history yet.
              </p>
            )}
          </div>
        </div>
      </aside>

      {addDeliveryOpen && (
        <AddDeliveryDialog
          open={addDeliveryOpen}
          onClose={() => setAddDeliveryOpen(false)}
          defaultSupplierId={supplier.id}
        />
      )}
      {editingDelivery && (
        <UpdateDeliveryDialog
          delivery={editingDelivery}
          onClose={() => setEditingDelivery(null)}
        />
      )}
    </>
  );
}

// ─── Table Columns ────────────────────────────────────────────────────────────

const COLUMNS: Column<Supplier>[] = [
  {
    key: "name",
    label: "Supplier",
    sortable: true,
    render: (row) => (
      <div className="min-w-0">
        <p className="font-medium text-sm text-foreground">{row.name}</p>
        <p className="text-xs text-muted-foreground">{row.contact}</p>
      </div>
    ),
  },
  {
    key: "phone",
    label: "Phone",
    render: (row) => (
      <span className="font-mono text-xs text-muted-foreground">
        {row.phone}
      </span>
    ),
  },
  {
    key: "email",
    label: "Email",
    render: (row) => (
      <a
        href={`mailto:${row.email}`}
        className="text-xs text-teal-600 dark:text-teal-400 hover:underline font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        {row.email}
      </a>
    ),
  },
  {
    key: "materials",
    label: "Materials",
    render: (row) => (
      <span className="text-xs text-muted-foreground truncate max-w-32 block">
        {(row.materials as string[]).join(", ")}
      </span>
    ),
  },
  {
    key: "totalOrders",
    label: "Orders",
    sortable: true,
    align: "right",
    render: (row) => (
      <span className="font-mono text-sm">{row.totalOrders}</span>
    ),
  },
  {
    key: "pendingAmount",
    label: "Pending",
    sortable: true,
    align: "right",
    render: (row) => (
      <span
        className={`font-mono text-sm font-semibold ${row.pendingAmount > 0 ? "text-orange-600 dark:text-orange-400" : "text-muted-foreground"}`}
      >
        {row.pendingAmount > 0 ? fmt(row.pendingAmount) : "—"}
      </span>
    ),
  },
  {
    key: "rating",
    label: "Rating",
    sortable: true,
    align: "center",
    render: (row) => <StarRating rating={row.rating} />,
  },
  {
    key: "id",
    label: "",
    render: () => (
      <span className="text-xs text-teal-600 dark:text-teal-400 flex items-center gap-0.5 hover:underline">
        View <ChevronRight className="w-3 h-3" />
      </span>
    ),
  },
];

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SuppliersPage() {
  const { data: suppliers, isLoading } = useSuppliers();
  const [addOpen, setAddOpen] = useState(false);
  const [deliveryOpen, setDeliveryOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null,
  );

  const totalPending =
    suppliers?.reduce((s, sup) => s + sup.pendingAmount, 0) ?? 0;
  const avgRating =
    suppliers && suppliers.length > 0
      ? suppliers.reduce((s, sup) => s + sup.rating, 0) / suppliers.length
      : 0;
  const totalOrders =
    suppliers?.reduce((s, sup) => s + sup.totalOrders, 0) ?? 0;
  const activeDeliveries = Object.values(DELIVERY_HISTORY)
    .flat()
    .filter((d) => d.status === "Pending" || d.status === "InTransit").length;

  return (
    <div data-ocid="suppliers-page">
      <PageHeader
        title="Suppliers"
        subtitle="Supplier directory and procurement overview"
        action={
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="rounded-none gap-1.5"
              onClick={() => setDeliveryOpen(true)}
              data-ocid="schedule-delivery-btn"
            >
              <Truck className="w-4 h-4" /> Schedule Delivery
            </Button>
            <Button
              size="sm"
              className="rounded-none gap-1.5 bg-teal-600 hover:bg-teal-700 text-white"
              onClick={() => setAddOpen(true)}
              data-ocid="new-supplier-btn"
            >
              <PlusCircle className="w-4 h-4" /> Add Supplier
            </Button>
          </div>
        }
        data-ocid="suppliers-header"
      />

      <div className="section-grid mb-5">
        <StatCard
          label="Total Suppliers"
          value={suppliers?.length ?? 0}
          accent="teal"
          icon={<Truck className="w-4 h-4" />}
          data-ocid="stat-suppliers"
        />
        <StatCard
          label="Total Orders"
          value={totalOrders}
          accent="neutral"
          data-ocid="stat-orders"
        />
        <StatCard
          label="Active Deliveries"
          value={activeDeliveries}
          accent={activeDeliveries > 0 ? "teal" : "neutral"}
          data-ocid="stat-active-deliveries"
        />
        <StatCard
          label="Pending Payments"
          value={fmt(totalPending)}
          accent={totalPending > 50000 ? "orange" : "neutral"}
          data-ocid="stat-pending-payments"
        />
      </div>

      {/* Average rating summary bar */}
      <div className="mb-4 flex items-center gap-4 bg-card border border-border px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span className="text-xs font-medium text-foreground">
            Average Rating
          </span>
          <span className="font-mono text-sm font-semibold text-foreground ml-1">
            {avgRating.toFixed(1)}
          </span>
          <span className="text-xs text-muted-foreground">/ 5.0</span>
        </div>
        <div className="h-1.5 flex-1 bg-muted overflow-hidden max-w-32">
          <div
            className="h-full bg-amber-500"
            style={{ width: `${(avgRating / 5) * 100}%` }}
          />
        </div>
        {totalPending > 0 && (
          <>
            <Separator orientation="vertical" className="h-4" />
            <span className="text-xs text-muted-foreground">
              Outstanding payments:{" "}
              <span className="font-mono font-semibold text-orange-600 dark:text-orange-400">
                {fmt(totalPending)}
              </span>
            </span>
          </>
        )}
      </div>

      {!isLoading && suppliers?.length === 0 ? (
        <EmptyState
          title="No suppliers found"
          description="Add your first supplier to manage procurement and deliveries."
          variant="default"
          data-ocid="suppliers-empty"
        />
      ) : (
        <DataTable<Supplier>
          columns={COLUMNS}
          data={suppliers ?? []}
          isLoading={isLoading}
          rowKey={(r) => r.id}
          searchable
          searchKeys={["name", "contact"]}
          onRowClick={(r) => setSelectedSupplier(r)}
          data-ocid="suppliers-table"
        />
      )}

      {/* Dialogs */}
      <AddSupplierDialog open={addOpen} onClose={() => setAddOpen(false)} />
      <AddDeliveryDialog
        open={deliveryOpen}
        onClose={() => setDeliveryOpen(false)}
      />
      {selectedSupplier && (
        <SupplierDetailPanel
          supplier={selectedSupplier}
          onClose={() => setSelectedSupplier(null)}
        />
      )}
    </div>
  );
}
