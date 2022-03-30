import { EntityManager, EntityRepository, MikroORM } from "@mikro-orm/core";
import type { MongoDriver } from "@mikro-orm/mongodb";
import { IUser, User } from "../models/user";
import http from "http";
import { BaseEntity } from "../models/base";
import config from "../configs/config";

export const DI = {} as {
  server: http.Server;
  orm: MikroORM;
  em: EntityManager;
  userRepository: EntityRepository<IUser>;
};

export const initDb = async () => {
  console.log("initDb");
  await MikroORM.init<MongoDriver>({
    entities: [User, BaseEntity],
    clientUrl: config.mongoose.url,
    type: "mongo",
    allowGlobalContext: true,
  }).then((orm) => {
    DI.orm = orm;
    DI.em = DI.orm.em;
    DI.userRepository = DI.orm.em.getRepository(User);
    console.log("initDb done");
  });
};
