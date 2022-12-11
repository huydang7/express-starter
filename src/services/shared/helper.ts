import { IOrder, IPagination, Sort } from './common';
import { defaultPageSize } from 'shared/constants';

type OrderKey = 'byCreatedAt' | 'byOrder';

export const defaultOrder: { [key in OrderKey]: IOrder } = {
  byCreatedAt: [['createdAt', Sort.ASC]],
  byOrder: [['order', Sort.ASC]],
};

export const EXCLUDE_USER_PROPS = ['password'];

export const getPageSize = (options: IPagination) => {
  const page = options?.page || defaultPageSize.page;
  const size = options?.size || defaultPageSize.size;
  return { offset: (page - 1) * size, limit: size };
};
