import { EvmApiClient } from '@moralisweb3/client-evm-api';
import { MoralisFirebase } from '@moralisweb3/client-firebase-utils';
import { CommonEvmUtils } from '@moralisweb3/common-evm-utils';

export function getMoralisEvmApi(moralis: MoralisFirebase): EvmApiClient {
  const evmUtils = CommonEvmUtils.create(moralis.core);
  const evmApiClient = EvmApiClient.create(moralis.backendAdapter, moralis.core);

  moralis.core.registerModules([evmUtils, evmApiClient]);
  return evmApiClient;
}
