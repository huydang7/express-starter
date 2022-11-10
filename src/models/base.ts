import sequelize from 'sequelize';

export const TimestampDefinition = {
  createdAt: {
    type: sequelize.DATE,
  },
  updatedAt: {
    type: sequelize.DATE,
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
