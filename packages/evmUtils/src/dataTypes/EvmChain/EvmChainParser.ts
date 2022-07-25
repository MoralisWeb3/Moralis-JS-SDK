import { CoreErrorCode, MoralisCoreError } from '@moralisweb3/core';
import { ChainName, InputChainId } from './EvmChainish';

const isSupportedChainName = (value: string): value is ChainName => {
  return value in chainNameToChainIdMap;
};

const chainNameToChainIdMap = {
  eth: '0x1',
  ropsten: '0x3',
  rinkeby: '0x4',
  goerli: '0x5',
  kovan: '0x2a',
  polygon: '0x89',
  mumbai: '0x13881',
  bsc: '0x38',
  'bsc testnet': '0x61',
  avalanche: '0xa86a',
  'avalanche testnet': '0xa869',
  fantom: '0xfa',
} as const;

export class EvmChainParser {
  public static parse(chain: InputChainId): string {
    if (typeof chain === 'string') {
      if (isSupportedChainName(chain)) {
        return chainNameToChainIdMap[chain];
      }

      if (chain.startsWith('0x') && chain !== '0x' && chain !== '0x0') {
        return chain;
      }
      throw new MoralisCoreError({
        code: CoreErrorCode.INVALID_ARGUMENT,
        message:
          "Invalid provided chain, value must be a positive number, chain-name or a hex-string starting with '0x'",
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
