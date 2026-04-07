import Array "mo:core/Array";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Common "../types/common";
import InvoiceTypes "../types/invoices";
import InventoryTypes "../types/inventory";

module {
  public func toPublic(invoice : InvoiceTypes.Invoice) : InvoiceTypes.InvoicePublic {
    {
      id = invoice.id;
      projectId = invoice.projectId;
      supplierId = invoice.supplierId;
      invoiceType = invoice.invoiceType;
      status = invoice.status;
      lineItems = invoice.lineItems;
      totalAmount = invoice.totalAmount;
      notes = invoice.notes;
      dueDate = invoice.dueDate;
      paidAt = invoice.paidAt;
      createdBy = invoice.createdBy;
      createdAt = invoice.createdAt;
      updatedAt = invoice.updatedAt;
    };
  };

  public func createInvoice(
    invoices : List.List<InvoiceTypes.Invoice>,
    nextId : Nat,
    caller : Common.UserId,
    payload : InvoiceTypes.CreateInvoicePayload,
    now : Common.Timestamp,
  ) : InvoiceTypes.InvoicePublic {
    let totalAmount = payload.lineItems.foldLeft(
      0.0,
      func(acc, item) { acc + item.totalCost }
    );
    let invoice : InvoiceTypes.Invoice = {
      id = nextId;
      projectId = payload.projectId;
      supplierId = payload.supplierId;
      invoiceType = #Manual;
      var status = #Draft;
      var lineItems = payload.lineItems;
      var totalAmount = totalAmount;
      var notes = payload.notes;
      var dueDate = payload.dueDate;
      var paidAt = null;
      createdBy = caller;
      createdAt = now;
      var updatedAt = now;
    };
    invoices.add(invoice);
    toPublic(invoice);
  };

  public func autoGenerateFromInflow(
    invoices : List.List<InvoiceTypes.Invoice>,
    nextId : Nat,
    caller : Common.UserId,
    transaction : InventoryTypes.InventoryTransaction,
    now : Common.Timestamp,
  ) : InvoiceTypes.InvoicePublic {
    let lineItem : InvoiceTypes.InvoiceLineItem = {
      description = "Material inflow transaction #" # debug_show(transaction.id);
      quantity = transaction.quantity;
      unitCost = transaction.unitCost;
      totalCost = transaction.totalCost;
      materialId = ?transaction.materialId;
    };
    let invoice : InvoiceTypes.Invoice = {
      id = nextId;
      projectId = transaction.projectId;
      supplierId = transaction.supplierId;
      invoiceType = #SupplierDelivery;
      var status = #Pending;
      var lineItems = [lineItem];
      var totalAmount = transaction.totalCost;
      var notes = null;
      var dueDate = null;
      var paidAt = null;
      createdBy = caller;
      createdAt = now;
      var updatedAt = now;
    };
    invoices.add(invoice);
    toPublic(invoice);
  };

  public func updateInvoiceStatus(
    invoices : List.List<InvoiceTypes.Invoice>,
    payload : InvoiceTypes.UpdateInvoiceStatusPayload,
    now : Common.Timestamp,
  ) : InvoiceTypes.InvoicePublic {
    let invoice = switch (invoices.find(func(inv : InvoiceTypes.Invoice) : Bool { inv.id == payload.invoiceId })) {
      case (?inv) { inv };
      case null { Runtime.trap("Invoice not found") };
    };
    invoice.status := payload.status;
    switch (payload.status) {
      case (#Paid) { invoice.paidAt := ?now };
      case _ {};
    };
    invoice.updatedAt := now;
    toPublic(invoice);
  };

  public func getInvoice(
    invoices : List.List<InvoiceTypes.Invoice>,
    invoiceId : Common.InvoiceId,
  ) : ?InvoiceTypes.InvoicePublic {
    switch (invoices.find(func(inv : InvoiceTypes.Invoice) : Bool { inv.id == invoiceId })) {
      case (?inv) { ?toPublic(inv) };
      case null { null };
    };
  };

  public func listInvoices(
    invoices : List.List<InvoiceTypes.Invoice>,
    projectId : ?Common.ProjectId,
    supplierId : ?Common.SupplierId,
    status : ?InvoiceTypes.InvoiceStatus,
  ) : [InvoiceTypes.InvoicePublic] {
    invoices.filter(func(inv : InvoiceTypes.Invoice) : Bool {
      let matchProject = switch (projectId) {
        case null { true };
        case (?pid) { inv.projectId == pid };
      };
      let matchSupplier = switch (supplierId) {
        case null { true };
        case (?sid) {
          switch (inv.supplierId) {
            case (?s) { s == sid };
            case null { false };
          };
        };
      };
      let matchStatus = switch (status) {
        case null { true };
        case (?st) { invoiceStatusEqual(inv.status, st) };
      };
      matchProject and matchSupplier and matchStatus
    })
    .map<InvoiceTypes.Invoice, InvoiceTypes.InvoicePublic>(toPublic)
    .toArray();
  };

  public func getPendingInvoices(
    invoices : List.List<InvoiceTypes.Invoice>,
    projectId : ?Common.ProjectId,
  ) : [InvoiceTypes.InvoicePublic] {
    invoices.filter(func(inv : InvoiceTypes.Invoice) : Bool {
      let matchProject = switch (projectId) {
        case null { true };
        case (?pid) { inv.projectId == pid };
      };
      let isPending = switch (inv.status) { case (#Pending) { true }; case _ { false } };
      matchProject and isPending
    })
    .map<InvoiceTypes.Invoice, InvoiceTypes.InvoicePublic>(toPublic)
    .toArray();
  };

  func invoiceStatusEqual(a : InvoiceTypes.InvoiceStatus, b : InvoiceTypes.InvoiceStatus) : Bool {
    switch (a, b) {
      case (#Draft, #Draft) { true };
      case (#Pending, #Pending) { true };
      case (#Paid, #Paid) { true };
      case (#Cancelled, #Cancelled) { true };
      case _ { false };
    };
  };
};
