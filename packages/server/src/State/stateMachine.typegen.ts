// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    onUnauthenticated: '' | 'LOGOUT';
    onInitialized: 'INITIALIZE';
    onAuthenticating: 'AUTHENTICATE';
    onAuthenticateError: 'AUTHENTICATING_ERROR';
    onAuthenticateSuccess: 'AUTHENTICATING_SUCCESS';
  };
  internalEvents: {
    '': { type: '' };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    authenticateInvoker: 'done.invoke.server.Initialized.Authenticating:invocation[0]';
  };
  missingImplementations: {
    actions:
      | 'onUnauthenticated'
      | 'onInitialized'
      | 'onAuthenticating'
      | 'onAuthenticateError'
      | 'onAuthenticateSuccess';
    services: 'authenticateInvoker';
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    authenticateInvoker: 'AUTHENTICATE';
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | 'Idle'
    | 'Initialized'
    | 'Initialized.Unauthenticated'
    | 'Initialized.Authenticating'
    | 'Initialized.AuthenticatingError'
    | 'Initialized.Authenticated'
    | { Initialized?: 'Unauthenticated' | 'Authenticating' | 'AuthenticatingError' | 'Authenticated' };
  tags: never;
}
