import {
  GetBlockJSONRequest,
  getBlockOperation,
} from 'moralis/common-evm-utils';
import { NextFunction, Response, Request } from 'express';
import { OperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

type RequestParams = Pick<GetBlockJSONRequest, | 'blockNumberOrHash'>

type RequestQuery = Pick<GetBlockJSONRequest, | 'chain'| 'subdomain'>

export const evmGetBlockResolver  = async (
  req: Request<RequestParams, undefined, undefined, RequestQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { raw } = await new OperationResolver(getBlockOperation, Moralis.EvmApi.baseUrl, Moralis.Core).fetch(
      getBlockOperation.deserializeRequest({ ...req.params,  ...req.query, }, Moralis.Core),
    );

    return res.send(raw);
  } catch (error) {
    return next(error);
  }
};