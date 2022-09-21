import { signInWithCustomToken, UserCredential } from '@firebase/auth';
import { httpsCallable } from '@firebase/functions';
import { MoralisAuth } from './getMoralisAuth';
import { SignInContext } from './requestMessage';

export interface SignInWithMoralisParams {
  /**
   * @description Sign-in context.
   */
  context: SignInContext;

  /**
   * @description Signed message by user's wallet.
   */
  signature: string;
}

interface SignInWithMoralisRawResponse {
  token: string;
}

export async function signInWithMoralis(auth: MoralisAuth, params: SignInWithMoralisParams): Promise<UserCredential> {
  const functionName = auth.functionNamePrefix.concat('issueToken');
  const response = await httpsCallable<unknown, SignInWithMoralisRawResponse>(
    auth.functions,
    functionName,
  )({
    networkType: params.context.networkType,
    message: params.context.message,
    signature: params.signature,
  });

  const credential = await signInWithCustomToken(auth.auth, response.data.token);
  return credential;
}
