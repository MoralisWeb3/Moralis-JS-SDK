import {
  MoralisErrorCode,
  CoreErrorCode,
  ServerErrorCode,
  NetworkErrorCode,
  NetworkConnectorErrorCode,
  ApiErrorCode,
  UtilsErrorCode,
} from './ErrorCode';

export type MoralisErrorDetails = Record<string, unknown>;

export interface MoralisErrorOptions<ErrorCode extends MoralisErrorCode> {
  message: string;
  code: ErrorCode;
  details?: MoralisErrorDetails;
  cause?: Error;
}

export class MoralisError extends Error {
  public readonly name: string = 'Moralis SDK Error';
  public readonly code: MoralisErrorCode;
  public readonly details?: MoralisErrorDetails;
  public readonly cause?: Error | MoralisError;
  public readonly isMoralisError = true;

  private static makeMessage = (message: string, code: MoralisErrorCode) => `[${code}] ${message}`;

  public constructor({ message, code, details, cause }: MoralisErrorOptions<MoralisErrorCode>) {
    // @ts-ignore Typescript does not recognise 'cause' ? OR we have wrong TS version
    super(MoralisError.makeMessage(message, code), { cause });

    // Set prototype manually, as required since Typescript 2.2: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#example
    Object.setPrototypeOf(this, MoralisError.prototype);

    this.code = code;
    this.details = details;

    if (cause) {
      this.cause = cause;

      if ('stack' in cause) {
        this.stack = this.stack + '\nCAUSE: ' + cause.stack;
      }
    }

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MoralisError);
    }
  }
}

export class MoralisCoreError extends MoralisError {
  public readonly name: string = 'Moralis SDK Core Error';

  public constructor(options: MoralisErrorOptions<CoreErrorCode>) {
    super(options);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MoralisCoreError);
    }
  }
}

export class MoralisServerError extends MoralisError {
  public readonly name: string = 'Moralis SDK Server Error';

  public constructor(options: MoralisErrorOptions<ServerErrorCode>) {
    super(options);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MoralisServerError);
    }
  }
}

export class MoralisNetworkError extends MoralisError {
  public readonly name: string = 'Moralis SDK Network Error';

  public constructor(options: MoralisErrorOptions<NetworkErrorCode>) {
    super(options);
    Object.setPrototypeOf(this, MoralisNetworkError.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MoralisNetworkError);
    }
  }
}

export class MoralisNetworkConnectorError extends MoralisError {
  public readonly name: string = 'Moralis SDK NetworkConnector Error';

  public constructor(options: MoralisErrorOptions<NetworkConnectorErrorCode>) {
    super(options);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MoralisNetworkConnectorError);
    }
  }
}

export class MoralisApiError extends MoralisError {
  public readonly name: string = 'Moralis SDK API Error';

  public constructor(options: MoralisErrorOptions<ApiErrorCode>) {
    super(options);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MoralisApiError);
    }
  }
}

export class MoralisUtilsError extends MoralisError {
  public readonly name: string = 'Moralis SDK Utils Error';

  public constructor(options: MoralisErrorOptions<UtilsErrorCode>) {
    super(options);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MoralisUtilsError);
    }
  }
}
