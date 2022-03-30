import { DI } from "../database/connection";
import { User } from "../models/user";

export const getUsers = () => {
  const users = DI.userRepository.findAndCount({});
  return users;
};
