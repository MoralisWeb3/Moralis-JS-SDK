import { EvmApiClient } from '@moralisweb3/client-evm-api';
import { MoralisFirebase } from '@moralisweb3/client-firebase-utils';

export function getMoralisEvmApi(moralis: MoralisFirebase): EvmApiClient {
  return EvmApiClient.create(moralis.backendAdapter, moralis.core);
}
