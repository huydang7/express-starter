import Sequelize, { Model, Optional } from 'sequelize';

export interface IToken {
  id: string;
  token: string;
  userId: string;
  type: string;
  expires: string;
  blacklisted: boolean;
}

type CreationAttributes = Optional<IToken, 'id'>;
export class Token extends Model<IToken, CreationAttributes> implements IToken {
  id!: string;
  token!: string;
  userId!: string;
  type!: string;
  expires!: string;
  blacklisted!: boolean;
}

export const initModel = (connection: Sequelize.Sequelize): void => {
  Token.init(
    {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      token: {
        type: Sequelize.STRING(1000),
      },
      userId: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      expires: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      blacklisted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
