import { TimestampDefinition } from './base';
import { Role } from '@configs/roles';
import { IUser } from '@interfaces/user';
import { enumToArray } from '@shared/utils';
import bcrypt from 'bcryptjs';
import sequelize, { Model, Optional } from 'sequelize';

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
        type: sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize.UUIDV4,
      },
      name: {
        type: sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: sequelize.STRING,
        allowNull: false,
        unique: 'user_email',
      },
      password: {
        type: sequelize.STRING,
        allowNull: false,
        set: function (value: string) {
          this.setDataValue('password', bcrypt.hashSync(value, 10));
        },
      },
      role: {
        type: sequelize.STRING,
        allowNull: false,
        defaultValue: Role.USER,
        validate: {
          isIn: [enumToArray(Role)],
        },
      },
      isEmailVerified: {
        type: sequelize.BOOLEAN,
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
    },
  );
};
