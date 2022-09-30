import sequelize from 'sequelize';

export interface ITimestamp {
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export const TimeStampDefinition = {
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
    type: sequelize.STRING,
  },
  updatedBy: {
    type: sequelize.STRING,
  },
};
