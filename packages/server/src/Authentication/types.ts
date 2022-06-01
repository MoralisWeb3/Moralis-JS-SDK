import { InitEvent } from '@moralisweb3/core';
import { AuthenticateData, AuthMethod } from '../AuthMethods/types';
import { UserDataValue } from '../utils/setUserData';

// TODO combine with authmethods types
export interface AuthenticateEventOptions {
  method: AuthMethod;
  options?: Record<string, unknown>;
}

export interface SignUpEventOptions {
  method: AuthMethod.SIGN_UP;
  options: {
    password: string;
    username: string;
    email?: string;
    fields?: Record<string, UserDataValue>;
  };
}
export interface SignInEventOptions {
  method: AuthMethod.SIGN_IN;
  options: {
    username: string;
    password: string;
  };
}
export interface StateContext {
  wallet?: string;
  options?: Record<string, unknown>;
  error?: Error;
}

export interface AuthenticateEvent {
  type: 'NETWORK_AUTHENTICATE';
  data: AuthenticateEventOptions;
}

export interface SignUpEvent {
  type: 'SIGN_UP';
  data: SignUpEventOptions;
}

export interface SignInEvent {
  type: 'SIGN_IN';
  data: SignInEventOptions;
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
  | SignUpEvent
  | SignInEvent
  | AuthenticateSuccessEvent
  | AuthenticateErrorEvent
  | LogoutEvent;

export type State =
  | {
      value: 'Unauthenticated';
      context: StateContext;
    }
  | {
      value: 'Authenticating';
      context: StateContext;
    }
  | {
      value: 'Authenticated';
      context: StateContext;
    };
