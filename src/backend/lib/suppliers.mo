import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Common "../types/common";
import SupplierTypes "../types/suppliers";

module {
  public func supplierToPublic(supplier : SupplierTypes.Supplier) : SupplierTypes.SupplierPublic {
    {
      id = supplier.id;
      name = supplier.name;
      contactPerson = supplier.contactPerson;
      phone = supplier.phone;
      email = supplier.email;
      address = supplier.address;
      materialCategories = supplier.materialCategories;
      isActive = supplier.isActive;
      createdAt = supplier.createdAt;
      updatedAt = supplier.updatedAt;
    };
  };

  public func deliveryToPublic(delivery : SupplierTypes.Delivery) : SupplierTypes.DeliveryPublic {
    {
      id = delivery.id;
      supplierId = delivery.supplierId;
      projectId = delivery.projectId;
      status = delivery.status;
      expectedDate = delivery.expectedDate;
      actualDate = delivery.actualDate;
      notes = delivery.notes;
      createdAt = delivery.createdAt;
      updatedAt = delivery.updatedAt;
    };
  };

  public func createSupplier(
    suppliers : List.List<SupplierTypes.Supplier>,
    nextId : Nat,
    caller : Common.UserId,
    payload : SupplierTypes.CreateSupplierPayload,
    now : Common.Timestamp,
  ) : SupplierTypes.SupplierPublic {
    let supplier : SupplierTypes.Supplier = {
      id = nextId;
      var name = payload.name;
      var contactPerson = payload.contactPerson;
      var phone = payload.phone;
      var email = payload.email;
      var address = payload.address;
      var materialCategories = payload.materialCategories;
      var isActive = true;
      createdAt = now;
      var updatedAt = now;
    };
    suppliers.add(supplier);
    supplierToPublic(supplier);
  };

  public func getSupplier(
    suppliers : List.List<SupplierTypes.Supplier>,
    supplierId : Common.SupplierId,
  ) : ?SupplierTypes.SupplierPublic {
    switch (suppliers.find(func(s : SupplierTypes.Supplier) : Bool { s.id == supplierId })) {
      case (?s) { ?supplierToPublic(s) };
      case null { null };
    };
  };

  public func listSuppliers(
    suppliers : List.List<SupplierTypes.Supplier>,
  ) : [SupplierTypes.SupplierPublic] {
    suppliers.map<SupplierTypes.Supplier, SupplierTypes.SupplierPublic>(supplierToPublic).toArray();
  };

  public func createDelivery(
    deliveries : List.List<SupplierTypes.Delivery>,
    nextId : Nat,
    caller : Common.UserId,
    payload : SupplierTypes.CreateDeliveryPayload,
    now : Common.Timestamp,
  ) : SupplierTypes.DeliveryPublic {
    let delivery : SupplierTypes.Delivery = {
      id = nextId;
      supplierId = payload.supplierId;
      projectId = payload.projectId;
      var status = #Pending;
      var expectedDate = payload.expectedDate;
      var actualDate = null;
      var notes = payload.notes;
      createdAt = now;
      var updatedAt = now;
    };
    deliveries.add(delivery);
    deliveryToPublic(delivery);
  };

  public func updateDeliveryStatus(
    deliveries : List.List<SupplierTypes.Delivery>,
    deliveryId : Nat,
    status : SupplierTypes.DeliveryStatus,
    actualDate : ?Common.Timestamp,
    now : Common.Timestamp,
  ) : SupplierTypes.DeliveryPublic {
    let delivery = switch (deliveries.find(func(d : SupplierTypes.Delivery) : Bool { d.id == deliveryId })) {
      case (?d) { d };
      case null { Runtime.trap("Delivery not found") };
    };
    delivery.status := status;
    switch (actualDate) {
      case (?d) { delivery.actualDate := ?d };
      case null {};
    };
    delivery.updatedAt := now;
    deliveryToPublic(delivery);
  };

  public func listDeliveries(
    deliveries : List.List<SupplierTypes.Delivery>,
    supplierId : ?Common.SupplierId,
    projectId : ?Common.ProjectId,
    status : ?SupplierTypes.DeliveryStatus,
  ) : [SupplierTypes.DeliveryPublic] {
    deliveries.filter(func(d : SupplierTypes.Delivery) : Bool {
      let matchSupplier = switch (supplierId) {
        case null { true };
        case (?sid) { d.supplierId == sid };
      };
      let matchProject = switch (projectId) {
        case null { true };
        case (?pid) { d.projectId == pid };
      };
      let matchStatus = switch (status) {
        case null { true };
        case (?s) {
          switch (d.status, s) {
            case (#Pending, #Pending) { true };
            case (#InTransit, #InTransit) { true };
            case (#Delivered, #Delivered) { true };
            case (#Cancelled, #Cancelled) { true };
            case _ { false };
          };
        };
      };
      matchSupplier and matchProject and matchStatus
    })
    .map<SupplierTypes.Delivery, SupplierTypes.DeliveryPublic>(deliveryToPublic)
    .toArray();
  };
};
