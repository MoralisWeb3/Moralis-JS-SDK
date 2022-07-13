export class ReactMoralisError extends Error {
  static isReactMoralisError = true;

  constructor(message: string) {
    super(`[@moralisweb3/react]: ${message}`);
    this.name = 'ReactMoralisError';
    this.message = message;
  }
}

export class NoMoralisContextProviderError extends ReactMoralisError {
  constructor(message: string) {
    super(message);
    this.name = 'NoMoralisContextProviderError';
  }
}
