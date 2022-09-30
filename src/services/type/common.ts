export enum Sort {
  DESC = 'DESC',
  ASC = 'ASC',
}
export interface IPagination {
  page?: number;
  size?: number;
}

export type IOrder = [[key: string, sorter: Sort]];
