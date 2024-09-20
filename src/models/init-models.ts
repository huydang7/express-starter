import { Sequelize } from 'sequelize';

import * as TokenModel from './token.model';
import * as UserModel from './user.model';

export const initModels = (connection: Sequelize) => {
  UserModel.initModel(connection);
  TokenModel.initModel(connection);
};
