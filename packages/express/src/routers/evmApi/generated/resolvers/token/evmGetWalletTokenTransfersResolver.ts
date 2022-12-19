import {
  GetWalletTokenTransfersJSONRequest,
  getWalletTokenTransfersOperation,
} from 'moralis/common-evm-utils';
import { NextFunction, Response, Request } from 'express';
import { OperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

type RequestParams = Pick<GetWalletTokenTransfersJSONRequest, | 'address'>

type RequestQuery = Pick<GetWalletTokenTransfersJSONRequest, | 'chain'| 'subdomain'| 'fromBlock'| 'toBlock'| 'fromDate'| 'toDate'| 'limit'| 'cursor'>

export const evmGetWalletTokenTransfersResolver  = async (
  req: Request<RequestParams, any, any, RequestQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { raw } = await new OperationResolver(getWalletTokenTransfersOperation, Moralis.EvmApi.baseUrl, Moralis.Core).fetch(
      getWalletTokenTransfersOperation.deserializeRequest({ ...req.params,  ...req.query, }, Moralis.Core),
    );

    return res.send(raw);
  } catch (error) {
    return next(error);
  }
};