import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Common "../types/common";
import InventoryTypes "../types/inventory";

module {
  public func toPublic(material : InventoryTypes.Material) : InventoryTypes.MaterialPublic {
    {
      id = material.id;
      name = material.name;
      category = material.category;
      unit = material.unit;
      reorderThreshold = material.reorderThreshold;
      currentStock = material.currentStock;
      projectId = material.projectId;
      createdAt = material.createdAt;
      updatedAt = material.updatedAt;
    };
  };

  public func createMaterial(
    materials : List.List<InventoryTypes.Material>,
    nextId : Nat,
    _caller : Common.UserId,
    payload : InventoryTypes.CreateMaterialPayload,
    now : Common.Timestamp,
  ) : InventoryTypes.MaterialPublic {
    let material : InventoryTypes.Material = {
      id = nextId;
      var name = payload.name;
      var category = payload.category;
      var unit = payload.unit;
      var reorderThreshold = payload.reorderThreshold;
      var currentStock = 0.0;
      projectId = payload.projectId;
      createdAt = now;
      var updatedAt = now;
    };
    materials.add(material);
    toPublic(material);
  };

  public func logInflow(
    materials : List.List<InventoryTypes.Material>,
    transactions : List.List<InventoryTypes.InventoryTransaction>,
    nextTxId : Nat,
    caller : Common.UserId,
    payload : InventoryTypes.LogInflowPayload,
    now : Common.Timestamp,
  ) : InventoryTypes.InventoryTransaction {
    let material = switch (materials.find(func(m : InventoryTypes.Material) : Bool { m.id == payload.materialId })) {
      case (?m) { m };
      case null { Runtime.trap("Material not found") };
    };
    let totalCost = payload.quantity * payload.unitCost;
    material.currentStock := material.currentStock + payload.quantity;
    material.updatedAt := now;
    let tx : InventoryTypes.InventoryTransaction = {
      id = nextTxId;
      materialId = payload.materialId;
      projectId = payload.projectId;
      phaseId = payload.phaseId;
      transactionType = #Inflow;
      quantity = payload.quantity;
      unitCost = payload.unitCost;
      totalCost = totalCost;
      supplierId = payload.supplierId;
      invoiceId = null;
      qrCode = payload.qrCode;
      notes = payload.notes;
      recordedBy = caller;
      transactionDate = payload.transactionDate;
      createdAt = now;
    };
    transactions.add(tx);
    tx;
  };

  public func logOutflow(
    materials : List.List<InventoryTypes.Material>,
    transactions : List.List<InventoryTypes.InventoryTransaction>,
    nextTxId : Nat,
    caller : Common.UserId,
    payload : InventoryTypes.LogOutflowPayload,
    now : Common.Timestamp,
  ) : InventoryTypes.InventoryTransaction {
    let material = switch (materials.find(func(m : InventoryTypes.Material) : Bool { m.id == payload.materialId })) {
      case (?m) { m };
      case null { Runtime.trap("Material not found") };
    };
    if (material.currentStock < payload.quantity) {
      Runtime.trap("Insufficient stock");
    };
    let totalCost = payload.quantity * payload.unitCost;
    material.currentStock := material.currentStock - payload.quantity;
    material.updatedAt := now;
    let tx : InventoryTypes.InventoryTransaction = {
      id = nextTxId;
      materialId = payload.materialId;
      projectId = payload.projectId;
      phaseId = payload.phaseId;
      transactionType = #Outflow;
      quantity = payload.quantity;
      unitCost = payload.unitCost;
      totalCost = totalCost;
      supplierId = null;
      invoiceId = null;
      qrCode = payload.qrCode;
      notes = payload.notes;
      recordedBy = caller;
      transactionDate = payload.transactionDate;
      createdAt = now;
    };
    transactions.add(tx);
    tx;
  };

  public func getInventoryBalance(
    materials : List.List<InventoryTypes.Material>,
    projectId : Common.ProjectId,
  ) : [InventoryTypes.InventoryBalance] {
    materials.filter(func(m : InventoryTypes.Material) : Bool { m.projectId == projectId })
      .map<InventoryTypes.Material, InventoryTypes.InventoryBalance>(func(m) {
        {
          materialId = m.id;
          materialName = m.name;
          category = m.category;
          unit = m.unit;
          currentStock = m.currentStock;
          reorderThreshold = m.reorderThreshold;
          isBelowThreshold = m.currentStock <= m.reorderThreshold;
          projectId = m.projectId;
        };
      })
      .toArray();
  };

  public func listMaterials(
    materials : List.List<InventoryTypes.Material>,
    projectId : ?Common.ProjectId,
  ) : [InventoryTypes.MaterialPublic] {
    let filtered = switch (projectId) {
      case null { materials };
      case (?pid) { materials.filter(func(m : InventoryTypes.Material) : Bool { m.projectId == pid }) };
    };
    filtered.map<InventoryTypes.Material, InventoryTypes.MaterialPublic>(toPublic).toArray();
  };

  public func listTransactions(
    transactions : List.List<InventoryTypes.InventoryTransaction>,
    projectId : ?Common.ProjectId,
    materialId : ?Common.MaterialId,
    txType : ?InventoryTypes.TransactionType,
  ) : [InventoryTypes.InventoryTransaction] {
    transactions.filter(func(t : InventoryTypes.InventoryTransaction) : Bool {
      let matchProject = switch (projectId) {
        case null { true };
        case (?pid) { t.projectId == pid };
      };
      let matchMaterial = switch (materialId) {
        case null { true };
        case (?mid) { t.materialId == mid };
      };
      let matchType = switch (txType) {
        case null { true };
        case (?tt) {
          switch (t.transactionType, tt) {
            case (#Inflow, #Inflow) { true };
            case (#Outflow, #Outflow) { true };
            case _ { false };
          };
        };
      };
      matchProject and matchMaterial and matchType
    }).toArray();
  };

  public func getMaterialByQrCode(
    _materials : List.List<InventoryTypes.Material>,
    transactions : List.List<InventoryTypes.InventoryTransaction>,
    qrCode : Text,
  ) : ?InventoryTypes.InventoryTransaction {
    transactions.find(func(t : InventoryTypes.InventoryTransaction) : Bool {
      switch (t.qrCode) {
        case (?qr) { qr == qrCode };
        case null { false };
      }
    });
  };
};
