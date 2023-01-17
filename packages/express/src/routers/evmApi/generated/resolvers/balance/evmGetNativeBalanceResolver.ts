import {
  GetNativeBalanceJSONRequest,
  getNativeBalanceOperation,
} from 'moralis/common-evm-utils';
import { NextFunction, Response, Request } from 'express';
import { OperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

type RequestParams = Pick<GetNativeBalanceJSONRequest, | 'address'>

type RequestQuery = Pick<GetNativeBalanceJSONRequest, | 'chain'| 'toBlock'>

export const evmGetNativeBalanceResolver  = async (
  req: Request<RequestParams, undefined, undefined, RequestQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await new OperationResolver(getNativeBalanceOperation, Moralis.EvmApi.baseUrl, Moralis.Core).fetch(
      getNativeBalanceOperation.deserializeRequest({ ...req.params,  ...req.query, }, Moralis.Core),
    );

    return res.send(data?.raw);
  } catch (error) {
    return next(error);
  }
};