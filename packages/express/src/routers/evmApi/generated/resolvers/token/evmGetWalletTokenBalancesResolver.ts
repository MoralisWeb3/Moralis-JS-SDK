import {
  GetWalletTokenBalancesJSONRequest,
  getWalletTokenBalancesOperation,
} from 'moralis/common-evm-utils';
import { NextFunction, Response, Request } from 'express';
import { OperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

type RequestParams = Pick<GetWalletTokenBalancesJSONRequest, | 'address'>

type RequestQuery = Pick<GetWalletTokenBalancesJSONRequest, | 'chain'| 'toBlock'| 'tokenAddresses'>

export const evmGetWalletTokenBalancesResolver  = async (
  req: Request<RequestParams, undefined, undefined, RequestQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await new OperationResolver(getWalletTokenBalancesOperation, Moralis.EvmApi.baseUrl, Moralis.Core).fetch(
      getWalletTokenBalancesOperation.deserializeRequest({ ...req.params,  ...req.query, }, Moralis.Core),
    );

    return res.send(data?.raw);
  } catch (error) {
    return next(error);
  }
};