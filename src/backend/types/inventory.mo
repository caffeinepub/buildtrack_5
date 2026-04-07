import Common "common";

module {
  public type MaterialCategory = {
    #Cement;
    #Steel;
    #Bricks;
    #Sand;
    #Aggregate;
    #Wood;
    #Paint;
    #Electrical;
    #Plumbing;
    #Other;
  };

  public type TransactionType = { #Inflow; #Outflow };

  public type Material = {
    id : Common.MaterialId;
    var name : Text;
    var category : MaterialCategory;
    var unit : Text;
    var reorderThreshold : Float;
    var currentStock : Float;
    projectId : Common.ProjectId;
    createdAt : Common.Timestamp;
    var updatedAt : Common.Timestamp;
  };

  public type MaterialPublic = {
    id : Common.MaterialId;
    name : Text;
    category : MaterialCategory;
    unit : Text;
    reorderThreshold : Float;
    currentStock : Float;
    projectId : Common.ProjectId;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type InventoryTransaction = {
    id : Common.TransactionId;
    materialId : Common.MaterialId;
    projectId : Common.ProjectId;
    phaseId : ?Common.PhaseId;
    transactionType : TransactionType;
    quantity : Float;
    unitCost : Float;
    totalCost : Float;
    supplierId : ?Common.SupplierId;
    invoiceId : ?Common.InvoiceId;
    qrCode : ?Text;
    notes : ?Text;
    recordedBy : Common.UserId;
    transactionDate : Common.Timestamp;
    createdAt : Common.Timestamp;
  };

  public type CreateMaterialPayload = {
    name : Text;
    category : MaterialCategory;
    unit : Text;
    reorderThreshold : Float;
    projectId : Common.ProjectId;
  };

  public type LogInflowPayload = {
    materialId : Common.MaterialId;
    projectId : Common.ProjectId;
    phaseId : ?Common.PhaseId;
    quantity : Float;
    unitCost : Float;
    supplierId : ?Common.SupplierId;
    qrCode : ?Text;
    notes : ?Text;
    transactionDate : Common.Timestamp;
  };

  public type LogOutflowPayload = {
    materialId : Common.MaterialId;
    projectId : Common.ProjectId;
    phaseId : ?Common.PhaseId;
    quantity : Float;
    unitCost : Float;
    qrCode : ?Text;
    notes : ?Text;
    transactionDate : Common.Timestamp;
  };

  public type InventoryBalance = {
    materialId : Common.MaterialId;
    materialName : Text;
    category : MaterialCategory;
    unit : Text;
    currentStock : Float;
    reorderThreshold : Float;
    isBelowThreshold : Bool;
    projectId : Common.ProjectId;
  };
};
