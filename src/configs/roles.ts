enum Role {
  admin = "admin",
  user = "user",
  marketer = "marketer",
}

enum RoleRights {
  adminOnly,
}

type RoleRightsMap = {
  [key in Role]: RoleRights[];
};

const AllRoles: RoleRightsMap = {
  admin: [RoleRights.adminOnly],
  marketer: [],
  user: [],
};

export { Role, RoleRights, AllRoles };
