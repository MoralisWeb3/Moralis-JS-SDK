import {
  GetNFTTradesJSONRequest,
  getNFTTradesOperation,
} from 'moralis/common-evm-utils';
import { NextFunction, Response, Request } from 'express';
import { OperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

type RequestParams = Pick<GetNFTTradesJSONRequest, | 'address'>

type RequestQuery = Pick<GetNFTTradesJSONRequest, | 'chain'| 'fromBlock'| 'toBlock'| 'fromDate'| 'toDate'| 'providerUrl'| 'marketplace'| 'cursor'| 'limit'>

export const evmGetNFTTradesResolver  = async (
  req: Request<RequestParams, undefined, undefined, RequestQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { raw } = await new OperationResolver(getNFTTradesOperation, Moralis.EvmApi.baseUrl, Moralis.Core).fetch(
      getNFTTradesOperation.deserializeRequest({ ...req.params,  ...req.query, }, Moralis.Core),
    );

    return res.send(raw);
  } catch (error) {
    return next(error);
  }
};