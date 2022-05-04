// Events emitted by the connectors,
// The InternalWeb3Provider of Moralis will listen to these
export enum EvmConnectorEvent {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  CHAIN_CHANGED = 'chainChanged',
  ACCOUNT_CHANGED = 'accountChanged',
}
