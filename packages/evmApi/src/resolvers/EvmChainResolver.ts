import { CoreConfig, EvmChain, EvmChainish, MoralisCoreProvider } from '@moralisweb3/core';

export class EvmChainResolver {
  public static resolve(chain?: EvmChainish): EvmChain {
    if (chain) {
      return EvmChain.create(chain);
    }

    const core = MoralisCoreProvider.getDefault();
    const defaultEvmChain = core.config.get(CoreConfig.defaultEvmApiChain);
    return EvmChain.create(defaultEvmChain);
  }
}
