import { TimestampDefinition } from './base';
import { IToken, TokenType } from '@interfaces/token';
import { enumToArray } from '@shared/utils';
import sequelize, { Model, Optional } from 'sequelize';

type CreationAttributes = Optional<IToken, 'id'>;
export class Token extends Model<IToken, CreationAttributes> implements IToken {
  id!: string;
  token!: string;
  userId!: string;
  type!: TokenType;
  expires!: string;
}

export const initModel = (connection: sequelize.Sequelize): void => {
  Token.init(
    {
      id: {
        type: sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize.UUIDV4,
      },
      token: {
        type: sequelize.STRING(1000),
      },
      userId: {
        type: sequelize.UUID,
        allowNull: false,
      },
      type: {
        type: sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [enumToArray(TokenType)],
        },
      },
      expires: {
        type: sequelize.DATE,
        allowNull: false,
      },
      ...TimestampDefinition,
    },
    {
      timestamps: true,
      sequelize: connection,
      modelName: 'Token',
      tableName: 'token',
    },
  );
};
