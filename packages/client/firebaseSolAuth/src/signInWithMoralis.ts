import { getAuth, signInWithCustomToken, UserCredential } from '@firebase/auth';
import { SolAuthClient, SolAuthClientOptions, SolanaProvider } from '@moralisweb3/client-sol-auth';
import { MoralisFirebase } from '@moralisweb3/client-firebase-utils';

export interface SignInWithMoralisOptions extends SolAuthClientOptions {}

export interface SignInWithMoralisResponse {
  provider: SolanaProvider;
  credentials: UserCredential;
}

export async function signInWithMoralis(
  moralis: MoralisFirebase,
  options?: SignInWithMoralisOptions,
): Promise<SignInWithMoralisResponse> {
  const solAuthClient = SolAuthClient.create(moralis.backendAdapter, options, moralis.core);

  const result = await solAuthClient.signIn();

  const credentials = await signInWithCustomToken(getAuth(moralis.app), result.token);
  return {
    provider: result.provider,
    credentials,
  };
}
