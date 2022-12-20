import {
  GetPairAddressJSONRequest,
  getPairAddressOperation,
} from 'moralis/common-evm-utils';
import { NextFunction, Response, Request } from 'express';
import { OperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

type RequestParams = Pick<GetPairAddressJSONRequest, | 'token0Address'| 'token1Address'>

type RequestQuery = Pick<GetPairAddressJSONRequest, | 'chain'| 'toBlock'| 'toDate'| 'exchange'>

export const evmGetPairAddressResolver  = async (
  req: Request<RequestParams, undefined, undefined, RequestQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { raw } = await new OperationResolver(getPairAddressOperation, Moralis.EvmApi.baseUrl, Moralis.Core).fetch(
      getPairAddressOperation.deserializeRequest({ ...req.params,  ...req.query, }, Moralis.Core),
    );

    return res.send(raw);
  } catch (error) {
    return next(error);
  }
};