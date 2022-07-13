import { IDefaultCallbacks } from 'hooks/types';
import { EvmTransactionInput } from '@moralisweb3/core/src/dataTypes/EvmTransaction/EvmTransactionTypes';

export interface IAction extends IDefaultCallbacks, EvmTransactionInput {
  onSuccess?: () => void;
}
