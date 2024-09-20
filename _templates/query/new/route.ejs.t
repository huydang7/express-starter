---
to: src/routes/<%=h.changeCase.paramCase(name)%>/<%=h.changeCase.paramCase(name)%>.controller.ts
---
<%
  pascalCaseName = h.changeCase.pascalCase(name)
  camelCaseName = h.changeCase.camelCase(name)
  snakeCaseName = h.changeCase.snakeCase(name)
%>

import * as Validator from './validator';
import { BaseError } from '@/exceptions/base-error';
import express from 'express';
import httpStatus from 'http-status';
import { auth } from '@/middlewares/auth';
import { <%=pascalCaseName%>Service } from '@/services';
import { catchAsync, pick } from '@/shared/utils';


const router = express.Router();

const create<%=pascalCaseName%> = catchAsync(async (req, res) => {
  const <%=camelCaseName%> = await <%=pascalCaseName%>Service.create<%=pascalCaseName%>(req.body);
  res.formatter(<%=camelCaseName%>);
});

const get<%=pascalCaseName%>s = catchAsync(async (req, res) => {
  const filter = pick(req.query, []);
  const options = pick(req.query, ['page', 'size', 'order']);
  const result = await <%=pascalCaseName%>Service.query<%=pascalCaseName%>s(filter, options);
  res.formatter(result);
});

const get<%=pascalCaseName%> = catchAsync(async (req, res) => {
  const <%=camelCaseName%> = await <%=pascalCaseName%>Service.get<%=pascalCaseName%>ById(req.params.id);
  if (!<%=camelCaseName%>) {
    throw new BaseError(httpStatus.NOT_FOUND, '<%=camelCaseName%> not found');
  }
  res.formatter(<%=camelCaseName%>);
});

const update<%=pascalCaseName%> = catchAsync(async (req, res) => {
  const <%=camelCaseName%> = await <%=pascalCaseName%>Service.update<%=pascalCaseName%>ById(req.params.id, req.body);
  res.formatter(<%=camelCaseName%>);
});

const delete<%=pascalCaseName%> = catchAsync(async (req, res) => {
  await <%=pascalCaseName%>Service.delete<%=pascalCaseName%>ById(req.params.id);
  res.formatter(true);
});


router
  .route('/')
  .post(auth(), Validator.create<%=pascalCaseName%>, create<%=pascalCaseName%>)
  .get(auth(), Validator.get<%=pascalCaseName%>s, get<%=pascalCaseName%>s);

router
  .route('/:id')
  .get(auth(), Validator.get<%=pascalCaseName%>, get<%=pascalCaseName%>)
  .patch(auth(), Validator.update<%=pascalCaseName%>, update<%=pascalCaseName%>)
  .delete(auth(), Validator.delete<%=pascalCaseName%>, delete<%=pascalCaseName%>);

export default router;
