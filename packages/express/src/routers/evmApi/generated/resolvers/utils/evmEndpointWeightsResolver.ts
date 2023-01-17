import {
  
  endpointWeightsOperation,
} from 'moralis/common-evm-utils';
import { NextFunction, Response, Request } from 'express';
import { OperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';





export const evmEndpointWeightsResolver  = async (
  req: Request<undefined, undefined, undefined, undefined>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await new OperationResolver(endpointWeightsOperation, Moralis.EvmApi.baseUrl, Moralis.Core).fetch(
      endpointWeightsOperation.deserializeRequest(undefined, Moralis.Core),
    );

    return res.send(data?.raw);
  } catch (error) {
    return next(error);
  }
};