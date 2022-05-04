import { AuthenticateData } from '../AuthMethods/types';

/**
 * Events fired by MoralisEvm upon changes in the network status
 */
export enum ServerEvent {
  INITIALIZED = 'Initialized',
  AUTHENTICATING = 'Authenticating',
  AUTHENTICATED = 'Authenticated',
  LOGGED_OUT = 'LoggedOut',
  AUTHENTICATING_ERROR = 'AuthenticatingError',
}

export type ServerEventMap = {
  [ServerEvent.INITIALIZED]: () => void;
  [ServerEvent.AUTHENTICATING]: () => void;
  [ServerEvent.AUTHENTICATED]: (data: AuthenticateData) => void;
  [ServerEvent.LOGGED_OUT]: () => void;
  [ServerEvent.AUTHENTICATING_ERROR]: (error: Error) => void;
};
