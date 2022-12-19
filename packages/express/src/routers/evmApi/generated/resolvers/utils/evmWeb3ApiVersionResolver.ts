import {
  Web3ApiVersionJSONRequest,
  web3ApiVersionOperation,
} from 'moralis/common-evm-utils';
import { NextFunction, Response, Request } from 'express';
import { OperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';





export const evmWeb3ApiVersionResolver  = async (
  req: Request<any, any, any, any>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { raw } = await new OperationResolver(web3ApiVersionOperation, Moralis.EvmApi.baseUrl, Moralis.Core).fetch(
      web3ApiVersionOperation.deserializeRequest({    }, Moralis.Core),
    );

    return res.send(raw);
  } catch (error) {
    return next(error);
  }
};