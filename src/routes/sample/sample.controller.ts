import * as Validator from './validator';
import { Role } from 'configs/roles';
import { BaseError } from 'exceptions/base-error';
import express from 'express';
import httpStatus from 'http-status';
import { requireRoles } from 'middlewares/auth';
import { SampleService } from 'services';
import { catchAsync, pick } from 'shared/utils';

const router = express.Router();

const createSample = catchAsync(async (req, res) => {
  const sample = await SampleService.createSample(req.body);
  res.formatter(sample);
});

const getSamples = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['type']);
  const options = pick(req.query, ['page', 'size']);
  const result = await SampleService.querySamples(filter, options);
  res.formatter(result);
});

const getSample = catchAsync(async (req, res) => {
  const sample = await SampleService.getSampleById(req.params.id);
  if (!sample) {
    throw new BaseError(httpStatus.NOT_FOUND, 'sample not found');
  }
  res.formatter(sample);
});

const updateSample = catchAsync(async (req, res) => {
  const sample = await SampleService.updateSampleById(req.params.id, req.body);
  res.formatter(sample);
});

const deleteSample = catchAsync(async (req, res) => {
  await SampleService.deleteSampleById(req.params.id);
  res.formatter(true);
});

router
  .route('/')
  .post(requireRoles([Role.ADMIN]), Validator.createSample, createSample)
  .get(requireRoles([Role.ADMIN]), Validator.getSamples, getSamples);

router
  .route('/:id')
  .get(requireRoles([Role.ADMIN]), Validator.getSample, getSample)
  .patch(requireRoles([Role.ADMIN]), Validator.updateSample, updateSample)
  .delete(requireRoles([Role.ADMIN]), Validator.getSample, deleteSample);

export default router;
