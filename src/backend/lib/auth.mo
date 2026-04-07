import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Common "../types/common";
import AuthTypes "../types/auth";

module {
  public func toPublic(user : AuthTypes.User) : AuthTypes.UserPublic {
    {
      id = user.id;
      name = user.name;
      email = user.email;
      role = user.role;
      isActive = user.isActive;
      createdAt = user.createdAt;
    };
  };

  public func register(
    users : List.List<AuthTypes.User>,
    caller : Common.UserId,
    payload : AuthTypes.RegisterUserPayload,
    now : Common.Timestamp,
  ) : AuthTypes.UserPublic {
    switch (users.find(func(u : AuthTypes.User) : Bool { Principal.equal(u.id, caller) })) {
      case (?existing) { toPublic(existing) };
      case null {
        let user : AuthTypes.User = {
          id = caller;
          var name = payload.name;
          var email = payload.email;
          var role = payload.role;
          var isActive = true;
          createdAt = now;
        };
        users.add(user);
        toPublic(user);
      };
    };
  };

  public func getUser(
    users : List.List<AuthTypes.User>,
    id : Common.UserId,
  ) : ?AuthTypes.UserPublic {
    switch (users.find(func(u : AuthTypes.User) : Bool { Principal.equal(u.id, id) })) {
      case (?u) { ?toPublic(u) };
      case null { null };
    };
  };

  public func updateRole(
    users : List.List<AuthTypes.User>,
    caller : Common.UserId,
    targetId : Common.UserId,
    role : Common.Role,
  ) : AuthTypes.UserPublic {
    // Verify caller is Admin or PM
    requireRole(users, caller, [#Admin, #ProjectManager]);
    let target = switch (users.find(func(u : AuthTypes.User) : Bool { Principal.equal(u.id, targetId) })) {
      case (?u) { u };
      case null { Runtime.trap("User not found") };
    };
    target.role := role;
    toPublic(target);
  };

  public func listUsers(users : List.List<AuthTypes.User>) : [AuthTypes.UserPublic] {
    users.map<AuthTypes.User, AuthTypes.UserPublic>(toPublic).toArray();
  };

  public func requireRole(
    users : List.List<AuthTypes.User>,
    caller : Common.UserId,
    roles : [Common.Role],
  ) : () {
    switch (users.find(func(u : AuthTypes.User) : Bool { Principal.equal(u.id, caller) })) {
      case null { Runtime.trap("Unauthorized: not registered") };
      case (?u) {
        if (not u.isActive) { Runtime.trap("Unauthorized: account inactive") };
        let hasRole = roles.any(func(r : Common.Role) : Bool {
          switch (r, u.role) {
            case (#Admin, #Admin) { true };
            case (#ProjectManager, #ProjectManager) { true };
            case (#SiteEngineer, #SiteEngineer) { true };
            case (#FinanceProcurement, #FinanceProcurement) { true };
            case _ { false };
          }
        });
        if (not hasRole) { Runtime.trap("Unauthorized: insufficient role") };
      };
    };
  };

  public func isRegistered(
    users : List.List<AuthTypes.User>,
    caller : Common.UserId,
  ) : Bool {
    switch (users.find(func(u : AuthTypes.User) : Bool { Principal.equal(u.id, caller) })) {
      case (?_) { true };
      case null { false };
    };
  };
};
