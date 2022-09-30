import { Sequelize } from 'sequelize';

import * as UserModel from './user.model';
import * as TokenModel from './token.model';

export const initModels = (connection: Sequelize) => {
  UserModel.initModel(connection);
  TokenModel.initModel(connection);
};

export const initRelations = () => {
  UserModel.User.hasMany(TokenModel.Token, {
    as: 'tokens',
    foreignKey: 'userId',
  });
  TokenModel.Token.belongsTo(UserModel.User, {
    as: 'user',
    foreignKey: 'userId',
  });
};
