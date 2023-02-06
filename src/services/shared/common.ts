export enum Sort {
  DESC = 'DESC',
  ASC = 'ASC',
}
export interface IPagination {
  page?: number;
  size?: number;
  order?: IOrder;
}

export type IOrder = [[key: string, sorter: Sort]];
