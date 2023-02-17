enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

enum RoleRights {
  AdminOnly,
}

type RoleRightsMap = {
  [key in Role]: RoleRights[];
};

const AllRoles: RoleRightsMap = {
  ADMIN: [RoleRights.AdminOnly],
  USER: [],
};

export { Role, RoleRights, AllRoles };
