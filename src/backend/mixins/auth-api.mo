import Time "mo:core/Time";
import List "mo:core/List";
import Common "../types/common";
import AuthTypes "../types/auth";
import AuthLib "../lib/auth";

mixin (users : List.List<AuthTypes.User>) {
  var nextUserId : Nat = 0;

  public shared ({ caller }) func registerUser(payload : AuthTypes.RegisterUserPayload) : async AuthTypes.UserPublic {
    let now = Time.now();
    AuthLib.register(users, caller, payload, now);
  };

  public shared query ({ caller }) func getMyProfile() : async ?AuthTypes.UserPublic {
    AuthLib.getUser(users, caller);
  };

  public shared ({ caller }) func updateUserRole(targetId : Common.UserId, role : Common.Role) : async AuthTypes.UserPublic {
    AuthLib.updateRole(users, caller, targetId, role);
  };

  public shared query ({ caller }) func listUsers() : async [AuthTypes.UserPublic] {
    AuthLib.listUsers(users);
  };

  public shared query ({ caller }) func isUserRegistered() : async Bool {
    AuthLib.isRegistered(users, caller);
  };
};
