import { AnyConnector, EvmAddress, EvmChain, EvmConnectData } from '@moralis/core/lib';
import { ethers } from 'ethers';

/**
 * Events fired by MoralisEvm upon changes in the network status
 */
export enum EvmNetworkEvent {
  // Fired when a valid connect to a network has been established
  CONNECTING = 'Connecting',
  CONNECTED = 'Connected',
  DISCONNECTED = 'Disconnected',
  CONNECTING_ERROR = 'ConnectingError',
  CHAIN_CHANGED = 'ChainChanged',
  ACCOUNT_CHANGED = 'AccountChanged',
  PROVIDER_UPDATED = 'ProviderUpdated',
}

export type EvmNetworkEventMap = {
  [EvmNetworkEvent.CONNECTING]: () => void;
  [EvmNetworkEvent.CONNECTED]: (data: EvmConnectData<AnyConnector>) => void;
  [EvmNetworkEvent.DISCONNECTED]: () => void;
  [EvmNetworkEvent.CONNECTING_ERROR]: (error: Error) => void;
  [EvmNetworkEvent.ACCOUNT_CHANGED]: (data: { account: EvmAddress }) => void;
  [EvmNetworkEvent.CHAIN_CHANGED]: (data: { chain: EvmChain }) => void;
  [EvmNetworkEvent.PROVIDER_UPDATED]: (data: { provider: null | ethers.providers.JsonRpcSigner }) => void;
};
