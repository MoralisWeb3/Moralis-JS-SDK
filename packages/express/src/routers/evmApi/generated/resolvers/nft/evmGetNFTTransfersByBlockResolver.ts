import {
  GetNFTTransfersByBlockJSONRequest,
  getNFTTransfersByBlockOperation,
} from 'moralis/common-evm-utils';
import { NextFunction, Response, Request } from 'express';
import { PaginatedOperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

type RequestParams = Pick<GetNFTTransfersByBlockJSONRequest, | 'blockNumberOrHash'>

type RequestQuery = Pick<GetNFTTransfersByBlockJSONRequest, | 'chain'| 'limit'| 'cursor'>

export const evmGetNFTTransfersByBlockResolver  = async (
  req: Request<RequestParams, undefined, undefined, RequestQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await new PaginatedOperationResolver(getNFTTransfersByBlockOperation, Moralis.EvmApi.baseUrl, Moralis.Core).fetch(
      getNFTTransfersByBlockOperation.deserializeRequest({ ...req.params,  ...req.query, }, Moralis.Core),
    );

    return res.send(data?.raw);
  } catch (error) {
    return next(error);
  }
};