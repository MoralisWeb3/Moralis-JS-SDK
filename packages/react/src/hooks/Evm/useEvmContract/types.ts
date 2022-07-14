import { ExecuteFunctionOptions } from '@moralisweb3/evm/src/chainMethods/executeFunction';
import { IDefaultCallbacks } from 'hooks/types';

export interface IUseEvmContract extends Pick<ExecuteFunctionOptions, 'abi' | 'contractAddress'> {}

export type TExecuteParams = IDefaultCallbacks<unknown> &
  Pick<ExecuteFunctionOptions, 'params' | 'functionName' | 'overrides'>;
