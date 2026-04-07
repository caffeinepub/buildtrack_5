import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Common "../types/common";
import ProjectTypes "../types/projects";

module {
  public func toPublic(project : ProjectTypes.Project) : ProjectTypes.ProjectPublic {
    {
      id = project.id;
      name = project.name;
      description = project.description;
      siteLocation = project.siteLocation;
      totalBudget = project.totalBudget;
      status = project.status;
      createdBy = project.createdBy;
      createdAt = project.createdAt;
      updatedAt = project.updatedAt;
    };
  };

  public func phaseToPublic(phase : ProjectTypes.Phase) : ProjectTypes.PhasePublic {
    {
      id = phase.id;
      projectId = phase.projectId;
      name = phase.name;
      description = phase.description;
      budgetAllocation = phase.budgetAllocation;
      status = phase.status;
      startDate = phase.startDate;
      endDate = phase.endDate;
      createdAt = phase.createdAt;
    };
  };

  public func createProject(
    projects : List.List<ProjectTypes.Project>,
    nextId : Nat,
    caller : Common.UserId,
    payload : ProjectTypes.CreateProjectPayload,
    now : Common.Timestamp,
  ) : ProjectTypes.ProjectPublic {
    let project : ProjectTypes.Project = {
      id = nextId;
      var name = payload.name;
      var description = payload.description;
      var siteLocation = payload.siteLocation;
      var totalBudget = payload.totalBudget;
      var status = #Active;
      createdBy = caller;
      createdAt = now;
      var updatedAt = now;
    };
    projects.add(project);
    toPublic(project);
  };

  public func updateProject(
    projects : List.List<ProjectTypes.Project>,
    caller : Common.UserId,
    projectId : Common.ProjectId,
    payload : ProjectTypes.UpdateProjectPayload,
    now : Common.Timestamp,
  ) : ProjectTypes.ProjectPublic {
    let project = switch (projects.find(func(p : ProjectTypes.Project) : Bool { p.id == projectId })) {
      case (?p) { p };
      case null { Runtime.trap("Project not found") };
    };
    switch (payload.name) { case (?n) { project.name := n }; case null {} };
    switch (payload.description) { case (?d) { project.description := d }; case null {} };
    switch (payload.siteLocation) { case (?s) { project.siteLocation := s }; case null {} };
    switch (payload.totalBudget) { case (?b) { project.totalBudget := b }; case null {} };
    switch (payload.status) { case (?s) { project.status := s }; case null {} };
    project.updatedAt := now;
    toPublic(project);
  };

  public func getProject(
    projects : List.List<ProjectTypes.Project>,
    projectId : Common.ProjectId,
  ) : ?ProjectTypes.ProjectPublic {
    switch (projects.find(func(p : ProjectTypes.Project) : Bool { p.id == projectId })) {
      case (?p) { ?toPublic(p) };
      case null { null };
    };
  };

  public func listProjects(
    projects : List.List<ProjectTypes.Project>,
    statusFilter : ?ProjectTypes.ProjectStatus,
  ) : [ProjectTypes.ProjectPublic] {
    let filtered = switch (statusFilter) {
      case null { projects };
      case (?s) {
        projects.filter(func(p : ProjectTypes.Project) : Bool {
          switch (p.status, s) {
            case (#Active, #Active) { true };
            case (#Inactive, #Inactive) { true };
            case (#Completed, #Completed) { true };
            case _ { false };
          }
        });
      };
    };
    filtered.map<ProjectTypes.Project, ProjectTypes.ProjectPublic>(toPublic).toArray();
  };

  public func createPhase(
    phases : List.List<ProjectTypes.Phase>,
    nextId : Nat,
    caller : Common.UserId,
    payload : ProjectTypes.CreatePhasePayload,
    now : Common.Timestamp,
  ) : ProjectTypes.PhasePublic {
    let phase : ProjectTypes.Phase = {
      id = nextId;
      projectId = payload.projectId;
      var name = payload.name;
      var description = payload.description;
      var budgetAllocation = payload.budgetAllocation;
      var status = #Planned;
      var startDate = payload.startDate;
      var endDate = payload.endDate;
      createdAt = now;
    };
    phases.add(phase);
    phaseToPublic(phase);
  };

  public func listPhasesByProject(
    phases : List.List<ProjectTypes.Phase>,
    projectId : Common.ProjectId,
  ) : [ProjectTypes.PhasePublic] {
    phases.filter(func(p : ProjectTypes.Phase) : Bool { p.projectId == projectId })
      .map<ProjectTypes.Phase, ProjectTypes.PhasePublic>(phaseToPublic)
      .toArray();
  };
};
