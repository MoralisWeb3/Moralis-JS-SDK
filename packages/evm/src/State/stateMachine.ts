import { EvmAddress, EvmChain, EvmConnectData, EvmConnectOptions, EvmConnectorName, EvmProvider } from '@moralis/core';
import { createMachine } from 'xstate';

export interface StateContext {
  walletType: EvmConnectorName;
  options: unknown;
}

export type ConnectEvent = { type: 'CONNECT' } & EvmConnectOptions;
export type DisconnectEvent = { type: 'DISCONNECT' };
export type ConnectingSuccessEvent = { type: 'CONNECTING_SUCCESS'; data: EvmConnectData };
export type ConnectingErrorEvent = { type: 'CONNECTING_ERROR'; data: Error };

export type StateEvents = ConnectEvent | DisconnectEvent | ConnectingSuccessEvent | ConnectingErrorEvent;

/**
 * Note: make sure to have the xstate plguin installed when adjusting this object,
 * as it will automatically generate Typescript definitions
 */
export const stateMachine = createMachine({
  tsTypes: {} as import('./stateMachine.typegen').Typegen0,
  schema: {
    context: {} as StateContext,
    events: {} as StateEvents,
    services: {} as {
      connectInvoker: {
        data: {
          chain: EvmChain | null;
          account: EvmAddress | null;
          provider: EvmProvider;
          connector: EvmConnectData;
        };
      };
    },
  },
  id: 'evm',
  initial: 'Disconnected',
  states: {
    Disconnected: {
      on: {
        CONNECT: {
          target: 'Connecting',
        },
      },
    },
    Connecting: {
      entry: 'onConnecting',
      invoke: {
        src: 'connectInvoker',
      },
      on: {
        CONNECTING_SUCCESS: {
          target: 'Connected',
        },
        CONNECTING_ERROR: {
          target: 'ConnectingError',
        },
      },
    },
    ConnectingError: {
      entry: 'onConnectError',
      always: {
        actions: 'onDisconnected',
        target: 'Disconnected',
      },
    },
    Connected: {
      entry: 'onConnectSuccess',
      on: {
        DISCONNECT: {
          actions: 'onDisconnected',
          target: 'Disconnected',
        },
      },
    },
  },
});

export type StateMachine = typeof stateMachine;
