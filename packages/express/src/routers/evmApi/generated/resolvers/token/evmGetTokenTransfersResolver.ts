import {
  GetTokenTransfersJSONRequest,
  getTokenTransfersOperation,
} from 'moralis/common-evm-utils';
import { NextFunction, Response, Request } from 'express';
import { PaginatedOperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

type RequestParams = Pick<GetTokenTransfersJSONRequest, | 'address'>

type RequestQuery = Pick<GetTokenTransfersJSONRequest, | 'chain'| 'fromBlock'| 'toBlock'| 'fromDate'| 'toDate'| 'offset'| 'limit'>

export const evmGetTokenTransfersResolver  = async (
  req: Request<RequestParams, undefined, undefined, RequestQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await new PaginatedOperationResolver(getTokenTransfersOperation, Moralis.EvmApi.baseUrl, Moralis.Core).fetch(
      getTokenTransfersOperation.deserializeRequest({ ...req.params,  ...req.query, }, Moralis.Core),
    );

    return res.send(data?.raw);
  } catch (error) {
    return next(error);
  }
};