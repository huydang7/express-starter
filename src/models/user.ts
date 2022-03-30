import { EntitySchema } from "@mikro-orm/core";
import { EntityRepository } from "@mikro-orm/mongodb";
import { BaseEntity, IBaseEntity } from "./base";

export interface IUser extends IBaseEntity {
  email: string;
  password: string;
}

export const User = new EntitySchema<IUser, IBaseEntity>({
  name: "users",
  extends: "base_entity",
  properties: {
    email: { type: String },
    password: { type: String },
  },
});
