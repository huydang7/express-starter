---
to: src/routes/<%=h.changeCase.paramCase(name)%>/validator.ts
---
<%
  pascalCaseName = h.changeCase.pascalCase(name)
  camelCaseName = h.changeCase.camelCase(name)
  snakeCaseName = h.changeCase.snakeCase(name)
%>

import Joi from 'joi';
import validate from '@/middlewares/validate';

export const create<%=pascalCaseName%> = validate({
  body: Joi.object().keys({}).options({ allowUnknown: true }),
});

export const get<%=pascalCaseName%>s = validate({
  query: Joi.object()
    .keys({
      size: Joi.number().integer(),
      page: Joi.number().integer(),
    })
    .options({ allowUnknown: true }),
});

export const get<%=pascalCaseName%> = validate({
  params: Joi.object().keys({
    id: Joi.string(),
  }),
});

export const update<%=pascalCaseName%> = validate({
  params: Joi.object().keys({
    id: Joi.required(),
  }),
  body: Joi.object().keys().options({ allowUnknown: true }),
});

export const delete<%=pascalCaseName%> = validate({
  params: Joi.object().keys({
    id: Joi.string(),
  }),
});
