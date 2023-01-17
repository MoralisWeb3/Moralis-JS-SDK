import {
  GetPairReservesJSONRequest,
  getPairReservesOperation,
} from 'moralis/common-evm-utils';
import { NextFunction, Response, Request } from 'express';
import { OperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

type RequestParams = Pick<GetPairReservesJSONRequest, | 'pairAddress'>

type RequestQuery = Pick<GetPairReservesJSONRequest, | 'chain'| 'toBlock'| 'toDate'>

export const evmGetPairReservesResolver  = async (
  req: Request<RequestParams, undefined, undefined, RequestQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await new OperationResolver(getPairReservesOperation, Moralis.EvmApi.baseUrl, Moralis.Core).fetch(
      getPairReservesOperation.deserializeRequest({ ...req.params,  ...req.query, }, Moralis.Core),
    );

    return res.send(data?.raw);
  } catch (error) {
    return next(error);
  }
};