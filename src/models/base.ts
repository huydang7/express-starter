import {
  Entity,
  EntitySchema,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";

export interface IBaseEntity {
  _id: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export const BaseEntity = new EntitySchema<IBaseEntity>({
  name: "base_entity",
  abstract: true,
  properties: {
    _id: { type: "ObjectId", primary: true },
    id: { type: "string", serializedPrimaryKey: true },
    createdAt: { type: "Date", onCreate: () => new Date(), nullable: true },
    updatedAt: {
      type: "Date",
      onCreate: () => new Date(),
      onUpdate: () => new Date(),
      nullable: true,
    },
  },
});
