import Common "common";

module {
  public type User = {
    id : Common.UserId;
    var name : Text;
    var email : Text;
    var role : Common.Role;
    var isActive : Bool;
    createdAt : Common.Timestamp;
  };

  public type UserPublic = {
    id : Common.UserId;
    name : Text;
    email : Text;
    role : Common.Role;
    isActive : Bool;
    createdAt : Common.Timestamp;
  };

  public type RegisterUserPayload = {
    name : Text;
    email : Text;
    role : Common.Role;
  };
};
