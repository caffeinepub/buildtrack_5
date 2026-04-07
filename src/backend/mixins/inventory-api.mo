import Time "mo:core/Time";
import List "mo:core/List";
import Common "../types/common";
import InventoryTypes "../types/inventory";
import InventoryLib "../lib/inventory";

mixin (
  materials : List.List<InventoryTypes.Material>,
  transactions : List.List<InventoryTypes.InventoryTransaction>,
) {
  var nextMaterialId : Nat = 0;
  var nextTransactionId : Nat = 0;

  public shared ({ caller }) func createMaterial(payload : InventoryTypes.CreateMaterialPayload) : async InventoryTypes.MaterialPublic {
    let now = Time.now();
    let result = InventoryLib.createMaterial(materials, nextMaterialId, caller, payload, now);
    nextMaterialId += 1;
    result;
  };

  public shared ({ caller }) func logMaterialInflow(payload : InventoryTypes.LogInflowPayload) : async InventoryTypes.InventoryTransaction {
    let now = Time.now();
    let result = InventoryLib.logInflow(materials, transactions, nextTransactionId, caller, payload, now);
    nextTransactionId += 1;
    result;
  };

  public shared ({ caller }) func logMaterialOutflow(payload : InventoryTypes.LogOutflowPayload) : async InventoryTypes.InventoryTransaction {
    let now = Time.now();
    let result = InventoryLib.logOutflow(materials, transactions, nextTransactionId, caller, payload, now);
    nextTransactionId += 1;
    result;
  };

  public shared query ({ caller }) func getInventoryBalance(projectId : Common.ProjectId) : async [InventoryTypes.InventoryBalance] {
    InventoryLib.getInventoryBalance(materials, projectId);
  };

  public shared query ({ caller }) func listMaterials(projectId : ?Common.ProjectId) : async [InventoryTypes.MaterialPublic] {
    InventoryLib.listMaterials(materials, projectId);
  };

  public shared query ({ caller }) func listInventoryTransactions(
    projectId : ?Common.ProjectId,
    materialId : ?Common.MaterialId,
    txType : ?InventoryTypes.TransactionType,
  ) : async [InventoryTypes.InventoryTransaction] {
    InventoryLib.listTransactions(transactions, projectId, materialId, txType);
  };

  public shared query ({ caller }) func getMaterialByQrCode(qrCode : Text) : async ?InventoryTypes.InventoryTransaction {
    InventoryLib.getMaterialByQrCode(materials, transactions, qrCode);
  };
};
