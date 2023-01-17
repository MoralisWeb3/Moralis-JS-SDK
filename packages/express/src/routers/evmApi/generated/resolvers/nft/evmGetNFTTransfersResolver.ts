import {
  GetNFTTransfersJSONRequest,
  getNFTTransfersOperation,
} from 'moralis/common-evm-utils';
import { NextFunction, Response, Request } from 'express';
import { PaginatedOperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

type RequestParams = Pick<GetNFTTransfersJSONRequest, | 'address'| 'tokenId'>

type RequestQuery = Pick<GetNFTTransfersJSONRequest, | 'chain'| 'format'| 'limit'| 'cursor'>

export const evmGetNFTTransfersResolver  = async (
  req: Request<RequestParams, undefined, undefined, RequestQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await new PaginatedOperationResolver(getNFTTransfersOperation, Moralis.EvmApi.baseUrl, Moralis.Core).fetch(
      getNFTTransfersOperation.deserializeRequest({ ...req.params,  ...req.query, }, Moralis.Core),
    );

    return res.send(data?.raw);
  } catch (error) {
    return next(error);
  }
};