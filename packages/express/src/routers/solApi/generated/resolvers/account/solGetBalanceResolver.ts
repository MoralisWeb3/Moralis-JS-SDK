import {
  GetBalanceJSONRequest,
  getBalanceOperation,
} from 'moralis/common-sol-utils';
import { NextFunction, Response, Request } from 'express';
import { OperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

type RequestParams = Pick<GetBalanceJSONRequest, | 'network'| 'address'>



export const solGetBalanceResolver  = async (
  req: Request<RequestParams, any, any, any>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { raw } = await new OperationResolver(getBalanceOperation, Moralis.EvmApi.baseUrl, Moralis.Core).fetch(
      getBalanceOperation.deserializeRequest({ ...req.params,   }, Moralis.Core),
    );

    return res.send(raw);
  } catch (error) {
    return next(error);
  }
};