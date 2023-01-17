import {
  GetBalanceJSONRequest,
  getBalanceOperation,
} from 'moralis/common-sol-utils';
import { NextFunction, Response, Request } from 'express';
import { OperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

type RequestParams = Pick<GetBalanceJSONRequest, | 'network'| 'address'>



export const solGetBalanceResolver  = async (
  req: Request<RequestParams, undefined, undefined, undefined>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await new OperationResolver(getBalanceOperation, Moralis.SolApi.baseUrl, Moralis.Core).fetch(
      getBalanceOperation.deserializeRequest({ ...req.params,   }, Moralis.Core),
    );

    return res.send(data?.raw);
  } catch (error) {
    return next(error);
  }
};