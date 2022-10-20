import { MoralisCore } from '@moralisweb3/core';
import { EvmUtilsConfig } from './config/EvmUtilsConfig';
import { EvmChain, EvmChainish } from './dataTypes';

export class EvmChainResolver {
  public static resolve(chain: EvmChainish | undefined, core: MoralisCore): EvmChain {
    if (chain) {
      return EvmChain.create(chain, core);
    }

    const defaultEvmChain = core.config.get(EvmUtilsConfig.defaultEvmApiChain);
    return EvmChain.create(defaultEvmChain, core);
  }
}
