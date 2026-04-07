import Time "mo:core/Time";
import List "mo:core/List";
import Common "../types/common";
import SupplierTypes "../types/suppliers";
import SupplierLib "../lib/suppliers";

mixin (
  suppliers : List.List<SupplierTypes.Supplier>,
  deliveries : List.List<SupplierTypes.Delivery>,
) {
  var nextSupplierId : Nat = 0;
  var nextDeliveryId : Nat = 0;

  public shared ({ caller }) func createSupplier(payload : SupplierTypes.CreateSupplierPayload) : async SupplierTypes.SupplierPublic {
    let now = Time.now();
    let result = SupplierLib.createSupplier(suppliers, nextSupplierId, caller, payload, now);
    nextSupplierId += 1;
    result;
  };

  public shared query ({ caller }) func getSupplier(supplierId : Common.SupplierId) : async ?SupplierTypes.SupplierPublic {
    SupplierLib.getSupplier(suppliers, supplierId);
  };

  public shared query ({ caller }) func listSuppliers() : async [SupplierTypes.SupplierPublic] {
    SupplierLib.listSuppliers(suppliers);
  };

  public shared ({ caller }) func createDelivery(payload : SupplierTypes.CreateDeliveryPayload) : async SupplierTypes.DeliveryPublic {
    let now = Time.now();
    let result = SupplierLib.createDelivery(deliveries, nextDeliveryId, caller, payload, now);
    nextDeliveryId += 1;
    result;
  };

  public shared ({ caller }) func updateDeliveryStatus(
    deliveryId : Nat,
    status : SupplierTypes.DeliveryStatus,
    actualDate : ?Common.Timestamp,
  ) : async SupplierTypes.DeliveryPublic {
    let now = Time.now();
    SupplierLib.updateDeliveryStatus(deliveries, deliveryId, status, actualDate, now);
  };

  public shared query ({ caller }) func listDeliveries(
    supplierId : ?Common.SupplierId,
    projectId : ?Common.ProjectId,
    status : ?SupplierTypes.DeliveryStatus,
  ) : async [SupplierTypes.DeliveryPublic] {
    SupplierLib.listDeliveries(deliveries, supplierId, projectId, status);
  };
};
