import { AnyConnector, EvmAddress, EvmChain, EvmConnectData } from '@moralis/core';
import { EvmAbstractConnector } from '@moralis/evm-connector-utils';

/**
 * Events fired by MoralisEvm upon changes in the network status
 */
export enum EvmNetworkEvent {
  CONNECTING = 'Connecting',
  CONNECTED = 'Connected',
  DISCONNECTED = 'Disconnected',
  CONNECTING_ERROR = 'Connecting Error',
  CHAIN_CHANGED = 'Chain Changed',
  ACCOUNT_CHANGED = 'Account Changed',
}

export type OnConnectingCallback = () => void;
export type OnConnectedCallback = <Connector extends EvmAbstractConnector = AnyConnector>(
  data: EvmConnectData<Connector>,
) => void;
export type OnDisconnectedCallback = () => void;
export type OnConnectingErrorCallback = (error: Error) => void;
export type OnChainChangedCallback = (data: { chain: EvmChain }) => void;
export type OnAccountChangedCallback = (data: { account: EvmAddress }) => void;
