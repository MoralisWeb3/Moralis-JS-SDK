import { AuthConfig } from '../../AuthRouter';
import { NextFunction, Response, Request } from 'express';
import { OperationResolver } from '@moralisweb3/api-utils';
import { RequestChallengeEvmJSONRequest, requestChallengeEvmOperation } from 'moralis/common-auth-utils';
import Moralis from 'moralis';
import ms from 'ms';

type RequestBody = Pick<
  RequestChallengeEvmJSONRequest,
  'domain' | 'chainId' | 'address' | 'statement' | 'uri' | 'expirationTime' | 'notBefore' | 'resources' | 'timeout'
>;

export const authRequestChallengeEvmResolver = async (
  req: Request<undefined, undefined, RequestBody, undefined>,
  res: Response,
  next: NextFunction,
  authConfig: AuthConfig,
) => {
  try {
    const expirationTime = new Date(Date.now() + ms(authConfig?.sessionMaxAge || '30 days'));

    const data = await new OperationResolver(requestChallengeEvmOperation, Moralis.Auth.baseUrl, Moralis.Core).fetch(
      requestChallengeEvmOperation.deserializeRequest(
        { ...req.body, ...authConfig.challenge, expirationTime },
        Moralis.Core,
      ),
    );

    return res.send(data?.raw);
  } catch (error) {
    return next(error);
  }
};
