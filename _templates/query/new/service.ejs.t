---
to: src/services/<%=h.changeCase.paramCase(name)%>.service.ts
---
<%
  pascalCaseName = h.changeCase.pascalCase(name)
  camelCaseName = h.changeCase.camelCase(name)
  snakeCaseName = h.changeCase.snakeCase(name)
  paramCaseName = h.changeCase.paramCase(name)
%>
import { IPagination } from './shared/common';
import { getPageSize } from './shared/helper';
import { BaseError } from 'exceptions/base-error';
import httpStatus from 'http-status';
import { I<%=pascalCaseName%> } from 'interfaces/<%=paramCaseName%>';
import { <%=pascalCaseName%> } from 'models/<%=paramCaseName%>.model';

export const create<%=pascalCaseName%> = async (<%=camelCaseName%>Body: Omit<I<%=pascalCaseName%>, 'id'>) => {
  return await <%=pascalCaseName%>.create(<%=camelCaseName%>Body);
};

export const query<%=pascalCaseName%>s = async (
  filter: Partial<I<%=pascalCaseName%>>,
  options: IPagination,
) => {
  const { limit, offset } = getPageSize(options);
  const <%=camelCaseName%>s = await <%=pascalCaseName%>.findAndCountAll({
    where: {
      ...filter,
    },
    limit,
    offset,
  });
  return <%=camelCaseName%>s;
};

export const get<%=pascalCaseName%>ById = async (id: string) => {
  return <%=pascalCaseName%>.findByPk(id);
};

export const update<%=pascalCaseName%>ById = async (
  <%=camelCaseName%>Id: string,
  updateBody: Partial<I<%=pascalCaseName%>>,
) => {
  const <%=camelCaseName%> = await get<%=pascalCaseName%>ById(<%=camelCaseName%>Id);
  if (!<%=camelCaseName%>) {
    throw new BaseError(httpStatus.NOT_FOUND, '<%=camelCaseName%> not found');
  }

  const res = await <%=pascalCaseName%>.update(updateBody, { where: { id: <%=camelCaseName%>Id } });
  return res;
};

export const delete<%=pascalCaseName%>ById = async (<%=camelCaseName%>Id: string) => {
  const <%=camelCaseName%> = await get<%=pascalCaseName%>ById(<%=camelCaseName%>Id);
  if (!<%=camelCaseName%>) {
    throw new BaseError(httpStatus.NOT_FOUND, '<%=camelCaseName%> not found');
  }
  await <%=pascalCaseName%>.destroy({ where: { id: <%=camelCaseName%>Id } });
  return <%=camelCaseName%>;
};
