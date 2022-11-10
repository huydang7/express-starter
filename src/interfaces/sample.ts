import { ITimestamp } from './base';

export enum SampleType {
  NORMAL = 'NORMAL',
  CUSTOM = 'CUSTOM',
}

export interface ISample extends ITimestamp {
  id: string;
  title: string;
  type: SampleType;
}
