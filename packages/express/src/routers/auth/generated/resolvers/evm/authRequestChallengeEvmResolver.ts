import {
  RequestChallengeEvmJSONRequest,
  requestChallengeEvmOperation,
} from 'moralis/common-auth-utils';
import { NextFunction, Response, Request } from 'express';
import { OperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';
import { AuthConfig } from '../../AuthRouter';


type RequestBody = Pick<RequestChallengeEvmJSONRequest, | 'domain'| 'chainId'| 'address'| 'statement'| 'uri'| 'expirationTime'| 'notBefore'| 'resources'| 'timeout'>

export const authRequestChallengeEvmResolver  = async (
  req: Request<undefined, undefined, RequestBody, undefined>,
  res: Response,
  next: NextFunction,
  authConfig: AuthConfig,
) => {
  try {
    const data = await new OperationResolver(requestChallengeEvmOperation, Moralis.Auth.baseUrl, Moralis.Core).fetch(
      requestChallengeEvmOperation.deserializeRequest({  ...req.body, ...authConfig }, Moralis.Core),
    );

    return res.send(data?.raw);
  } catch (error) {
    return next(error);
  }
};