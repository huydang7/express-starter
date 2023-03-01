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

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  isEmailVerified: boolean;
}
