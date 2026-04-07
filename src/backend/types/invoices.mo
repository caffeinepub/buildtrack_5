import Common "common";

module {
  public type InvoiceStatus = { #Draft; #Pending; #Paid; #Cancelled };

  public type InvoiceType = { #SupplierDelivery; #Manual };

  public type InvoiceLineItem = {
    description : Text;
    quantity : Float;
    unitCost : Float;
    totalCost : Float;
    materialId : ?Common.MaterialId;
  };

  public type Invoice = {
    id : Common.InvoiceId;
    projectId : Common.ProjectId;
    supplierId : ?Common.SupplierId;
    invoiceType : InvoiceType;
    var status : InvoiceStatus;
    var lineItems : [InvoiceLineItem];
    var totalAmount : Float;
    var notes : ?Text;
    var dueDate : ?Common.Timestamp;
    var paidAt : ?Common.Timestamp;
    createdBy : Common.UserId;
    createdAt : Common.Timestamp;
    var updatedAt : Common.Timestamp;
  };

  public type InvoicePublic = {
    id : Common.InvoiceId;
    projectId : Common.ProjectId;
    supplierId : ?Common.SupplierId;
    invoiceType : InvoiceType;
    status : InvoiceStatus;
    lineItems : [InvoiceLineItem];
    totalAmount : Float;
    notes : ?Text;
    dueDate : ?Common.Timestamp;
    paidAt : ?Common.Timestamp;
    createdBy : Common.UserId;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type CreateInvoicePayload = {
    projectId : Common.ProjectId;
    supplierId : ?Common.SupplierId;
    lineItems : [InvoiceLineItem];
    notes : ?Text;
    dueDate : ?Common.Timestamp;
  };

  public type UpdateInvoiceStatusPayload = {
    invoiceId : Common.InvoiceId;
    status : InvoiceStatus;
  };
};
