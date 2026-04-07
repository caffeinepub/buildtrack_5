import Time "mo:core/Time";
import List "mo:core/List";
import Common "../types/common";
import FinanceTypes "../types/finance";
import InventoryTypes "../types/inventory";
import ProjectTypes "../types/projects";
import FinanceLib "../lib/finance";

mixin (
  budgets : List.List<FinanceTypes.Budget>,
  transactions : List.List<InventoryTypes.InventoryTransaction>,
  projects : List.List<ProjectTypes.Project>,
  phases : List.List<ProjectTypes.Phase>,
  materials : List.List<InventoryTypes.Material>,
) {
  var nextBudgetId : Nat = 0;

  public shared ({ caller }) func createBudget(payload : FinanceTypes.CreateBudgetPayload) : async FinanceTypes.BudgetPublic {
    let now = Time.now();
    let result = FinanceLib.createBudget(budgets, nextBudgetId, caller, payload, now);
    nextBudgetId += 1;
    result;
  };

  public shared ({ caller }) func updateBudget(budgetId : Common.BudgetId, payload : FinanceTypes.UpdateBudgetPayload) : async FinanceTypes.BudgetPublic {
    let now = Time.now();
    FinanceLib.updateBudget(budgets, budgetId, payload, now);
  };

  public shared query ({ caller }) func getBudgetsByProject(projectId : Common.ProjectId) : async [FinanceTypes.BudgetPublic] {
    FinanceLib.getBudgetsByProject(budgets, projectId);
  };

  public shared query ({ caller }) func getBudgetVariance(projectId : Common.ProjectId) : async FinanceTypes.BudgetVariance {
    FinanceLib.getBudgetVariance(budgets, projects, projectId);
  };

  public shared query ({ caller }) func getSpendingReport(projectId : Common.ProjectId) : async FinanceTypes.SpendingReport {
    let now = Time.now();
    FinanceLib.getSpendingReport(transactions, projects, phases, materials, projectId, now);
  };
};
