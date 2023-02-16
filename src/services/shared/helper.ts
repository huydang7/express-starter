import { IOrder, IPagination, Sort } from './common';
import { DefaultPageSize } from 'shared/constants';

type OrderKey = 'byCreatedAt' | 'byOrder';

export const DefaultOrder: { [key in OrderKey]: IOrder } = {
  byCreatedAt: [['createdAt', Sort.ASC]],
  byOrder: [['order', Sort.ASC]],
};

export const ExcludeUserProps = ['password'];

export const getPageSize = (options: IPagination) => {
  const page = options?.page || DefaultPageSize.page;
  const size = options?.size || DefaultPageSize.size;
  return { offset: (page - 1) * size, limit: size };
};
