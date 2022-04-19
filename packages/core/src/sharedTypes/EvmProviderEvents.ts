// Events being emitted by an eip-1193 provider
// See https://eips.ethereum.org/EIPS/eip-1193#events
export enum EvmProviderEvent {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  CHAIN_CHANGED = 'chainChanged',
  ACCOUNTS_CHANGED = 'accountsChanged',
  MESSAGE = 'message',
}
