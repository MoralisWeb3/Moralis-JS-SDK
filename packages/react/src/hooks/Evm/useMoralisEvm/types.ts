import {
  EvmBaseConnectOptions,
  EvmConnectData,
  EvmMetamaskConnectorConnectOptions,
  EvmWalletConnectConnectorOptions,
} from '@moralisweb3/core';
import { IDefaultCallbacks } from '../../types';
export interface IEVMConnectCallbacks extends IDefaultCallbacks {
  onSuccess?: (web3: EvmConnectData) => void;
}
export interface IEvmConnect {
  (connector: 'metamask', options?: EvmMetamaskConnectorConnectOptions & IEVMConnectCallbacks): Promise<void>;
  (connector: 'walletconnect', options?: EvmWalletConnectConnectorOptions & IEVMConnectCallbacks): Promise<void>;
  (connector: string, options?: EvmBaseConnectOptions & IEVMConnectCallbacks): Promise<void>;
}
