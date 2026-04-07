import Common "common";
import InventoryTypes "inventory";

module {
  public type Supplier = {
    id : Common.SupplierId;
    var name : Text;
    var contactPerson : Text;
    var phone : Text;
    var email : Text;
    var address : Text;
    var materialCategories : [InventoryTypes.MaterialCategory];
    var isActive : Bool;
    createdAt : Common.Timestamp;
    var updatedAt : Common.Timestamp;
  };

  public type SupplierPublic = {
    id : Common.SupplierId;
    name : Text;
    contactPerson : Text;
    phone : Text;
    email : Text;
    address : Text;
    materialCategories : [InventoryTypes.MaterialCategory];
    isActive : Bool;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type DeliveryStatus = { #Pending; #InTransit; #Delivered; #Cancelled };

  public type Delivery = {
    id : Nat;
    supplierId : Common.SupplierId;
    projectId : Common.ProjectId;
    var status : DeliveryStatus;
    var expectedDate : Common.Timestamp;
    var actualDate : ?Common.Timestamp;
    var notes : ?Text;
    createdAt : Common.Timestamp;
    var updatedAt : Common.Timestamp;
  };

  public type DeliveryPublic = {
    id : Nat;
    supplierId : Common.SupplierId;
    projectId : Common.ProjectId;
    status : DeliveryStatus;
    expectedDate : Common.Timestamp;
    actualDate : ?Common.Timestamp;
    notes : ?Text;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type CreateSupplierPayload = {
    name : Text;
    contactPerson : Text;
    phone : Text;
    email : Text;
    address : Text;
    materialCategories : [InventoryTypes.MaterialCategory];
  };

  public type CreateDeliveryPayload = {
    supplierId : Common.SupplierId;
    projectId : Common.ProjectId;
    expectedDate : Common.Timestamp;
    notes : ?Text;
  };
};
