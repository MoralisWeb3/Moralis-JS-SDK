import { EvmAuthClient, EvmAuthClientOptions } from '@moralisweb3/client-evm-auth';
import { MoralisFirebase } from '@moralisweb3/client-firebase-utils';

export interface GetMoralisEvmAuthOptions extends EvmAuthClientOptions {}

export function getMoralisEvmAuth(moralis: MoralisFirebase, options?: GetMoralisEvmAuthOptions): EvmAuthClient {
  return EvmAuthClient.create(moralis.authProvider, options, moralis.core);
}
