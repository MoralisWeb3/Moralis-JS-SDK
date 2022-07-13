import { IDefaultCallbacks } from 'hooks/types';

export interface ISignCallbacks extends IDefaultCallbacks {
  onSuccess?: () => void;
}

export interface ISignParams {
  (message: string, params?: ISignCallbacks): void;
}
