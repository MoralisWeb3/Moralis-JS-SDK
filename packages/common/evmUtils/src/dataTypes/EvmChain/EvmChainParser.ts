import { CoreErrorCode, MoralisCoreError } from '@moralisweb3/core';
import { InputChainId } from './EvmChainish';

const INVALID_VALUES = ['0x', '0x0', '0', 0];

export class EvmChainParser {
  public static parse(chain: InputChainId): string {
    if (INVALID_VALUES.includes(chain)) {
      throw new MoralisCoreError({
        code: CoreErrorCode.INVALID_ARGUMENT,
        message: "Invalid provided chain, value must be a positive number, or a hex-string starting with '0x'",
      });
    }

    if (typeof chain === 'string') {
      if (chain.startsWith('0x')) {
        return chain;
      }

      try {
        const parsed = parseInt(chain, 10);
        if (Number.isNaN(parsed)) {
          throw new Error('Cannot parse the provided string value to a valid chain number');
        }
        return `0x${parsed.toString(16)}`;
      } catch (error) {
        throw new MoralisCoreError({
          code: CoreErrorCode.INVALID_ARGUMENT,
          message: "Invalid provided chain, value must be a positive number, or a hex-string starting with '0x'",
        });
      }
    }

    if (chain <= 0) {
      throw new MoralisCoreError({
        code: CoreErrorCode.INVALID_ARGUMENT,
        message: "Invalid provided chain, value must be a positive number, or a hex-string starting with '0x'",
      });
    }
    return `0x${chain.toString(16)}`;
  }
}
