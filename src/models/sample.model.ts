import Sequelize, { Model, Optional } from 'sequelize';
import { enumToArray } from '../shared/utils';

import { ITimestamp } from './base';

export enum SampleType {
  NORMAL = 'NORMAL',
  CUSTOM = 'CUSTOM',
}

export interface ISample extends ITimestamp {
  id: string;
  title: string;
  type: SampleType;
}

type CreationAttributes = Optional<ISample, 'id'>;

export class Sample
  extends Model<ISample, CreationAttributes>
  implements ISample
{
  id!: string;
  title!: string;
  type!: SampleType;
}

export const initModel = (connection: Sequelize.Sequelize): void => {
  Sample.init(
    {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        validate: {
          isIn: [enumToArray(SampleType)],
        },
      },
    },
    {
      timestamps: true,
      sequelize: connection,
      modelName: 'Sample',
      tableName: 'sample',
    },
  );
};
