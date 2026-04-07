import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Common "../types/common";
import FinanceTypes "../types/finance";
import InventoryTypes "../types/inventory";
import ProjectTypes "../types/projects";

module {
  public func toPublic(budget : FinanceTypes.Budget) : FinanceTypes.BudgetPublic {
    {
      id = budget.id;
      projectId = budget.projectId;
      category = budget.category;
      allocatedAmount = budget.allocatedAmount;
      spentAmount = budget.spentAmount;
      notes = budget.notes;
      createdAt = budget.createdAt;
      updatedAt = budget.updatedAt;
    };
  };

  public func createBudget(
    budgets : List.List<FinanceTypes.Budget>,
    nextId : Nat,
    _caller : Common.UserId,
    payload : FinanceTypes.CreateBudgetPayload,
    now : Common.Timestamp,
  ) : FinanceTypes.BudgetPublic {
    let budget : FinanceTypes.Budget = {
      id = nextId;
      projectId = payload.projectId;
      var category = payload.category;
      var allocatedAmount = payload.allocatedAmount;
      var spentAmount = 0.0;
      var notes = payload.notes;
      createdAt = now;
      var updatedAt = now;
    };
    budgets.add(budget);
    toPublic(budget);
  };

  public func updateBudget(
    budgets : List.List<FinanceTypes.Budget>,
    budgetId : Common.BudgetId,
    payload : FinanceTypes.UpdateBudgetPayload,
    now : Common.Timestamp,
  ) : FinanceTypes.BudgetPublic {
    let budget = switch (budgets.find(func(b : FinanceTypes.Budget) : Bool { b.id == budgetId })) {
      case (?b) { b };
      case null { Runtime.trap("Budget not found") };
    };
    switch (payload.allocatedAmount) { case (?a) { budget.allocatedAmount := a }; case null {} };
    switch (payload.notes) { case (?n) { budget.notes := ?n }; case null {} };
    budget.updatedAt := now;
    toPublic(budget);
  };

  public func getBudgetsByProject(
    budgets : List.List<FinanceTypes.Budget>,
    projectId : Common.ProjectId,
  ) : [FinanceTypes.BudgetPublic] {
    budgets.filter(func(b : FinanceTypes.Budget) : Bool { b.projectId == projectId })
      .map<FinanceTypes.Budget, FinanceTypes.BudgetPublic>(toPublic)
      .toArray();
  };

  public func recordSpending(
    budgets : List.List<FinanceTypes.Budget>,
    projectId : Common.ProjectId,
    category : FinanceTypes.BudgetCategory,
    amount : Float,
    now : Common.Timestamp,
  ) : () {
    switch (budgets.find(func(b : FinanceTypes.Budget) : Bool {
      b.projectId == projectId and categoryEqual(b.category, category)
    })) {
      case (?b) {
        b.spentAmount := b.spentAmount + amount;
        b.updatedAt := now;
      };
      case null { /* No matching budget — silently skip */ };
    };
  };

  public func getBudgetVariance(
    budgets : List.List<FinanceTypes.Budget>,
    projects : List.List<ProjectTypes.Project>,
    projectId : Common.ProjectId,
  ) : FinanceTypes.BudgetVariance {
    let project = switch (projects.find(func(p : ProjectTypes.Project) : Bool { p.id == projectId })) {
      case (?p) { p };
      case null { Runtime.trap("Project not found") };
    };
    let projectBudgets = budgets.filter(func(b : FinanceTypes.Budget) : Bool { b.projectId == projectId });
    let totalAllocated = projectBudgets.foldLeft(0.0, func(acc, b) { acc + b.allocatedAmount });
    let totalSpent = projectBudgets.foldLeft(0.0, func(acc, b) { acc + b.spentAmount });
    let variance = totalAllocated - totalSpent;
    let variancePercent = if (totalAllocated == 0.0) { 0.0 } else { (variance / totalAllocated) * 100.0 };
    let categoryBreakdown = projectBudgets.map<FinanceTypes.Budget, FinanceTypes.CategoryVariance>(func(b) {
      {
        category = b.category;
        allocated = b.allocatedAmount;
        spent = b.spentAmount;
        variance = b.allocatedAmount - b.spentAmount;
      };
    }).toArray();
    {
      projectId = projectId;
      projectName = project.name;
      totalAllocated = totalAllocated;
      totalSpent = totalSpent;
      variance = variance;
      variancePercent = variancePercent;
      isOverrun = totalSpent > totalAllocated;
      categoryBreakdown = categoryBreakdown;
    };
  };

  public func getSpendingReport(
    transactions : List.List<InventoryTypes.InventoryTransaction>,
    projects : List.List<ProjectTypes.Project>,
    phases : List.List<ProjectTypes.Phase>,
    materials : List.List<InventoryTypes.Material>,
    projectId : Common.ProjectId,
    now : Common.Timestamp,
  ) : FinanceTypes.SpendingReport {
    let project = switch (projects.find(func(p : ProjectTypes.Project) : Bool { p.id == projectId })) {
      case (?p) { p };
      case null { Runtime.trap("Project not found") };
    };
    let projectTxs = transactions.filter(func(t : InventoryTypes.InventoryTransaction) : Bool {
      t.projectId == projectId and (switch (t.transactionType) { case (#Inflow) { true }; case _ { false } })
    });

    let totalSpent = projectTxs.foldLeft(0.0, func(acc, t) { acc + t.totalCost });

    // Phase breakdown
    let projectPhases = phases.filter(func(ph : ProjectTypes.Phase) : Bool { ph.projectId == projectId });
    let phaseBreakdown = projectPhases.map<ProjectTypes.Phase, FinanceTypes.PhaseSpending>(func(ph) {
      let phaseSpent = projectTxs.foldLeft(0.0, func(acc, t) {
        switch (t.phaseId) {
          case (?pid) { if (pid == ph.id) { acc + t.totalCost } else { acc } };
          case null { acc };
        };
      });
      { phaseId = ph.id; phaseName = ph.name; totalSpent = phaseSpent };
    }).toArray();

    // Material breakdown: collect unique material IDs first, then aggregate
    type MatAgg = { materialId : Common.MaterialId; var qty : Float; var cost : Float };
    let matAggList = List.empty<MatAgg>();
    projectTxs.forEach(func(t : InventoryTypes.InventoryTransaction) {
      switch (matAggList.find(func(e : MatAgg) : Bool { e.materialId == t.materialId })) {
        case (?e) {
          e.qty := e.qty + t.quantity;
          e.cost := e.cost + t.totalCost;
        };
        case null {
          matAggList.add({ materialId = t.materialId; var qty = t.quantity; var cost = t.totalCost });
        };
      };
    });

    let materialBreakdown = matAggList.map<MatAgg, FinanceTypes.MaterialSpending>(func(entry) {
      let matName = switch (materials.find(func(m : InventoryTypes.Material) : Bool { m.id == entry.materialId })) {
        case (?m) { m.name };
        case null { "Unknown" };
      };
      { materialId = entry.materialId; materialName = matName; totalQuantity = entry.qty; totalCost = entry.cost };
    }).toArray();

    {
      projectId = projectId;
      projectName = project.name;
      phaseBreakdown = phaseBreakdown;
      materialBreakdown = materialBreakdown;
      totalSpent = totalSpent;
      reportGeneratedAt = now;
    };
  };

  func categoryEqual(a : FinanceTypes.BudgetCategory, b : FinanceTypes.BudgetCategory) : Bool {
    switch (a, b) {
      case (#Materials, #Materials) { true };
      case (#Labor, #Labor) { true };
      case (#Equipment, #Equipment) { true };
      case (#Overhead, #Overhead) { true };
      case (#Other, #Other) { true };
      case _ { false };
    };
  };
};
