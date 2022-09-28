import { MoralisStreamError, StreamErrorCode } from '@moralisweb3/core';
import { StreamNetwork } from './StreamNetwork';

export class IncorrectNetworkError extends MoralisStreamError {
  constructor(network: string) {
    super({
      code: StreamErrorCode.INCORRECT_NETWORK,
      message: `Incorrect network provided. Got "${network}", Valid values are: ${Object.values(StreamNetwork)
        .map((value) => `"${value}"`)
        .join(', ')}`,
    });
  }
}
