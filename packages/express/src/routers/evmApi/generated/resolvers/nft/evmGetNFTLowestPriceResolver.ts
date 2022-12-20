import {
  GetNFTLowestPriceJSONRequest,
  getNFTLowestPriceOperation,
} from 'moralis/common-evm-utils';
import { NextFunction, Response, Request } from 'express';
import { OperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

type RequestParams = Pick<GetNFTLowestPriceJSONRequest, | 'address'>

type RequestQuery = Pick<GetNFTLowestPriceJSONRequest, | 'chain'| 'days'| 'providerUrl'| 'marketplace'>

export const evmGetNFTLowestPriceResolver  = async (
  req: Request<RequestParams, undefined, undefined, RequestQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { raw } = await new OperationResolver(getNFTLowestPriceOperation, Moralis.EvmApi.baseUrl, Moralis.Core).fetch(
      getNFTLowestPriceOperation.deserializeRequest({ ...req.params,  ...req.query, }, Moralis.Core),
    );

    return res.send(raw);
  } catch (error) {
    return next(error);
  }
};