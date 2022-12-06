import { SolApiClient } from '@moralisweb3/client-sol-api';
import { MoralisFirebase } from '@moralisweb3/client-firebase-utils';
import { CommonSolUtils } from '@moralisweb3/common-sol-utils';

export function getMoralisSolApi(moralis: MoralisFirebase): SolApiClient {
  const solUtils = CommonSolUtils.create(moralis.core);
  const solApiClient = SolApiClient.create(moralis.apiAdapter, moralis.core);

  moralis.core.registerModules([solUtils, solApiClient]);
  return solApiClient;
}
