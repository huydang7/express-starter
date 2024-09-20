---
to: src/models/<%=h.changeCase.paramCase(name)%>.model.ts
---

<%
  pascalCaseName = h.changeCase.pascalCase(name)
  snakeCaseName = h.changeCase.snakeCase(name)
  paramCaseName = h.changeCase.paramCase(name)
%>

import { TimestampDefinition } from './base';
import { I<%=pascalCaseName%> } from '@/interfaces/<%=paramCaseName%>';
import sequelize, { Model, Optional, DataTypes } from 'sequelize';


type CreationAttributes = Optional<I<%=pascalCaseName%>, 'id'>;

export class <%=pascalCaseName%> extends Model<I<%=pascalCaseName%>, CreationAttributes> implements I<%=pascalCaseName%> {
  id!: string;

}

export const initModel = (connection: sequelize.Sequelize): void => {
  <%=pascalCaseName%>.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize.fn('uuid_generate_v4'),
      },
      ...TimestampDefinition,
    },
    {
      timestamps: true,
      sequelize: connection,
      modelName: '<%=pascalCaseName%>',
      tableName: '<%=snakeCaseName%>',
    },
  );
};
