module {
  public type UserId = Principal;
  public type ProjectId = Nat;
  public type SiteId = Nat;
  public type MaterialId = Nat;
  public type SupplierId = Nat;
  public type InvoiceId = Nat;
  public type TransactionId = Nat;
  public type BudgetId = Nat;
  public type AlertId = Nat;
  public type PhaseId = Nat;
  public type Timestamp = Int;

  public type Role = {
    #ProjectManager;
    #SiteEngineer;
    #FinanceProcurement;
    #Admin;
  };

  public type Result<T, E> = {
    #ok : T;
    #err : E;
  };
};
