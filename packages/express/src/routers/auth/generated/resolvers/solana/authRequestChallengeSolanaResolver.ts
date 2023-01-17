import {
  RequestChallengeSolanaJSONRequest,
  requestChallengeSolanaOperation,
} from 'moralis/common-auth-utils';
import { NextFunction, Response, Request } from 'express';
import { OperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';
import { AuthConfig } from '../../AuthRouter';


type RequestBody = Pick<RequestChallengeSolanaJSONRequest, | 'domain'| 'network'| 'address'| 'statement'| 'uri'| 'expirationTime'| 'notBefore'| 'resources'| 'timeout'>

export const authRequestChallengeSolanaResolver  = async (
  req: Request<undefined, undefined, RequestBody, undefined>,
  res: Response,
  next: NextFunction,
  authConfig: AuthConfig, 
) => {
  try {
    const data = await new OperationResolver(requestChallengeSolanaOperation, Moralis.Auth.baseUrl, Moralis.Core).fetch(
      requestChallengeSolanaOperation.deserializeRequest({  ...req.body, ...authConfig }, Moralis.Core),
    );

    return res.send(data?.raw);
  } catch (error) {
    return next(error);
  }
};