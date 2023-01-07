import { IOrder, IPagination, Sort } from './common';
import { DefaultPageSize } from 'shared/constants';

type OrderKey = 'ByCreatedAt' | 'ByOrder';

export const DefaultOrder: { [key in OrderKey]: IOrder } = {
  ByCreatedAt: [['createdAt', Sort.ASC]],
  ByOrder: [['order', Sort.ASC]],
};

export const ExcludeUserProps = ['password'];

export const getPageSize = (options: IPagination) => {
  const page = options?.page || DefaultPageSize.page;
  const size = options?.size || DefaultPageSize.size;
  return { offset: (page - 1) * size, limit: size };
};
