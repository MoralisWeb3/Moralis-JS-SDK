import { ExecuteFunctionOptions } from '@moralisweb3/evm/lib/chainMethods/executeFunction';
import { IDefaultCallbacks } from '../../types';

export interface IUseEvmContract extends Pick<ExecuteFunctionOptions, 'abi' | 'contractAddress'> {}

export type TExecuteParams = IDefaultCallbacks<unknown> &
  Pick<ExecuteFunctionOptions, 'params' | 'functionName' | 'overrides'>;
