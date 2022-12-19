import {
  GetTokenPriceJSONRequest,
  getTokenPriceOperation,
} from 'moralis/common-evm-utils';
import { NextFunction, Response, Request } from 'express';
import { OperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

type RequestParams = Pick<GetTokenPriceJSONRequest, | 'address'>

type RequestQuery = Pick<GetTokenPriceJSONRequest, | 'chain'| 'providerUrl'| 'exchange'| 'toBlock'>

export const evmGetTokenPriceResolver  = async (
  req: Request<RequestParams, any, any, RequestQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { raw } = await new OperationResolver(getTokenPriceOperation, Moralis.EvmApi.baseUrl, Moralis.Core).fetch(
      getTokenPriceOperation.deserializeRequest({ ...req.params,  ...req.query, }, Moralis.Core),
    );

    return res.send(raw);
  } catch (error) {
    return next(error);
  }
};