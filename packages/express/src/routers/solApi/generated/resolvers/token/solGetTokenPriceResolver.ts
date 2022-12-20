import {
  GetTokenPriceJSONRequest,
  getTokenPriceOperation,
} from 'moralis/common-sol-utils';
import { NextFunction, Response, Request } from 'express';
import { OperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

type RequestParams = Pick<GetTokenPriceJSONRequest, | 'network'| 'address'>



export const solGetTokenPriceResolver  = async (
  req: Request<RequestParams, undefined, undefined, undefined>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { raw } = await new OperationResolver(getTokenPriceOperation, Moralis.SolApi.baseUrl, Moralis.Core).fetch(
      getTokenPriceOperation.deserializeRequest({ ...req.params,   }, Moralis.Core),
    );

    return res.send(raw);
  } catch (error) {
    return next(error);
  }
};