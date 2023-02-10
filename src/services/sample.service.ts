import { IPagination } from './shared/common';
import { DefaultOrder, getPageSize } from './shared/helper';
import { BaseError } from 'exceptions/base-error';
import httpStatus from 'http-status';
import { ISample } from 'interfaces/sample';
import { Sample } from 'models/sample.model';

export const createSample = async (sampleBody: Omit<ISample, 'id'>) => {
  return await Sample.create(sampleBody);
};

export const querySamples = async (
  filter: Partial<ISample>,
  options: IPagination,
) => {
  const { limit, offset } = getPageSize(options);
  const samples = await Sample.findAndCountAll({
    where: {
      ...filter,
    },
    limit,
    offset,
    order: options?.order || DefaultOrder.ByCreatedAt,
  });
  return samples;
};

export const getSampleById = async (id: string) => {
  return Sample.findByPk(id);
};

export const updateSampleById = async (
  sampleId: string,
  updateBody: Partial<ISample>,
) => {
  const sample = await getSampleById(sampleId);
  if (!sample) {
    throw new BaseError(httpStatus.NOT_FOUND, 'Sample not found');
  }

  const res = await Sample.update(updateBody, { where: { id: sampleId } });
  return res;
};

export const deleteSampleById = async (sampleId: string) => {
  const sample = await getSampleById(sampleId);
  if (!sample) {
    throw new BaseError(httpStatus.NOT_FOUND, 'Sample not found');
  }
  await Sample.destroy({ where: { id: sampleId } });
  return sample;
};
