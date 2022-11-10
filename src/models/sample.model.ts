import { TimestampDefinition } from './base';
import { ISample, SampleType } from '@interfaces/sample';
import { enumToArray } from '@shared/utils';
import sequelize, { Model, Optional } from 'sequelize';

type CreationAttributes = Optional<ISample, 'id'>;

export class Sample
  extends Model<ISample, CreationAttributes>
  implements ISample
{
  id!: string;
  title!: string;
  type!: SampleType;
}

export const initModel = (connection: sequelize.Sequelize): void => {
  Sample.init(
    {
      id: {
        type: sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize.UUIDV4,
      },
      title: {
        type: sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: sequelize.STRING,
        validate: {
          isIn: [enumToArray(SampleType)],
        },
      },
      ...TimestampDefinition,
    },
    {
      timestamps: true,
      sequelize: connection,
      modelName: 'Sample',
      tableName: 'sample',
    },
  );
};
