import {
  GetPairReservesJSONRequest,
  getPairReservesOperation,
} from 'moralis/common-evm-utils';
import { NextFunction, Response, Request } from 'express';
import { OperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

type RequestParams = Pick<GetPairReservesJSONRequest, | 'pairAddress'>

type RequestQuery = Pick<GetPairReservesJSONRequest, | 'chain'| 'toBlock'| 'toDate'| 'providerUrl'>

export const evmGetPairReservesResolver  = async (
  req: Request<RequestParams, any, any, RequestQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { raw } = await new OperationResolver(getPairReservesOperation, Moralis.EvmApi.baseUrl, Moralis.Core).fetch(
      getPairReservesOperation.deserializeRequest({ ...req.params,  ...req.query, }, Moralis.Core),
    );

    return res.send(raw);
  } catch (error) {
    return next(error);
  }
};