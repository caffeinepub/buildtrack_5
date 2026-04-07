import Time "mo:core/Time";
import List "mo:core/List";
import Common "../types/common";
import ProjectTypes "../types/projects";
import ProjectLib "../lib/projects";

mixin (
  projects : List.List<ProjectTypes.Project>,
  phases : List.List<ProjectTypes.Phase>,
) {
  var nextProjectId : Nat = 0;
  var nextPhaseId : Nat = 0;

  public shared ({ caller }) func createProject(payload : ProjectTypes.CreateProjectPayload) : async ProjectTypes.ProjectPublic {
    let now = Time.now();
    let result = ProjectLib.createProject(projects, nextProjectId, caller, payload, now);
    nextProjectId += 1;
    result;
  };

  public shared ({ caller }) func updateProject(projectId : Common.ProjectId, payload : ProjectTypes.UpdateProjectPayload) : async ProjectTypes.ProjectPublic {
    let now = Time.now();
    ProjectLib.updateProject(projects, caller, projectId, payload, now);
  };

  public shared query ({ caller }) func getProject(projectId : Common.ProjectId) : async ?ProjectTypes.ProjectPublic {
    ProjectLib.getProject(projects, projectId);
  };

  public shared query ({ caller }) func listProjects(statusFilter : ?ProjectTypes.ProjectStatus) : async [ProjectTypes.ProjectPublic] {
    ProjectLib.listProjects(projects, statusFilter);
  };

  public shared ({ caller }) func createPhase(payload : ProjectTypes.CreatePhasePayload) : async ProjectTypes.PhasePublic {
    let now = Time.now();
    let result = ProjectLib.createPhase(phases, nextPhaseId, caller, payload, now);
    nextPhaseId += 1;
    result;
  };

  public shared query ({ caller }) func listPhasesByProject(projectId : Common.ProjectId) : async [ProjectTypes.PhasePublic] {
    ProjectLib.listPhasesByProject(phases, projectId);
  };
};
