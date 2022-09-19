import { signInWithCustomToken, UserCredential } from '@firebase/auth';
import { httpsCallable } from '@firebase/functions';
import { MoralisAuth } from './getMoralisAuth';
import { Challenge } from './requestChallenge';

export interface SignInWithMoralisParams {
  challenge: Challenge;
  signature: string;
}

export interface SignInWithMoralisResponse {
  token: string;
}

export async function signInWithMoralis(auth: MoralisAuth, params: SignInWithMoralisParams): Promise<UserCredential> {
  const functionName = auth.functionNamePrefix.concat('issueToken');
  const response = await httpsCallable<unknown, SignInWithMoralisResponse>(
    auth.functions,
    functionName,
  )({
    networkType: params.challenge.networkType,
    message: params.challenge.message,
    signature: params.signature,
  });

  const credential = await signInWithCustomToken(auth.auth, response.data.token);
  return credential;
}
