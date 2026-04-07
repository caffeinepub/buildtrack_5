import Time "mo:core/Time";
import List "mo:core/List";
import Common "../types/common";
import AlertTypes "../types/alerts";
import InventoryTypes "../types/inventory";
import FinanceTypes "../types/finance";
import AlertLib "../lib/alerts";

mixin (
  alerts : List.List<AlertTypes.Alert>,
  materials : List.List<InventoryTypes.Material>,
  budgets : List.List<FinanceTypes.Budget>,
) {
  var nextAlertId : Nat = 0;

  public shared ({ caller }) func runAlertChecks() : async Nat {
    let now = Time.now();
    let inventoryCount = AlertLib.checkInventoryAlerts(alerts, materials, nextAlertId, now);
    nextAlertId += inventoryCount;
    let budgetCount = AlertLib.checkBudgetAlerts(alerts, budgets, nextAlertId, now);
    nextAlertId += budgetCount;
    inventoryCount + budgetCount;
  };

  public shared ({ caller }) func acknowledgeAlert(alertId : Common.AlertId) : async AlertTypes.AlertPublic {
    let now = Time.now();
    AlertLib.acknowledgeAlert(alerts, alertId, caller, now);
  };

  public shared query ({ caller }) func listAlerts(
    projectId : ?Common.ProjectId,
    onlyUnacknowledged : Bool,
  ) : async [AlertTypes.AlertPublic] {
    AlertLib.listAlerts(alerts, projectId, onlyUnacknowledged);
  };
};
