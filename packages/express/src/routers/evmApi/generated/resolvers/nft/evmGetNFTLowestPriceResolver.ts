import {
  GetNFTLowestPriceJSONRequest,
  getNFTLowestPriceOperation,
} from 'moralis/common-evm-utils';
import { NextFunction, Response, Request } from 'express';
import { NullableOperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

type RequestParams = Pick<GetNFTLowestPriceJSONRequest, | 'address'>

type RequestQuery = Pick<GetNFTLowestPriceJSONRequest, | 'chain'| 'days'| 'marketplace'>

export const evmGetNFTLowestPriceResolver  = async (
  req: Request<RequestParams, undefined, undefined, RequestQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await new NullableOperationResolver(getNFTLowestPriceOperation, Moralis.EvmApi.baseUrl, Moralis.Core).fetch(
      getNFTLowestPriceOperation.deserializeRequest({ ...req.params,  ...req.query, }, Moralis.Core),
    );

    return res.send(data?.raw);
  } catch (error) {
    return next(error);
  }
};