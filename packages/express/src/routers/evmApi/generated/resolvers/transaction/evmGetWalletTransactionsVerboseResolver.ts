import {
  GetWalletTransactionsVerboseJSONRequest,
  getWalletTransactionsVerboseOperation,
} from 'moralis/common-evm-utils';
import { NextFunction, Response, Request } from 'express';
import { OperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

type RequestParams = Pick<GetWalletTransactionsVerboseJSONRequest, 'address'>;

type RequestQuery = Pick<
  GetWalletTransactionsVerboseJSONRequest,
  'chain' | 'subdomain' | 'fromBlock' | 'toBlock' | 'fromDate' | 'toDate' | 'cursor' | 'limit'
>;

export const evmGetWalletTransactionsVerboseResolver = async (
  req: Request<RequestParams, undefined, undefined, RequestQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { raw } = await new OperationResolver(
      getWalletTransactionsVerboseOperation,
      Moralis.EvmApi.baseUrl,
      Moralis.Core,
    ).fetch(getWalletTransactionsVerboseOperation.deserializeRequest({ ...req.params, ...req.query }, Moralis.Core));

    return res.send(raw);
  } catch (error) {
    return next(error);
  }
};
