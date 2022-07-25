import { MoralisCoreProvider } from '@moralisweb3/core';
import { EvmChain, EvmChainish } from '@moralisweb3/evm-utils';
import { EvmApiConfig } from '../config/EvmApiConfig';

export class EvmChainResolver {
  public static resolve(chain?: EvmChainish): EvmChain {
    if (chain) {
      return EvmChain.create(chain);
    }

    const core = MoralisCoreProvider.getDefault();
    const defaultEvmChain = core.config.get(EvmApiConfig.defaultEvmApiChain);
    return EvmChain.create(defaultEvmChain);
  }
}
