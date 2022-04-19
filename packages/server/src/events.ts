export enum ServerEvent {
  INITIALIZED = 'Initialized',
  AUTHENTICATING = 'Authenticating',
  AUTHENTICATED = 'Authenticated',
  AUTHENTICATING_ERROR = 'Authenticating Error',
  LOGOUT = 'Logout',
}

export type OnInitializedCallback = () => void;
export type OnAuthenticatingCallback = () => void;
export type OnAuthenticatedCallback = () => void;
export type OnAuthenticatingErrorCallback = (error: Error) => void;
export type OnLogoutCallback = () => void;
