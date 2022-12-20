import {
  GetNFTMetadataJSONRequest,
  getNFTMetadataOperation,
} from 'moralis/common-sol-utils';
import { NextFunction, Response, Request } from 'express';
import { OperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

type RequestParams = Pick<GetNFTMetadataJSONRequest, | 'network'| 'address'>



export const solGetNFTMetadataResolver  = async (
  req: Request<RequestParams, any, any, any>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { raw } = await new OperationResolver(getNFTMetadataOperation, Moralis.SolApi.baseUrl, Moralis.Core).fetch(
      getNFTMetadataOperation.deserializeRequest({ ...req.params,   }, Moralis.Core),
    );

    return res.send(raw);
  } catch (error) {
    return next(error);
  }
};