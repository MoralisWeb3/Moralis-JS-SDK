import { RequestChallengeEvmJSONRequest, requestChallengeEvmOperation } from 'moralis/common-auth-utils';
import { NextFunction, Response, Request } from 'express';
import { OperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

type RequestBody = Pick<
  RequestChallengeEvmJSONRequest,
  'domain' | 'chainId' | 'address' | 'statement' | 'uri' | 'expirationTime' | 'notBefore' | 'resources' | 'timeout'
>;

export const authRequestChallengeEvmResolver = async (
  req: Request<any, any, RequestBody, any>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { raw } = await new OperationResolver(requestChallengeEvmOperation, Moralis.Auth.baseUrl, Moralis.Core).fetch(
      requestChallengeEvmOperation.deserializeRequest({ ...req.body }, Moralis.Core),
    );

    return res.send(raw);
  } catch (error) {
    return next(error);
  }
};
