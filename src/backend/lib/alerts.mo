import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Common "../types/common";
import AlertTypes "../types/alerts";
import InventoryTypes "../types/inventory";
import FinanceTypes "../types/finance";

module {
  public func toPublic(alert : AlertTypes.Alert) : AlertTypes.AlertPublic {
    {
      id = alert.id;
      alertType = alert.alertType;
      severity = alert.severity;
      projectId = alert.projectId;
      relatedEntityId = alert.relatedEntityId;
      message = alert.message;
      isAcknowledged = alert.isAcknowledged;
      acknowledgedBy = alert.acknowledgedBy;
      acknowledgedAt = alert.acknowledgedAt;
      createdAt = alert.createdAt;
    };
  };

  public func checkInventoryAlerts(
    alerts : List.List<AlertTypes.Alert>,
    materials : List.List<InventoryTypes.Material>,
    nextId : Nat,
    now : Common.Timestamp,
  ) : Nat {
    var count = 0;
    var currentId = nextId;
    materials.forEach(func(m : InventoryTypes.Material) {
      if (m.currentStock <= m.reorderThreshold) {
        // Check if there's already an unacknowledged alert for this material
        let existing = alerts.find(func(a : AlertTypes.Alert) : Bool {
          switch (a.alertType) {
            case (#LowInventory) {
              a.relatedEntityId == m.id and not a.isAcknowledged
            };
            case _ { false };
          }
        });
        switch (existing) {
          case null {
            let alert : AlertTypes.Alert = {
              id = currentId;
              alertType = #LowInventory;
              severity = if (m.currentStock == 0.0) { #Critical } else { #Warning };
              projectId = m.projectId;
              relatedEntityId = m.id;
              message = "Low inventory: " # m.name # " has " # debug_show(m.currentStock) # " " # m.unit # " remaining (threshold: " # debug_show(m.reorderThreshold) # ")";
              var isAcknowledged = false;
              var acknowledgedBy = null;
              var acknowledgedAt = null;
              createdAt = now;
            };
            alerts.add(alert);
            currentId += 1;
            count += 1;
          };
          case _ {};
        };
      };
    });
    count;
  };

  public func checkBudgetAlerts(
    alerts : List.List<AlertTypes.Alert>,
    budgets : List.List<FinanceTypes.Budget>,
    nextId : Nat,
    now : Common.Timestamp,
  ) : Nat {
    var count = 0;
    var currentId = nextId;
    budgets.forEach(func(b : FinanceTypes.Budget) {
      if (b.spentAmount > b.allocatedAmount) {
        let existing = alerts.find(func(a : AlertTypes.Alert) : Bool {
          switch (a.alertType) {
            case (#BudgetOverrun) {
              a.relatedEntityId == b.id and not a.isAcknowledged
            };
            case _ { false };
          }
        });
        switch (existing) {
          case null {
            let overrunPct = if (b.allocatedAmount == 0.0) { 100.0 } else {
              ((b.spentAmount - b.allocatedAmount) / b.allocatedAmount) * 100.0
            };
            let alert : AlertTypes.Alert = {
              id = currentId;
              alertType = #BudgetOverrun;
              severity = if (overrunPct > 20.0) { #Critical } else { #Warning };
              projectId = b.projectId;
              relatedEntityId = b.id;
              message = "Budget overrun: spent " # debug_show(b.spentAmount) # " of allocated " # debug_show(b.allocatedAmount) # " (" # debug_show(overrunPct) # "% over)";
              var isAcknowledged = false;
              var acknowledgedBy = null;
              var acknowledgedAt = null;
              createdAt = now;
            };
            alerts.add(alert);
            currentId += 1;
            count += 1;
          };
          case _ {};
        };
      };
    });
    count;
  };

  public func acknowledgeAlert(
    alerts : List.List<AlertTypes.Alert>,
    alertId : Common.AlertId,
    caller : Common.UserId,
    now : Common.Timestamp,
  ) : AlertTypes.AlertPublic {
    let alert = switch (alerts.find(func(a : AlertTypes.Alert) : Bool { a.id == alertId })) {
      case (?a) { a };
      case null { Runtime.trap("Alert not found") };
    };
    alert.isAcknowledged := true;
    alert.acknowledgedBy := ?caller;
    alert.acknowledgedAt := ?now;
    toPublic(alert);
  };

  public func listAlerts(
    alerts : List.List<AlertTypes.Alert>,
    projectId : ?Common.ProjectId,
    onlyUnacknowledged : Bool,
  ) : [AlertTypes.AlertPublic] {
    let filtered = alerts.filter(func(a : AlertTypes.Alert) : Bool {
      let matchProject = switch (projectId) {
        case null { true };
        case (?pid) { a.projectId == pid };
      };
      let matchAck = if (onlyUnacknowledged) { not a.isAcknowledged } else { true };
      matchProject and matchAck
    });
    filtered.map<AlertTypes.Alert, AlertTypes.AlertPublic>(toPublic).toArray();
  };
};
