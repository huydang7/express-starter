import sequelize from 'sequelize';

export const TimestampDefinition = {
  createdAt: {
    type: sequelize.DATE,
    defaultValue: sequelize.fn('now'),
  },
  updatedAt: {
    type: sequelize.DATE,
    defaultValue: sequelize.fn('now'),
  },
  deletedAt: {
    type: sequelize.DATE,
  },
};

export const UserModifyingDefinition = {
  createdBy: {
    type: sequelize.UUID,
  },
  updatedBy: {
    type: sequelize.UUID,
  },
};
