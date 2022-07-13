import { EvmAbstractConnector } from '@moralisweb3/evm-connector-utils';
import { EvmAddress, EvmChain, EvmProvider } from '@moralisweb3/core';
import { IEvmConnect, IEVMConnectCallbacks } from '../../hooks/Evm/useMoralisEvm/types';
import MoralisEvm from '@moralisweb3/evm';

export interface IMoralisContext {
  account: EvmAddress | null;
  chain: EvmChain | null;
  connect: IEvmConnect;
  connector: EvmAbstractConnector;
  disconnect: ({ onComplete, onError, onSuccess, throwOnError = true }?: IEVMConnectCallbacks) => void;
  Evm: typeof MoralisEvm;
  isConnected: boolean;
  isConnecting: boolean;
  isDisconnecting: boolean;
  provider: EvmProvider | null;
}
