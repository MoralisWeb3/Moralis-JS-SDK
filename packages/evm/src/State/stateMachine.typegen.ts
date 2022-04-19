// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    onDisconnected: '' | 'DISCONNECT';
    onConnecting: 'CONNECT';
    onConnectError: 'CONNECTING_ERROR';
    onConnectSuccess: 'CONNECTING_SUCCESS';
  };
  internalEvents: {
    '': { type: '' };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    connectInvoker: 'done.invoke.evm.Connecting:invocation[0]';
  };
  missingImplementations: {
    actions: 'onDisconnected' | 'onConnecting' | 'onConnectError' | 'onConnectSuccess';
    services: 'connectInvoker';
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    connectInvoker: 'CONNECT';
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates: 'Disconnected' | 'Connecting' | 'ConnectingError' | 'Connected';
  tags: never;
}
