import { Role } from 'config/roles';

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  isEmailVerified: boolean;
}
