import { ApiUtilsConfigValues } from '@moralisweb3/api-utils';
import { RequestChallengeEvmRequest, RequestChallengeSolanaRequest } from '@moralisweb3/common-auth-utils';
import { Core } from 'moralis/common-core';
import type { NextApiRequest, NextApiResponse } from 'next';

export type MoralisNextApiParams = ApiUtilsConfigValues & {
  authentication?: AuthConfig;
};

export type AuthConfig = Omit<RequestChallengeEvmRequest | RequestChallengeSolanaRequest, 'address' | 'chainId'>;

export interface MoralisNextHandlerParams {
  req: NextApiRequest;
  res: NextApiResponse;
  authentication?: AuthConfig;
  core: Core;
}
