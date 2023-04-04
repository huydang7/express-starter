import sequelize, { DataTypes } from 'sequelize';

export const TimestampDefinition = {
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: sequelize.fn('now'),
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: sequelize.fn('now'),
  },
  deletedAt: {
    type: DataTypes.DATE,
  },
};

export const UserModifyingDefinition = {
  createdBy: {
    type: DataTypes.UUID,
  },
  updatedBy: {
    type: DataTypes.UUID,
  },
};
