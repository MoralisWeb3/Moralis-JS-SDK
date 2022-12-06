import { EvmAuthClient, EvmProviderName } from '@moralisweb3/client-evm-auth';
import { Credentials } from '@moralisweb3/client-adapter-utils';
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';

export interface SignInWithMoralisResponse {
  provider: JsonRpcProvider | Web3Provider;
  credentials: Credentials;
}

export async function signInWithMoralis(
  evmAuthClient: EvmAuthClient,
  providerName?: EvmProviderName,
): Promise<SignInWithMoralisResponse> {
  await evmAuthClient.signIn(providerName);

  const credentials = await evmAuthClient.tryGetCredentials();
  if (!credentials) {
    throw new Error('Cannot read credentials');
  }

  return {
    provider: await evmAuthClient.restoreProvider(),
    credentials,
  };
}
