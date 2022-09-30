import bcrypt from 'bcryptjs';
import { Role } from '../configs/roles';
import Sequelize, { Model, Optional } from 'sequelize';

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role | string;
  isEmailVerified: boolean;
}

type CreationAttributes = Optional<IUser, 'id'>;

export class User extends Model<IUser, CreationAttributes> implements IUser {
  id!: string;
  name!: string;
  email!: string;
  password!: string;
  role!: Role | string;
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

export const initModel = (connection: Sequelize.Sequelize): void => {
  User.init(
    {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        set: function (value: string) {
          this.setDataValue('password', bcrypt.hashSync(value, 10));
        },
      },
      role: {
        type: Sequelize.ENUM(Role.ADMIN, Role.USER),
        allowNull: false,
        defaultValue: Role.USER,
      },
      isEmailVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      timestamps: true,
      sequelize: connection,
      modelName: 'User',
      tableName: 'user',
    },
  );
};
