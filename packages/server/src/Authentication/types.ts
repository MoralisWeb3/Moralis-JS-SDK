import { InitEvent } from '@moralis/core';
import { AuthenticateData, AuthMethod } from '../AuthMethods/types';

export interface AuthenticateEventOptions {
  method: AuthMethod;
  options?: Record<string, unknown>;
}
export interface StateContext {
  wallet?: string;
  options?: Record<string, unknown>;
  error?: Error;
}

export interface AuthenticateEvent {
  type: 'AUTHENTICATE';
  data: AuthenticateEventOptions;
}
export interface AuthenticateSuccessEvent {
  type: 'AUTHENTICATE_SUCCESS';
  data: AuthenticateData;
}
export interface AuthenticateErrorEvent {
  type: 'AUTHENTICATE_ERROR';
  data: Error;
}
export interface LogoutEvent {
  type: 'LOGOUT';
}

export type StateEvent =
  | InitEvent
  | AuthenticateEvent
  | AuthenticateSuccessEvent
  | AuthenticateErrorEvent
  | LogoutEvent;

export type State =
  | {
      value: 'Unauthenticated';
      context: StateContext & {};
    }
  | {
      value: 'Authenticating';
      context: StateContext & {};
    }
  | {
      value: 'Authenticated';
      context: StateContext & {};
    };
