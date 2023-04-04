import { TimestampDefinition } from './base';
import { IToken, TokenType } from 'interfaces/token';
import sequelize, { DataTypes, Model, Optional } from 'sequelize';
import { enumToArray } from 'shared/utils';

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
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize.fn('uuid_generate_v4'),
      },
      token: {
        type: DataTypes.STRING(1000),
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [enumToArray(TokenType)],
        },
      },
      expires: {
        type: DataTypes.DATE,
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
