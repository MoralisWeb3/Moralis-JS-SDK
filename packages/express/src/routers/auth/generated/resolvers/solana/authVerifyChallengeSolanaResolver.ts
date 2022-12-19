import {
  VerifyChallengeSolanaJSONRequest,
  verifyChallengeSolanaOperation,
} from 'moralis/common-auth-utils';
import { NextFunction, Response, Request } from 'express';
import { OperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';


type RequestBody = Pick<VerifyChallengeSolanaJSONRequest, | 'message'| 'signature'>


export const authVerifyChallengeSolanaResolver  = async (
  req: Request<any, any, RequestBody, any>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { raw } = await new OperationResolver(verifyChallengeSolanaOperation, Moralis.EvmApi.baseUrl, Moralis.Core).fetch(
      verifyChallengeSolanaOperation.deserializeRequest({  ...req.body,  }, Moralis.Core),
    );

    return res.send(raw);
  } catch (error) {
    return next(error);
  }
};