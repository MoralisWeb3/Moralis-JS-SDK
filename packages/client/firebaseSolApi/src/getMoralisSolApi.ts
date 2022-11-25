import { SolApiClient } from '@moralisweb3/client-sol-api';
import { MoralisFirebase } from '@moralisweb3/client-firebase-utils';

export function getMoralisSolApi(moralis: MoralisFirebase): SolApiClient {
  return SolApiClient.create(moralis.backendAdapter, moralis.core);
}
