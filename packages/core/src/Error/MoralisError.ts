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

export interface NewMoralisOptions<ErrorCode extends MoralisErrorCode> {
  message: string;
  code: ErrorCode;
  details?: MoralisErrorDetails;
  cause?: Error;
}

export class MoralisError extends Error {
  name: string;
  // message: string;
  code: MoralisErrorCode;
  details?: MoralisErrorDetails;
  cause?: Error | MoralisError;
  isMoralisError = true;

  static makeMessage = (message: string, code: MoralisErrorCode) => `[${code}] ${message}`;

  constructor({ message, code, details, cause }: NewMoralisOptions<MoralisErrorCode>) {
    // TODO: polyfill / ponyfill the 'cause' behaviour and Test with NODJS < 16
    // @ts-ignore Typescript does not recognise 'cause' ? OR we have wrong TS version
    super(MoralisError.makeMessage(message, code), { cause });

    // Set prototype manually, as required since Typescript 2.2: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#example
    Object.setPrototypeOf(this, MoralisError.prototype);

    this.name = 'Moralis SDK Error';
    // this.message = message;
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

  // get stack() {
  //   if (!this._error.stack) return '';
  //   return 'LOL is this an error?';
  //   // return 'Error\n' + this._error.stack.split('\n').slice(2).join('\n');
  // }

  // get why() {
  //   console.log('CALLING WHY');
  //   function _msg(message: string) {
  //     return message ? ': ' + message : '';
  //   }
  //   let _why = this.name + _msg(this.message);
  //   for (let i = 1; i < this.chain.length; i++) {
  //     const e = this.chain[i];
  //     _why += ' <- ' + e.name + _msg(e.message);
  //   }
  //   return _why;
  // }

  // get stacks() {
  //   let _stacks = this.stack;
  //   for (let i = 1; i < this.chain.length; i++) {
  //     const e = this.chain[i];
  //     _stacks += '\n<- ' + e.stack;
  //   }
  //   return _stacks;
  // }

  // hasCause(name: string) {
  //   return this.chain.some(function (e) {
  //     return e.name === name;
  //   });
  // }

  // toJSON() {
  //   return {
  //     name: this.name,
  //     message: this.message,
  //     details: this.details,
  //     code: this.code,
  //     why: this.why,
  //     stacks: this.stacks,
  //   };
  // }

  // toString() {
  //   return `Moralis SDK Error [${this.code}]: ${this.name} ${this.message}`;
  // }
}

export class MoralisCoreError extends MoralisError {
  constructor(options: NewMoralisOptions<CoreErrorCode>) {
    super(options);

    this.name = 'Moralis SDK Core Error';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MoralisCoreError);
    }
  }
}

export class MoralisServerError extends MoralisError {
  constructor(options: NewMoralisOptions<ServerErrorCode>) {
    super(options);

    this.name = 'Moralis SDK Server Error';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MoralisServerError);
    }
  }
}

export class MoralisNetworkError extends MoralisError {
  constructor(options: NewMoralisOptions<NetworkErrorCode>) {
    super(options);
    Object.setPrototypeOf(this, MoralisNetworkError.prototype);

    this.name = 'Moralis SDK Network Error';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MoralisNetworkError);
    }
  }
}

export class MoralisNetworkConnectorError extends MoralisError {
  constructor(options: NewMoralisOptions<NetworkConnectorErrorCode>) {
    super(options);

    this.name = 'Moralis SDK NetworkConnector Error';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MoralisNetworkConnectorError);
    }
  }
}

export class MoralisApiError extends MoralisError {
  constructor(options: NewMoralisOptions<ApiErrorCode>) {
    super(options);

    this.name = 'Moralis SDK API Error';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MoralisApiError);
    }
  }
}

export class MoralisUtilsError extends MoralisError {
  constructor(options: NewMoralisOptions<UtilsErrorCode>) {
    super(options);

    this.name = 'MoralisUtilsError';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MoralisUtilsError);
    }
  }
}
