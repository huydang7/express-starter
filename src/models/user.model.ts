import bcrypt from 'bcryptjs';
import sequelize, { DataTypes, Model, Optional } from 'sequelize';

import { IUser, Role } from '@/interfaces/user';
import { enumToArray } from '@/shared/utils';

import { TimestampDefinition } from './base';

type CreationAttributes = Optional<IUser, 'id'>;

export class User extends Model<IUser, CreationAttributes> implements IUser {
  id!: string;
  name!: string;
  email!: string;
  password!: string;
  role!: Role;
  isEmailVerified!: boolean;
  static isEmailTaken: (email: string) => Promise<boolean>;
  isPasswordMatch = (password: string) => {
    return bcrypt.compareSync(password, this.password);
  };
}

User.isEmailTaken = async function (email) {
  const res = await User.count({
    where: {
      email,
    },
  });
  return !!res;
};

export const initModel = (connection: sequelize.Sequelize): void => {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize.fn('uuid_generate_v4'),
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'user_email',
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set: function (value: string) {
          this.setDataValue('password', bcrypt.hashSync(value, 10));
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: Role.USER,
        validate: {
          isIn: [enumToArray(Role)],
        },
      },
      isEmailVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      ...TimestampDefinition,
    },
    {
      timestamps: true,
      sequelize: connection,
      modelName: 'User',
      tableName: 'user',
    }
  );
};
