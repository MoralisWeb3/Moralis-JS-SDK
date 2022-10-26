import { Core } from '@moralisweb3/common-core';
import { EvmChain, EvmChainish, EvmChainResolver as CommonEvmChainResolver } from '@moralisweb3/common-evm-utils';

// TODO: we need to remove this class after refactor.
export class EvmChainResolver {
  public static resolve(chain: EvmChainish | undefined, core: Core): EvmChain {
    return CommonEvmChainResolver.resolve(chain, core);
  }
}
