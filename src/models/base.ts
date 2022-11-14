import sequelize from 'sequelize';

export const TimestampDefinition = {
  createdAt: {
    type: sequelize.DATE,
    defaultValue: sequelize.fn('NOW'),
  },
  updatedAt: {
    type: sequelize.DATE,
    defaultValue: sequelize.fn('NOW'),
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
