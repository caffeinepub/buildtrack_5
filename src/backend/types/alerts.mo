import Common "common";

module {
  public type AlertType = {
    #LowInventory;
    #BudgetOverrun;
    #PendingInvoice;
  };

  public type AlertSeverity = { #Info; #Warning; #Critical };

  public type Alert = {
    id : Common.AlertId;
    alertType : AlertType;
    severity : AlertSeverity;
    projectId : Common.ProjectId;
    relatedEntityId : Nat;
    message : Text;
    var isAcknowledged : Bool;
    var acknowledgedBy : ?Common.UserId;
    var acknowledgedAt : ?Common.Timestamp;
    createdAt : Common.Timestamp;
  };

  public type AlertPublic = {
    id : Common.AlertId;
    alertType : AlertType;
    severity : AlertSeverity;
    projectId : Common.ProjectId;
    relatedEntityId : Nat;
    message : Text;
    isAcknowledged : Bool;
    acknowledgedBy : ?Common.UserId;
    acknowledgedAt : ?Common.Timestamp;
    createdAt : Common.Timestamp;
  };
};
