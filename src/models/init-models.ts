import * as TokenModel from './token.model';
import * as UserModel from './user.model';
import { Sequelize } from 'sequelize';

export const initModels = (connection: Sequelize) => {
  UserModel.initModel(connection);
  TokenModel.initModel(connection);
};
