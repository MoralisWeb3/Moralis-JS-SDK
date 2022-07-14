import {
  EvmBaseConnectOptions,
  EvmConnectionData,
  EvmMetamaskConnectorConnectOptions,
  EvmWalletConnectConnectorOptions,
} from '@moralisweb3/core';
import { IDefaultCallbacks } from '../../types';
export interface IConnectParams {
  (
    connector: 'metamask',
    options?: EvmMetamaskConnectorConnectOptions & IDefaultCallbacks<EvmConnectionData>,
  ): Promise<EvmConnectionData | null>;
  (
    connector: 'walletconnect',
    options?: EvmWalletConnectConnectorOptions & IDefaultCallbacks<EvmConnectionData>,
  ): Promise<EvmConnectionData | null>;
  (
    connector: string,
    options?: EvmBaseConnectOptions & IDefaultCallbacks<EvmConnectionData>,
  ): Promise<EvmConnectionData | null>;
}
