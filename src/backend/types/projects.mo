import Common "common";

module {
  public type ProjectStatus = { #Active; #Inactive; #Completed };

  public type PhaseStatus = { #Planned; #InProgress; #Completed };

  public type Project = {
    id : Common.ProjectId;
    var name : Text;
    var description : Text;
    var siteLocation : Text;
    var totalBudget : Float;
    var status : ProjectStatus;
    createdBy : Common.UserId;
    createdAt : Common.Timestamp;
    var updatedAt : Common.Timestamp;
  };

  public type ProjectPublic = {
    id : Common.ProjectId;
    name : Text;
    description : Text;
    siteLocation : Text;
    totalBudget : Float;
    status : ProjectStatus;
    createdBy : Common.UserId;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type Phase = {
    id : Common.PhaseId;
    projectId : Common.ProjectId;
    var name : Text;
    var description : Text;
    var budgetAllocation : Float;
    var status : PhaseStatus;
    var startDate : ?Common.Timestamp;
    var endDate : ?Common.Timestamp;
    createdAt : Common.Timestamp;
  };

  public type PhasePublic = {
    id : Common.PhaseId;
    projectId : Common.ProjectId;
    name : Text;
    description : Text;
    budgetAllocation : Float;
    status : PhaseStatus;
    startDate : ?Common.Timestamp;
    endDate : ?Common.Timestamp;
    createdAt : Common.Timestamp;
  };

  public type CreateProjectPayload = {
    name : Text;
    description : Text;
    siteLocation : Text;
    totalBudget : Float;
  };

  public type UpdateProjectPayload = {
    name : ?Text;
    description : ?Text;
    siteLocation : ?Text;
    totalBudget : ?Float;
    status : ?ProjectStatus;
  };

  public type CreatePhasePayload = {
    projectId : Common.ProjectId;
    name : Text;
    description : Text;
    budgetAllocation : Float;
    startDate : ?Common.Timestamp;
    endDate : ?Common.Timestamp;
  };
};
