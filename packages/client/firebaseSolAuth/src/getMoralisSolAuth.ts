import { MoralisFirebase } from '@moralisweb3/client-firebase-utils';
import { SolAuthClient, SolAuthClientOptions } from '@moralisweb3/client-sol-auth';

export interface GetMoralisSolAuthOptions extends SolAuthClientOptions {}

export function getMoralisSolAuth(moralis: MoralisFirebase, options?: GetMoralisSolAuthOptions): SolAuthClient {
  return SolAuthClient.create(moralis.authProvider, options, moralis.core);
}
