const allRoles = {
  user: [],
  admin: ["adminOnly"],
  marketer: [],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

export { roles, roleRights };
