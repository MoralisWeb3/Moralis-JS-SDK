import { GetWalletTransactionsJSONRequest, getWalletTransactionsOperation } from 'moralis/common-evm-utils';
import { NextFunction, Response, Request } from 'express';
import { OperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

type RequestParams = Pick<GetWalletTransactionsJSONRequest, 'address'>;

type RequestQuery = Pick<
  GetWalletTransactionsJSONRequest,
  'chain' | 'subdomain' | 'fromBlock' | 'toBlock' | 'fromDate' | 'toDate' | 'cursor' | 'limit'
>;

export const evmGetWalletTransactionsResolver = async (
  req: Request<RequestParams, any, any, RequestQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { raw } = await new OperationResolver(
      getWalletTransactionsOperation,
      Moralis.EvmApi.baseUrl,
      Moralis.Core,
    ).fetch(getWalletTransactionsOperation.deserializeRequest({ ...req.params, ...req.query }, Moralis.Core));

    return res.send(raw);
  } catch (error) {
    return next(error);
  }
};
