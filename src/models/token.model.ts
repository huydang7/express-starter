import Sequelize, { Model, Optional } from 'sequelize';
import { enumToArray } from '../shared/utils';

export enum TokenType {
  ACCESS = 'ACCESS',
  REFRESH = 'REFRESH',
  RESET_PASSWORD = 'RESET_PASSWORD',
  VERIFY_EMAIL = 'VERIFY_EMAIL',
}

export interface IToken {
  id: string;
  token: string;
  userId: string;
  type: TokenType;
  expires: string;
}

type CreationAttributes = Optional<IToken, 'id'>;
export class Token extends Model<IToken, CreationAttributes> implements IToken {
  id!: string;
  token!: string;
  userId!: string;
  type!: TokenType;
  expires!: string;
}

export const initModel = (connection: Sequelize.Sequelize): void => {
  Token.init(
    {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      token: {
        type: Sequelize.STRING(1000),
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [enumToArray(TokenType)],
        },
      },
      expires: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      sequelize: connection,
      modelName: 'Token',
      tableName: 'token',
    },
  );
};
