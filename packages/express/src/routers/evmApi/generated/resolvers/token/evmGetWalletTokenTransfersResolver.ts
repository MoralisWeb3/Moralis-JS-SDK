import {
  GetWalletTokenTransfersJSONRequest,
  getWalletTokenTransfersOperation,
} from 'moralis/common-evm-utils';
import { NextFunction, Response, Request } from 'express';
import { PaginatedOperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

type RequestParams = Pick<GetWalletTokenTransfersJSONRequest, | 'address'>

type RequestQuery = Pick<GetWalletTokenTransfersJSONRequest, | 'chain'| 'fromBlock'| 'toBlock'| 'fromDate'| 'toDate'| 'limit'| 'cursor'>

export const evmGetWalletTokenTransfersResolver  = async (
  req: Request<RequestParams, undefined, undefined, RequestQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await new PaginatedOperationResolver(getWalletTokenTransfersOperation, Moralis.EvmApi.baseUrl, Moralis.Core).fetch(
      getWalletTokenTransfersOperation.deserializeRequest({ ...req.params,  ...req.query, }, Moralis.Core),
    );

    return res.send(data?.raw);
  } catch (error) {
    return next(error);
  }
};