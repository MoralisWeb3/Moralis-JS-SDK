import { EvmChainish, EvmChainParser } from '@moralisweb3/evm-utils';

export class EvmApiConfigValidator {
  public static requireValidChain(value: EvmChainish) {
    // TODO: validate if chain is valid api chain
    if (typeof value === 'string' || typeof value === 'number') {
      try {
        EvmChainParser.parse(value);
      } catch (error) {
        return error.message;
      }
    }
    return null;
  }
}
