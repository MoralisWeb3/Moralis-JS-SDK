import { Core } from '@moralisweb3/common-core';
import { CommonEvmUtilsConfig } from './config/CommonEvmUtilsConfig';
import { EvmChain, EvmChainish } from './dataTypes';

export class EvmChainResolver {
  public static resolve(chain: EvmChainish | undefined, core: Core): EvmChain {
    if (chain) {
      return EvmChain.create(chain, core);
    }

    const defaultEvmChain = core.config.get(CommonEvmUtilsConfig.defaultEvmApiChain);
    return EvmChain.create(defaultEvmChain, core);
  }
}
