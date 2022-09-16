import { httpsCallable } from '@firebase/functions';
import { MoralisAuth } from './getMoralisAuth';

export interface RequestMessageParams {
  address: string;
  chain: number;
}

interface RequestMessageRawResponse {
  id: string;
  message: string;
  profileId: string;
}

export interface RequestMessageResponse {
  message: string;
  uid: string;
}

export async function requestMessage(auth: MoralisAuth, params: RequestMessageParams): Promise<RequestMessageResponse> {
  const functionName = auth.functionNamePrefix.concat('requestMessage');
  const response = await httpsCallable<unknown, RequestMessageRawResponse>(
    auth.functions,
    functionName,
  )({
    address: params.address,
    chain: params.chain,
  });
  return {
    message: response.data.message,
    uid: response.data.profileId,
  };
}
