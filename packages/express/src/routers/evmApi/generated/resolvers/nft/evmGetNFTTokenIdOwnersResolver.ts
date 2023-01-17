import {
  GetNFTTokenIdOwnersJSONRequest,
  getNFTTokenIdOwnersOperation,
} from 'moralis/common-evm-utils';
import { NextFunction, Response, Request } from 'express';
import { PaginatedOperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

type RequestParams = Pick<GetNFTTokenIdOwnersJSONRequest, | 'address'| 'tokenId'>

type RequestQuery = Pick<GetNFTTokenIdOwnersJSONRequest, | 'chain'| 'format'| 'limit'| 'cursor'| 'normalizeMetadata'>

export const evmGetNFTTokenIdOwnersResolver  = async (
  req: Request<RequestParams, undefined, undefined, RequestQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await new PaginatedOperationResolver(getNFTTokenIdOwnersOperation, Moralis.EvmApi.baseUrl, Moralis.Core).fetch(
      getNFTTokenIdOwnersOperation.deserializeRequest({ ...req.params,  ...req.query, }, Moralis.Core),
    );

    return res.send(data?.raw);
  } catch (error) {
    return next(error);
  }
};