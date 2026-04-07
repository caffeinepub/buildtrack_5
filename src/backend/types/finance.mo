import Common "common";

module {
  public type BudgetCategory = {
    #Materials;
    #Labor;
    #Equipment;
    #Overhead;
    #Other;
  };

  public type Budget = {
    id : Common.BudgetId;
    projectId : Common.ProjectId;
    var category : BudgetCategory;
    var allocatedAmount : Float;
    var spentAmount : Float;
    var notes : ?Text;
    createdAt : Common.Timestamp;
    var updatedAt : Common.Timestamp;
  };

  public type BudgetPublic = {
    id : Common.BudgetId;
    projectId : Common.ProjectId;
    category : BudgetCategory;
    allocatedAmount : Float;
    spentAmount : Float;
    notes : ?Text;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type BudgetVariance = {
    projectId : Common.ProjectId;
    projectName : Text;
    totalAllocated : Float;
    totalSpent : Float;
    variance : Float;
    variancePercent : Float;
    isOverrun : Bool;
    categoryBreakdown : [CategoryVariance];
  };

  public type CategoryVariance = {
    category : BudgetCategory;
    allocated : Float;
    spent : Float;
    variance : Float;
  };

  public type CreateBudgetPayload = {
    projectId : Common.ProjectId;
    category : BudgetCategory;
    allocatedAmount : Float;
    notes : ?Text;
  };

  public type UpdateBudgetPayload = {
    allocatedAmount : ?Float;
    notes : ?Text;
  };

  public type SpendingReport = {
    projectId : Common.ProjectId;
    projectName : Text;
    phaseBreakdown : [PhaseSpending];
    materialBreakdown : [MaterialSpending];
    totalSpent : Float;
    reportGeneratedAt : Common.Timestamp;
  };

  public type PhaseSpending = {
    phaseId : Common.PhaseId;
    phaseName : Text;
    totalSpent : Float;
  };

  public type MaterialSpending = {
    materialId : Common.MaterialId;
    materialName : Text;
    totalQuantity : Float;
    totalCost : Float;
  };
};
