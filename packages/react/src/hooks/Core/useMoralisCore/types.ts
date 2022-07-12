import { IDefaultCallbacks } from 'hooks/types';

export interface ICoreStart extends IDefaultCallbacks {
  onSuccess?: () => void;
}
