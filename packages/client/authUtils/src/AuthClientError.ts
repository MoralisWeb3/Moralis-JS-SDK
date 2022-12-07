export enum AuthClientErrorCode {
  GENERIC = 'CA0000',
  ALREADY_AUTHENTICATED = 'CA0001',
  NOT_AUTHENTICATED = 'CA0002',
}

// TODO: we don't use errors from the @moralisweb3/core package, because we would have a collision with the MoralisAuthError type.

export interface AuthClientErrorOptions {
  message: string;
  code: AuthClientErrorCode;
}

export class AuthClientError extends Error {
  public readonly code: AuthClientErrorCode;
  public readonly name: string = 'Moralis Auth Client Error';

  public constructor(options: AuthClientErrorOptions) {
    super(options.message);
    this.code = options.code;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthClientError);
    }
  }
}
