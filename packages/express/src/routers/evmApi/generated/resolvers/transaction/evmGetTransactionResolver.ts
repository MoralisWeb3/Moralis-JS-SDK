import {
  GetTransactionJSONRequest,
  getTransactionOperation,
} from 'moralis/common-evm-utils';
import { NextFunction, Response, Request } from 'express';
import { NullableOperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

type RequestParams = Pick<GetTransactionJSONRequest, | 'transactionHash'>

type RequestQuery = Pick<GetTransactionJSONRequest, | 'chain'>

export const evmGetTransactionResolver  = async (
  req: Request<RequestParams, undefined, undefined, RequestQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await new NullableOperationResolver(getTransactionOperation, Moralis.EvmApi.baseUrl, Moralis.Core).fetch(
      getTransactionOperation.deserializeRequest({ ...req.params,  ...req.query, }, Moralis.Core),
    );

    return res.send(data?.raw);
  } catch (error) {
    return next(error);
  }
};