import { httpsCallable } from '@firebase/functions';
import { MoralisAuth } from './getMoralisAuth';
import { NetworkType } from './NetworkType';

export interface RequestEvmChallengeParams {
  address: string;
  chain: number;
}

export interface RequestSolanaChallengeParams {
  address: string;
  network: 'mainnet' | 'devnet';
}

export interface Challenge {
  networkType: NetworkType;
  message: string;
  uid: string;
}

interface RequestMessageRawResponse {
  id: string;
  message: string;
  profileId: string;
}

export function requestEvmChallenge(auth: MoralisAuth, params: RequestEvmChallengeParams): Promise<Challenge> {
  return requestChallenge(auth, {
    networkType: 'evm',
    evmAddress: params.address,
    evmChain: params.chain,
  });
}

export function requestSolanaChallenge(auth: MoralisAuth, params: RequestSolanaChallengeParams): Promise<Challenge> {
  return requestChallenge(auth, {
    networkType: 'solana',
    solAddress: params.address,
    solNetwork: params.network,
  });
}

interface RequestMessageParams {
  networkType: NetworkType;
  [key: string]: unknown;
}

async function requestChallenge(auth: MoralisAuth, params: RequestMessageParams): Promise<Challenge> {
  const functionName = auth.functionNamePrefix.concat('requestMessage');
  const response = await httpsCallable<unknown, RequestMessageRawResponse>(auth.functions, functionName)(params);
  return {
    networkType: params.networkType,
    message: response.data.message,
    uid: response.data.profileId,
  };
}
