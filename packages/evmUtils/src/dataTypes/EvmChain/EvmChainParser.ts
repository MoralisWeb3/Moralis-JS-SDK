import { CoreErrorCode, MoralisCoreError } from '@moralisweb3/core';
import { InputChainId } from './EvmChainish';

export class EvmChainParser {
  public static parse(chain: InputChainId): string {
    if (typeof chain === 'string') {
      if (chain.startsWith('0x') && chain !== '0x' && chain !== '0x0') {
        return chain;
      }

      throw new MoralisCoreError({
        code: CoreErrorCode.INVALID_ARGUMENT,
        message: "Invalid provided chain, value must be a positive number, or a hex-string starting with '0x'",
      });
    }

    if (chain <= 0) {
      throw new MoralisCoreError({
        code: CoreErrorCode.INVALID_ARGUMENT,
        message:
          "Invalid provided chain, value must be a positive number, chain-name or a hex-string starting with '0x'",
      });
    }
    return `0x${chain.toString(16)}`;
  }
}
