import { createMachine } from 'xstate';
import { AuthenticateData, AuthenticateEventOptions } from '../Authenticate/EvmAuth';

// TODO: get from Core?
export type Network = 'evm' | 'sol';
export type EvmConnector = 'metamask' | 'walletconnect';

export interface StateContext {
  network: Network;
  connector: EvmConnector;
}

export type StateEvents =
  | { type: 'INITIALIZE' }
  // TODO: split up in EVM_AUTH, SOL_AUTH, etc. etc
  | ({ type: 'AUTHENTICATE' } & AuthenticateEventOptions)
  | { type: 'LOGOUT' }
  | { type: 'AUTHENTICATING_SUCCESS'; data: AuthenticateData }
  | { type: 'AUTHENTICATING_ERROR'; data: Error };

/**
 * Note: make sure to have the xstate plguin installed when adjusting this object,
 * as it will automatically generate Typescript definitions
 */
export const stateMachine = createMachine({
  id: 'server',
  tsTypes: {} as import('./stateMachine.typegen').Typegen0,
  schema: {
    context: {} as StateContext,
    events: {} as StateEvents,
  },
  initial: 'Idle',
  context: {
    network: 'evm',
    connector: 'metamask',
  },
  states: {
    Idle: {
      on: {
        INITIALIZE: {
          target: 'Initialized',
        },
      },
    },
    Initialized: {
      entry: 'onInitialized',
      initial: 'Unauthenticated',
      states: {
        Unauthenticated: {
          on: {
            AUTHENTICATE: {
              target: 'Authenticating',
            },
          },
        },
        Authenticating: {
          entry: 'onAuthenticating',
          invoke: {
            src: 'authenticateInvoker',
          },
          on: {
            AUTHENTICATING_SUCCESS: {
              target: 'Authenticated',
            },
            AUTHENTICATING_ERROR: {
              target: 'AuthenticatingError',
            },
          },
        },
        AuthenticatingError: {
          entry: 'onAuthenticateError',
          always: {
            target: 'Unauthenticated',
            actions: 'onUnauthenticated',
          },
        },
        Authenticated: {
          entry: 'onAuthenticateSuccess',
          on: {
            LOGOUT: {
              target: 'Unauthenticated',
              actions: 'onUnauthenticated',
            },
          },
        },
      },
    },
  },
});
