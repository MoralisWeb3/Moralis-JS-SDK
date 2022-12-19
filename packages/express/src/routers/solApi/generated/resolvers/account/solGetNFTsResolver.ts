import {
  GetNFTsJSONRequest,
  getNFTsOperation,
} from 'moralis/common-sol-utils';
import { NextFunction, Response, Request } from 'express';
import { OperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

type RequestParams = Pick<GetNFTsJSONRequest, | 'network'| 'address'>



export const solGetNFTsResolver  = async (
  req: Request<RequestParams, any, any, any>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { raw } = await new OperationResolver(getNFTsOperation, Moralis.EvmApi.baseUrl, Moralis.Core).fetch(
      getNFTsOperation.deserializeRequest({ ...req.params,   }, Moralis.Core),
    );

    return res.send(raw);
  } catch (error) {
    return next(error);
  }
};