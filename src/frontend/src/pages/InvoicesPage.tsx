import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle,
  ArrowLeft,
  Ban,
  CheckCircle2,
  Clock,
  FileText,
  Pencil,
  Plus,
  Printer,
  Receipt,
  Trash2,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { ConfirmDialog } from "../components/shared/ConfirmDialog";
import { DataTable } from "../components/shared/DataTable";
import { EmptyState } from "../components/shared/EmptyState";
import { PageHeader } from "../components/shared/PageHeader";
import { StatCard } from "../components/shared/StatCard";
import { StatusBadge } from "../components/shared/StatusBadge";
import {
  useCreateInvoice,
  useInvoices,
  useProjects,
  useSuppliers,
  useUpdateInvoiceStatus,
} from "../hooks/useBackend";
import type { Column, Invoice, InvoiceStatus } from "../types";

// ─── Types ────────────────────────────────────────────────────────────────────

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

type View = "list" | "create" | "detail";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

function fmtDec(n: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

const STATUS_FILTERS: (InvoiceStatus | "All")[] = [
  "All",
  "Draft",
  "Pending",
  "Approved",
  "Paid",
  "Overdue",
  "Disputed",
  "Cancelled",
];

const CATEGORY_OPTIONS = ["Material", "Labor", "Equipment", "Service"] as const;

const COLUMNS: Column<Invoice>[] = [
  { key: "invoiceNumber", label: "Invoice #", sortable: true },
  { key: "supplier", label: "Supplier", sortable: true },
  { key: "projectName", label: "Project", sortable: true },
  { key: "category", label: "Category" },
  {
    key: "amount",
    label: "Amount",
    sortable: true,
    align: "right",
    render: (row) => (
      <span className="font-mono font-semibold text-sm">{fmt(row.amount)}</span>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (row) => <StatusBadge status={row.status} />,
  },
  { key: "issueDate", label: "Issued", sortable: true },
  {
    key: "dueDate",
    label: "Due Date",
    sortable: true,
    render: (row) => (
      <span
        className={
          row.status === "Overdue" ? "text-destructive font-medium" : ""
        }
      >
        {row.dueDate}
      </span>
    ),
  },
];

// ─── Status transition map ────────────────────────────────────────────────────

const NEXT_ACTIONS: Partial<
  Record<
    InvoiceStatus,
    {
      label: string;
      next: InvoiceStatus;
      icon: React.ReactNode;
      variant: "teal" | "orange" | "red";
    }[]
  >
> = {
  Draft: [
    {
      label: "Submit for Approval",
      next: "Pending",
      icon: <Clock className="w-3.5 h-3.5" />,
      variant: "teal",
    },
  ],
  Pending: [
    {
      label: "Mark Approved",
      next: "Approved",
      icon: <CheckCircle2 className="w-3.5 h-3.5" />,
      variant: "teal",
    },
    {
      label: "Mark Disputed",
      next: "Disputed",
      icon: <AlertTriangle className="w-3.5 h-3.5" />,
      variant: "orange",
    },
  ],
  Approved: [
    {
      label: "Mark as Paid",
      next: "Paid",
      icon: <CheckCircle2 className="w-3.5 h-3.5" />,
      variant: "teal",
    },
  ],
  Overdue: [
    {
      label: "Mark as Paid",
      next: "Paid",
      icon: <CheckCircle2 className="w-3.5 h-3.5" />,
      variant: "teal",
    },
    {
      label: "Mark Disputed",
      next: "Disputed",
      icon: <AlertTriangle className="w-3.5 h-3.5" />,
      variant: "orange",
    },
  ],
  Disputed: [
    {
      label: "Re-submit Pending",
      next: "Pending",
      icon: <Clock className="w-3.5 h-3.5" />,
      variant: "teal",
    },
    {
      label: "Cancel Invoice",
      next: "Cancelled",
      icon: <Ban className="w-3.5 h-3.5" />,
      variant: "red",
    },
  ],
};

// ─── Create Invoice Form ──────────────────────────────────────────────────────

interface CreateFormProps {
  open: boolean;
  onClose: () => void;
}

function CreateInvoiceSheet({ open, onClose }: CreateFormProps) {
  const { data: projects } = useProjects();
  const { data: suppliers } = useSuppliers();
  const createInvoice = useCreateInvoice();

  const [projectId, setProjectId] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [category, setCategory] =
    useState<(typeof CATEGORY_OPTIONS)[number]>("Material");
  const [notes, setNotes] = useState("");
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: "li1", description: "", quantity: 1, unitPrice: 0 },
  ]);

  const total = lineItems.reduce((s, li) => s + li.quantity * li.unitPrice, 0);
  const selectedProject = projects?.find((p) => p.id === projectId);
  const selectedSupplier = suppliers?.find((s) => s.id === supplierId);

  function addLine() {
    setLineItems((prev) => [
      ...prev,
      { id: `li${Date.now()}`, description: "", quantity: 1, unitPrice: 0 },
    ]);
  }

  function removeLine(id: string) {
    setLineItems((prev) => prev.filter((li) => li.id !== id));
  }

  function updateLine(
    id: string,
    field: keyof LineItem,
    value: string | number,
  ) {
    setLineItems((prev) =>
      prev.map((li) => (li.id === id ? { ...li, [field]: value } : li)),
    );
  }

  function handleSubmit() {
    if (!projectId || !selectedProject) return;
    createInvoice.mutate(
      {
        supplier: selectedSupplier?.name ?? "Unknown Supplier",
        projectId,
        projectName: selectedProject.name,
        amount: total,
        status: "Draft",
        description: notes || lineItems.map((li) => li.description).join("; "),
        category,
      },
      {
        onSuccess: () => {
          onClose();
          setProjectId("");
          setSupplierId("");
          setNotes("");
          setLineItems([
            { id: "li1", description: "", quantity: 1, unitPrice: 0 },
          ]);
        },
      },
    );
  }

  const canSubmit =
    projectId &&
    lineItems.some(
      (li) => li.description && li.quantity > 0 && li.unitPrice > 0,
    );

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-2xl rounded-none p-0 flex flex-col"
        data-ocid="create-invoice-sheet"
      >
        <SheetHeader className="px-6 py-4 border-b border-border bg-card shrink-0">
          <SheetTitle className="font-display text-base flex items-center gap-2">
            <Receipt className="w-4 h-4 text-primary" />
            New Invoice
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1">
          <div className="px-6 py-5 space-y-5">
            {/* Project & Supplier */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="inv-project"
                  className="text-xs font-medium uppercase tracking-wide text-muted-foreground"
                >
                  Project *
                </Label>
                <Select value={projectId} onValueChange={setProjectId}>
                  <SelectTrigger
                    id="inv-project"
                    className="rounded-none"
                    data-ocid="inv-project-select"
                  >
                    <SelectValue placeholder="Select project…" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    {projects?.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="inv-supplier"
                  className="text-xs font-medium uppercase tracking-wide text-muted-foreground"
                >
                  Supplier
                </Label>
                <Select value={supplierId} onValueChange={setSupplierId}>
                  <SelectTrigger
                    id="inv-supplier"
                    className="rounded-none"
                    data-ocid="inv-supplier-select"
                  >
                    <SelectValue placeholder="Select supplier…" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    {suppliers?.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Category
              </Label>
              <div className="flex gap-2 flex-wrap">
                {CATEGORY_OPTIONS.map((cat) => (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`text-xs px-3 py-1.5 border font-medium transition-colors ${
                      category === cat
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card border-border text-muted-foreground hover:border-primary/50"
                    }`}
                    data-ocid={`inv-cat-${cat.toLowerCase()}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Line Items */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Line Items
                </Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={addLine}
                  className="h-7 gap-1 text-xs rounded-none text-primary hover:text-primary"
                  data-ocid="add-line-item"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Row
                </Button>
              </div>

              {/* Header row */}
              <div className="grid grid-cols-[1fr_80px_100px_32px] gap-1.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground px-0.5">
                <span>Description</span>
                <span className="text-right">Qty</span>
                <span className="text-right">Unit Price (£)</span>
                <span />
              </div>

              {lineItems.map((li, idx) => (
                <div
                  key={li.id}
                  className="grid grid-cols-[1fr_80px_100px_32px] gap-1.5 items-center"
                >
                  <Input
                    value={li.description}
                    onChange={(e) =>
                      updateLine(li.id, "description", e.target.value)
                    }
                    placeholder={`Item ${idx + 1}`}
                    className="rounded-none h-8 text-sm"
                    data-ocid={`line-desc-${idx}`}
                  />
                  <Input
                    type="number"
                    min={1}
                    value={li.quantity}
                    onChange={(e) =>
                      updateLine(li.id, "quantity", Number(e.target.value))
                    }
                    className="rounded-none h-8 text-sm text-right"
                    data-ocid={`line-qty-${idx}`}
                  />
                  <Input
                    type="number"
                    min={0}
                    step={0.01}
                    value={li.unitPrice}
                    onChange={(e) =>
                      updateLine(li.id, "unitPrice", Number(e.target.value))
                    }
                    className="rounded-none h-8 text-sm text-right font-mono"
                    data-ocid={`line-price-${idx}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeLine(li.id)}
                    disabled={lineItems.length === 1}
                    className="flex items-center justify-center h-8 w-8 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-30"
                    aria-label="Remove line"
                    data-ocid={`line-remove-${idx}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              {/* Subtotal */}
              <div className="flex justify-end pt-2 border-t border-border">
                <div className="text-right space-y-0.5">
                  <div className="text-xs text-muted-foreground">Total</div>
                  <div className="font-display font-bold text-xl text-foreground font-mono">
                    {fmtDec(total)}
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <Label
                htmlFor="inv-notes"
                className="text-xs font-medium uppercase tracking-wide text-muted-foreground"
              >
                Notes
              </Label>
              <Textarea
                id="inv-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Additional notes or payment terms…"
                className="rounded-none text-sm resize-none"
                rows={3}
                data-ocid="inv-notes"
              />
            </div>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border bg-card flex items-center justify-between gap-3 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="rounded-none"
            data-ocid="create-invoice-cancel"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            disabled={!canSubmit || createInvoice.isPending}
            onClick={handleSubmit}
            className="rounded-none gap-1.5 bg-teal-600 hover:bg-teal-700 text-white"
            data-ocid="create-invoice-submit"
          >
            <Receipt className="w-4 h-4" />
            {createInvoice.isPending ? "Creating…" : "Create Invoice"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ─── Invoice Detail View ──────────────────────────────────────────────────────

interface DetailViewProps {
  invoice: Invoice;
  onBack: () => void;
}

function InvoiceDetail({ invoice, onBack }: DetailViewProps) {
  const updateStatus = useUpdateInvoiceStatus();
  const { data: suppliers } = useSuppliers();
  const printRef = useRef<HTMLDivElement>(null);
  const [confirmAction, setConfirmAction] = useState<{
    label: string;
    next: InvoiceStatus;
  } | null>(null);

  const supplier = suppliers?.find((s) => s.name === invoice.supplier);
  const actions = NEXT_ACTIONS[invoice.status] ?? [];

  function handlePrint() {
    if (!printRef.current) return;
    const content = printRef.current.innerHTML;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`<!DOCTYPE html><html><head>
      <title>Invoice ${invoice.invoiceNumber}</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', system-ui, sans-serif; font-size: 13px; color: #111; padding: 40px; }
        h1 { font-size: 22px; font-weight: 800; letter-spacing: -0.02em; }
        h2 { font-size: 14px; font-weight: 700; margin-bottom: 6px; }
        table { width: 100%; border-collapse: collapse; margin-top: 16px; }
        th { text-align: left; padding: 6px 8px; border-bottom: 2px solid #111; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; }
        td { padding: 6px 8px; border-bottom: 1px solid #e5e7eb; vertical-align: top; }
        .text-right { text-align: right; }
        .mono { font-family: 'JetBrains Mono', monospace; }
        .total-row td { font-weight: 700; border-top: 2px solid #111; border-bottom: none; padding-top: 10px; }
        .badge { display: inline-block; padding: 2px 8px; border: 1px solid #ccc; border-radius: 2px; font-size: 11px; }
        .section { margin-bottom: 24px; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px; }
        .label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 2px; }
        .teal-bar { height: 3px; background: #0d9488; margin-bottom: 24px; }
      </style>
    </head><body>${content}</body></html>`);
    win.document.close();
    win.focus();
    win.print();
    win.close();
  }

  return (
    <div data-ocid="invoice-detail">
      <PageHeader
        title={`Invoice ${invoice.invoiceNumber}`}
        breadcrumbs={[
          { label: "Invoices", onClick: onBack },
          { label: invoice.invoiceNumber },
        ]}
        subtitle={`${invoice.supplier} · ${invoice.projectName}`}
        action={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="rounded-none gap-1.5"
              data-ocid="invoice-print-btn"
            >
              <Printer className="w-3.5 h-3.5" /> Print
            </Button>
            {actions.map((action) => (
              <Button
                key={action.next}
                size="sm"
                onClick={() =>
                  setConfirmAction({ label: action.label, next: action.next })
                }
                className={`rounded-none gap-1.5 text-white ${
                  action.variant === "teal"
                    ? "bg-teal-600 hover:bg-teal-700"
                    : action.variant === "orange"
                      ? "bg-orange-500 hover:bg-orange-600"
                      : "bg-destructive hover:bg-destructive/90"
                }`}
                data-ocid={`invoice-action-${action.next.toLowerCase()}`}
              >
                {action.icon}
                {action.label}
              </Button>
            ))}
          </div>
        }
      />

      {/* Printable content */}
      <div ref={printRef} className="space-y-6">
        {/* Print header (hidden in screen, shown in print) */}
        <div className="hidden print:block">
          <div
            style={{
              height: "3px",
              background: "#0d9488",
              marginBottom: "24px",
            }}
          />
          <h1>BuildTrack</h1>
          <p style={{ color: "#6b7280", fontSize: "12px" }}>
            Construction Management Platform
          </p>
        </div>

        {/* Status bar */}
        <div className="flex items-center gap-3 p-3 bg-muted/40 border border-border">
          <StatusBadge status={invoice.status} />
          <span className="text-xs text-muted-foreground">
            Issued {invoice.issueDate} · Due {invoice.dueDate}
            {invoice.paidDate && ` · Paid ${invoice.paidDate}`}
          </span>
        </div>

        {/* Two column: Invoice & Supplier info */}
        <div className="grid grid-cols-2 gap-6">
          <Card className="rounded-none border border-border p-5 space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Invoice Details
            </h2>
            <Separator className="bg-border" />
            <dl className="space-y-2">
              {[
                { label: "Invoice Number", value: invoice.invoiceNumber },
                { label: "Project", value: invoice.projectName },
                { label: "Category", value: invoice.category },
                { label: "Issue Date", value: invoice.issueDate },
                { label: "Due Date", value: invoice.dueDate },
                ...(invoice.paidDate
                  ? [{ label: "Paid Date", value: invoice.paidDate }]
                  : []),
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between gap-2 text-sm">
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd className="font-medium text-foreground text-right">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </Card>

          <Card className="rounded-none border border-border p-5 space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Supplier Details
            </h2>
            <Separator className="bg-border" />
            {supplier ? (
              <dl className="space-y-2">
                {[
                  { label: "Company", value: supplier.name },
                  { label: "Contact", value: supplier.contact },
                  { label: "Email", value: supplier.email },
                  { label: "Phone", value: supplier.phone },
                  {
                    label: "Rating",
                    value: (
                      <span className="flex items-center gap-1">
                        {"★".repeat(Math.floor(supplier.rating))}
                        <span className="text-muted-foreground ml-1">
                          ({supplier.rating})
                        </span>
                      </span>
                    ),
                  },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex justify-between gap-2 text-sm"
                  >
                    <dt className="text-muted-foreground">{label}</dt>
                    <dd className="font-medium text-foreground text-right">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-foreground font-medium">
                  {invoice.supplier}
                </p>
                <p className="text-xs text-muted-foreground">
                  No supplier record found
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* Line items table */}
        <Card className="rounded-none border border-border overflow-hidden">
          <div className="px-5 py-3 border-b border-border bg-muted/30">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Line Items
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="text-left px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Description
                  </th>
                  <th className="text-right px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground w-24">
                    Qty
                  </th>
                  <th className="text-right px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground w-32">
                    Unit Price
                  </th>
                  <th className="text-right px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground w-32">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Derive line items from description; show as single line if no parsed items */}
                <tr className="border-b border-border/50">
                  <td className="px-5 py-3 text-foreground">
                    {invoice.description}
                  </td>
                  <td className="px-5 py-3 text-right text-muted-foreground font-mono">
                    1
                  </td>
                  <td className="px-5 py-3 text-right font-mono">
                    {fmtDec(invoice.amount)}
                  </td>
                  <td className="px-5 py-3 text-right font-mono font-semibold">
                    {fmtDec(invoice.amount)}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-border bg-muted/10">
                  <td
                    colSpan={3}
                    className="px-5 py-3 text-right text-sm font-semibold text-muted-foreground uppercase tracking-wide"
                  >
                    Total
                  </td>
                  <td className="px-5 py-3 text-right font-display font-bold text-lg text-foreground font-mono">
                    {fmtDec(invoice.amount)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Card>

        {/* Status history */}
        <Card className="rounded-none border border-border p-5">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Status Timeline
          </h2>
          <div className="flex items-center gap-3 flex-wrap">
            {(["Draft", "Pending", "Approved", "Paid"] as InvoiceStatus[]).map(
              (s, idx) => {
                const statuses: InvoiceStatus[] = [
                  "Draft",
                  "Pending",
                  "Approved",
                  "Paid",
                  "Overdue",
                  "Disputed",
                ];
                const currentIdx = statuses.indexOf(invoice.status);
                const stepIdx = statuses.indexOf(s);
                const isPast =
                  stepIdx < currentIdx &&
                  invoice.status !== "Overdue" &&
                  invoice.status !== "Disputed";
                const isCurrent = s === invoice.status;
                return (
                  <div key={s} className="flex items-center gap-3">
                    {idx > 0 && (
                      <div
                        className={`h-px w-8 ${isPast ? "bg-teal-500" : "bg-border"}`}
                      />
                    )}
                    <div
                      className={`flex items-center gap-1.5 text-xs font-medium ${isCurrent ? "text-teal-600 dark:text-teal-400" : isPast ? "text-muted-foreground" : "text-muted-foreground/40"}`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${isCurrent ? "bg-teal-500" : isPast ? "bg-teal-500/50" : "bg-border"}`}
                      />
                      {s}
                    </div>
                  </div>
                );
              },
            )}
            {(invoice.status === "Overdue" ||
              invoice.status === "Disputed") && (
              <div className="flex items-center gap-1.5 text-xs font-medium text-orange-600 dark:text-orange-400">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                {invoice.status}
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Confirm dialog */}
      {confirmAction && (
        <ConfirmDialog
          open
          onOpenChange={(v) => !v && setConfirmAction(null)}
          title={confirmAction.label}
          description={`Update invoice ${invoice.invoiceNumber} status to "${confirmAction.next}"?`}
          confirmLabel={confirmAction.label}
          onConfirm={() => {
            updateStatus.mutate({ id: invoice.id, status: confirmAction.next });
            setConfirmAction(null);
          }}
          data-ocid="invoice-status-confirm"
        />
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function InvoicesPage() {
  const { data: invoices, isLoading } = useInvoices();
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | "All">(
    "All",
  );
  const [supplierFilter, setSupplierFilter] = useState<string>("All");
  const [view, setView] = useState<View>("list");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  // Derived stats
  const totalAmount = invoices?.reduce((s, i) => s + i.amount, 0) ?? 0;
  const pendingAmount =
    invoices
      ?.filter((i) => i.status === "Pending" || i.status === "Approved")
      .reduce((s, i) => s + i.amount, 0) ?? 0;
  const paidThisMonth =
    invoices
      ?.filter((i) => {
        if (i.status !== "Paid" || !i.paidDate) return false;
        const d = new Date(i.paidDate);
        const now = new Date();
        return (
          d.getFullYear() === now.getFullYear() &&
          d.getMonth() === now.getMonth()
        );
      })
      .reduce((s, i) => s + i.amount, 0) ?? 0;
  const overdueCount =
    invoices?.filter((i) => i.status === "Overdue").length ?? 0;

  // Filtered
  const filtered =
    invoices?.filter((i) => {
      if (statusFilter !== "All" && i.status !== statusFilter) return false;
      if (supplierFilter !== "All" && i.supplier !== supplierFilter)
        return false;
      return true;
    }) ?? [];

  const uniqueSuppliers = [...new Set(invoices?.map((i) => i.supplier) ?? [])];

  if (view === "detail" && selectedInvoice) {
    return (
      <InvoiceDetail
        invoice={selectedInvoice}
        onBack={() => {
          setView("list");
          setSelectedInvoice(null);
        }}
      />
    );
  }

  return (
    <div data-ocid="invoices-page">
      <PageHeader
        title="Invoices"
        subtitle="Procurement invoices, approvals, and payment tracking"
        action={
          <Button
            size="sm"
            onClick={() => setShowCreate(true)}
            className="rounded-none gap-1.5 bg-teal-600 hover:bg-teal-700 text-white"
            data-ocid="new-invoice-btn"
          >
            <Plus className="w-4 h-4" /> New Invoice
          </Button>
        }
      />

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <StatCard
          label="Total Invoiced"
          value={fmt(totalAmount)}
          icon={<FileText className="w-4 h-4" />}
          accent="neutral"
          data-ocid="stat-total-invoiced"
        />
        <StatCard
          label="Pending Amount"
          value={fmt(pendingAmount)}
          sub={`${invoices?.filter((i) => i.status === "Pending" || i.status === "Approved").length ?? 0} invoices`}
          accent="neutral"
          data-ocid="stat-pending"
        />
        <StatCard
          label="Paid This Month"
          value={fmt(paidThisMonth)}
          accent="teal"
          data-ocid="stat-paid-month"
        />
        <StatCard
          label="Overdue"
          value={overdueCount}
          sub={overdueCount > 0 ? "Requires attention" : "All clear"}
          accent={overdueCount > 0 ? "orange" : "neutral"}
          icon={
            overdueCount > 0 ? <AlertTriangle className="w-4 h-4" /> : undefined
          }
          data-ocid="stat-overdue-count"
        />
      </div>

      {/* Filters */}
      <div
        className="flex flex-wrap items-center gap-3 mb-4"
        data-ocid="invoice-filters"
      >
        {/* Status tabs */}
        <div className="flex flex-wrap gap-1" data-ocid="invoice-filter-bar">
          {STATUS_FILTERS.map((s) => {
            const count =
              s === "All"
                ? invoices?.length
                : invoices?.filter((i) => i.status === s).length;
            return (
              <button
                type="button"
                key={s}
                onClick={() => setStatusFilter(s)}
                data-ocid={`invoice-filter-${s.toLowerCase()}`}
                className={`text-xs px-3 py-1.5 border font-medium transition-colors ${
                  statusFilter === s
                    ? "bg-teal-600 text-white border-teal-600"
                    : "bg-card border-border text-muted-foreground hover:border-teal-500/50"
                }`}
              >
                {s}
                {count !== undefined && (
                  <span className="ml-1 opacity-70">({count})</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Supplier filter */}
        <Select value={supplierFilter} onValueChange={setSupplierFilter}>
          <SelectTrigger
            className="w-48 h-8 rounded-none text-xs"
            data-ocid="invoice-supplier-filter"
          >
            <SelectValue placeholder="All Suppliers" />
          </SelectTrigger>
          <SelectContent className="rounded-none">
            <SelectItem value="All">All Suppliers</SelectItem>
            {uniqueSuppliers.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {(statusFilter !== "All" || supplierFilter !== "All") && (
          <button
            type="button"
            onClick={() => {
              setStatusFilter("All");
              setSupplierFilter("All");
            }}
            className="text-xs flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="invoice-clear-filters"
          >
            <X className="w-3 h-3" /> Clear
          </button>
        )}
      </div>

      {/* Table */}
      {!isLoading && filtered.length === 0 ? (
        <EmptyState
          title="No invoices found"
          description="No invoices match the selected filters."
          variant="invoices"
          action={{
            label: "Clear Filters",
            onClick: () => {
              setStatusFilter("All");
              setSupplierFilter("All");
            },
          }}
          data-ocid="invoices-empty"
        />
      ) : (
        <DataTable<Invoice>
          columns={[
            ...COLUMNS,
            {
              key: "id",
              label: "Actions",
              render: (row) => (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedInvoice(row);
                      setView("detail");
                    }}
                    className="text-xs flex items-center gap-1 text-muted-foreground hover:text-teal-600 transition-colors px-2 py-1 border border-transparent hover:border-teal-500/40"
                    data-ocid={`invoice-view-${row.id}`}
                    aria-label="View invoice"
                  >
                    <Pencil className="w-3 h-3" />
                    View
                  </button>
                </div>
              ),
            },
          ]}
          data={filtered}
          isLoading={isLoading}
          rowKey={(r) => r.id}
          searchable
          searchKeys={["invoiceNumber", "supplier", "projectName"]}
          onRowClick={(row) => {
            setSelectedInvoice(row);
            setView("detail");
          }}
          data-ocid="invoices-table"
        />
      )}

      {/* Create sheet */}
      <CreateInvoiceSheet
        open={showCreate}
        onClose={() => setShowCreate(false)}
      />
    </div>
  );
}
