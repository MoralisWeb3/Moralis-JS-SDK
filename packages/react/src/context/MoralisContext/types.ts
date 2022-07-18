import { EvmAbstractConnector } from '@moralisweb3/evm-connector-utils';
import { EvmAddress, EvmChain, EvmProvider, MoralisError } from '@moralisweb3/core';
import { IConnectParams } from '../../hooks/Evm/useMoralisEvm/types';
import { IDefaultCallbacks } from '../../hooks';
import { MoralisEvm } from '@moralisweb3/evm';

export interface IMoralisContext {
  account: EvmAddress | null;
  chain: EvmChain | null;
  connect: IConnectParams;
  connector: EvmAbstractConnector;
  disconnect: ({ onComplete, onError, onSuccess, throwOnError = false }: IDefaultCallbacks<void>) => void;
  error: MoralisError | null;
  Evm: MoralisEvm;
  isConnected: boolean;
  isConnecting: boolean;
  isDisconnecting: boolean;
  provider: EvmProvider | null;
}
