import { EvmConnectionData, InitEvent } from '@moralisweb3/core';

export interface ConnectEventOptions {
  connector: string;
  options?: Record<string, unknown>;
}
export interface StateContext {
  connector?: string;
  options?: Record<string, unknown>;
  error?: Error;
}

export interface ConnectEvent {
  type: 'CONNECT';
  data: ConnectEventOptions;
}
export interface ConnectSuccessEvent {
  type: 'CONNECT_SUCCESS';
  data: EvmConnectionData;
}
export interface ConnectErrorEvent {
  type: 'CONNECT_ERROR';
  data: Error;
}
export interface DisconnectEvent {
  type: 'DISCONNECT';
}

export type StateEvent = InitEvent | ConnectEvent | ConnectSuccessEvent | ConnectErrorEvent | DisconnectEvent;

export type State =
  | {
      value: 'Disconnected';
      context: StateContext;
    }
  | {
      value: 'Connecting';
      context: StateContext;
    }
  | {
      value: 'Connected';
      context: StateContext & {
        connector: string;
      };
    };
