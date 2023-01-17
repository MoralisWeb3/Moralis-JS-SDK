import {
  GetNFTsJSONRequest,
  getNFTsOperation,
} from 'moralis/common-sol-utils';
import { NextFunction, Response, Request } from 'express';
import { OperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

type RequestParams = Pick<GetNFTsJSONRequest, | 'network'| 'address'>



export const solGetNFTsResolver  = async (
  req: Request<RequestParams, undefined, undefined, undefined>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await new OperationResolver(getNFTsOperation, Moralis.SolApi.baseUrl, Moralis.Core).fetch(
      getNFTsOperation.deserializeRequest({ ...req.params,   }, Moralis.Core),
    );

    return res.send(data?.raw);
  } catch (error) {
    return next(error);
  }
};