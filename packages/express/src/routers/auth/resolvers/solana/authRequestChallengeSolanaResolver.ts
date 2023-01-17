import { AuthConfig } from '../../AuthRouter';
import { NextFunction, Response, Request } from 'express';
import { OperationResolver } from '@moralisweb3/api-utils';
import { RequestChallengeSolanaJSONRequest, requestChallengeSolanaOperation } from 'moralis/common-auth-utils';
import Moralis from 'moralis';
import ms from 'ms';

type RequestBody = Pick<
  RequestChallengeSolanaJSONRequest,
  'domain' | 'network' | 'address' | 'statement' | 'uri' | 'expirationTime' | 'notBefore' | 'resources' | 'timeout'
>;

export const authRequestChallengeSolanaResolver = async (
  req: Request<undefined, undefined, RequestBody, undefined>,
  res: Response,
  next: NextFunction,
  authConfig: AuthConfig,
) => {
  try {
    const expirationTime = new Date(Date.now() + ms(authConfig?.sessionMaxAge || '30 days'));

    const data = await new OperationResolver(requestChallengeSolanaOperation, Moralis.Auth.baseUrl, Moralis.Core).fetch(
      requestChallengeSolanaOperation.deserializeRequest({ ...req.body, ...authConfig.challenge, expirationTime }, Moralis.Core),
    );

    return res.send(data?.raw);
  } catch (error) {
    return next(error);
  }
};
