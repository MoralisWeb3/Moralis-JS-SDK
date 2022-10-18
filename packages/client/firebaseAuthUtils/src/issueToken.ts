import { httpsCallable } from '@firebase/functions';
import { MoralisAuth } from './getMoralisAuth';
import { SignInContext } from './requestMessage';

export interface IssueTokenOptions {
  /**
   * @description Sign-in context.
   */
  context: SignInContext;

  /**
   * @description Signed message by user's wallet.
   */
  signature: string;
}

interface IssueTokenRawResponse {
  token: string;
}

export async function issueToken(auth: MoralisAuth, options: IssueTokenOptions): Promise<string> {
  const functionName = auth.functionNamePrefix.concat('issueToken');
  const response = await httpsCallable<unknown, IssueTokenRawResponse>(
    auth.functions,
    functionName,
  )({
    networkType: options.context.networkType,
    message: options.context.message,
    signature: options.signature,
  });
  return response.data.token;
}
