import { getAuth, signInWithCustomToken, UserCredential } from '@firebase/auth';
import { EvmAuthClient, EvmAuthClientOptions } from '@moralisweb3/client-evm-auth';
import { MoralisFirebase } from '@moralisweb3/client-firebase-utils';
import { JsonRpcProvider } from '@ethersproject/providers';

export interface SignInWithMoralisOptions extends EvmAuthClientOptions {}

export interface SignInWithMoralisResponse {
  provider: JsonRpcProvider;
  credentials: UserCredential;
}

export async function signInWithMoralis(
  moralis: MoralisFirebase,
  options?: SignInWithMoralisOptions,
): Promise<SignInWithMoralisResponse> {
  const evmAuthClient = EvmAuthClient.create(moralis.backendAdapter, options, moralis.core);

  const result = await evmAuthClient.signIn();

  const credentials = await signInWithCustomToken(getAuth(moralis.app), result.token);
  return {
    provider: result.provider,
    credentials,
  };
}
