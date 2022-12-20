import {
  ResolveAddressJSONRequest,
  resolveAddressOperation,
} from 'moralis/common-evm-utils';
import { NextFunction, Response, Request } from 'express';
import { OperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

type RequestParams = Pick<ResolveAddressJSONRequest, | 'address'>



export const evmResolveAddressResolver  = async (
  req: Request<RequestParams, undefined, undefined, undefined>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { raw } = await new OperationResolver(resolveAddressOperation, Moralis.EvmApi.baseUrl, Moralis.Core).fetch(
      resolveAddressOperation.deserializeRequest({ ...req.params,   }, Moralis.Core),
    );

    return res.send(raw);
  } catch (error) {
    return next(error);
  }
};