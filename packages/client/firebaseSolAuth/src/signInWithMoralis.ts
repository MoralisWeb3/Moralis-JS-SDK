import { SolAuthClient, SolanaProvider } from '@moralisweb3/client-sol-auth';
import { Credentials } from '@moralisweb3/client-adapter-utils';

export interface SignInWithMoralisResponse {
  solanaProvider: SolanaProvider;
  credentials: Credentials;
}

export async function signInWithMoralis(solAuthClient: SolAuthClient): Promise<SignInWithMoralisResponse> {
  await solAuthClient.signIn();
  const credentials = await solAuthClient.tryGetCredentials();
  if (!credentials) {
    throw new Error('Cannot read credentials');
  }

  return {
    solanaProvider: await solAuthClient.restoreProvider(),
    credentials,
  };
}
