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

export { AllRoles, Role, RoleRights };

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  isEmailVerified: boolean;
}

export interface IJWTUser {
  id: string;
  email: string;
  name: string;
  role: Role;
}
