import { IDefaultCallbacks } from 'hooks/types';
import { InputEvmAddress } from '@moralisweb3/core/src/dataTypes/EvmAddress';
import { ExecuteFunctionOverrides } from '@moralisweb3/evm/src/chainMethods/executeFunction';
import { JsonFragment } from '@ethersproject/abi';

type Params = Record<string, unknown>;

export interface IUseEvmContract {
  address: InputEvmAddress;
  abi: JsonFragment[];
}

export interface IExecuteOptions extends IDefaultCallbacks {
  onSuccess?: () => void;
  functionName: string;
  params?: Params;
  overrides?: ExecuteFunctionOverrides;
}
