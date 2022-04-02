enum Role {
  admin = 'admin',
  user = 'user',
}

enum RoleRights {
  adminOnly,
}

type RoleRightsMap = {
  [key in Role]: RoleRights[];
};

const AllRoles: RoleRightsMap = {
  admin: [RoleRights.adminOnly],
  user: [],
};

export { Role, RoleRights, AllRoles };
