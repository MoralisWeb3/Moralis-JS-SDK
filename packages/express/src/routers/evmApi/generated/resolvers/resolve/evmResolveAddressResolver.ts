import {
  ResolveAddressJSONRequest,
  resolveAddressOperation,
} from 'moralis/common-evm-utils';
import { NextFunction, Response, Request } from 'express';
import { NullableOperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

type RequestParams = Pick<ResolveAddressJSONRequest, | 'address'>



export const evmResolveAddressResolver  = async (
  req: Request<RequestParams, undefined, undefined, undefined>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await new NullableOperationResolver(resolveAddressOperation, Moralis.EvmApi.baseUrl, Moralis.Core).fetch(
      resolveAddressOperation.deserializeRequest({ ...req.params,   }, Moralis.Core),
    );

    return res.send(data?.raw);
  } catch (error) {
    return next(error);
  }
};