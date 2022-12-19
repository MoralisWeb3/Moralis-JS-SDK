import {
  GetTokenTransfersJSONRequest,
  getTokenTransfersOperation,
} from 'moralis/common-evm-utils';
import { NextFunction, Response, Request } from 'express';
import { OperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

type RequestParams = Pick<GetTokenTransfersJSONRequest, | 'address'>

type RequestQuery = Pick<GetTokenTransfersJSONRequest, | 'chain'| 'subdomain'| 'fromBlock'| 'toBlock'| 'fromDate'| 'toDate'| 'offset'| 'limit'>

export const evmGetTokenTransfersResolver  = async (
  req: Request<RequestParams, any, any, RequestQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { raw } = await new OperationResolver(getTokenTransfersOperation, Moralis.EvmApi.baseUrl, Moralis.Core).fetch(
      getTokenTransfersOperation.deserializeRequest({ ...req.params,  ...req.query, }, Moralis.Core),
    );

    return res.send(raw);
  } catch (error) {
    return next(error);
  }
};