import {
  
  web3ApiVersionOperation,
} from 'moralis/common-evm-utils';
import { NextFunction, Response, Request } from 'express';
import { OperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';





export const evmWeb3ApiVersionResolver  = async (
  req: Request<undefined, undefined, undefined, undefined>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { raw } = await new OperationResolver(web3ApiVersionOperation, Moralis.EvmApi.baseUrl, Moralis.Core).fetch(
      web3ApiVersionOperation.deserializeRequest(undefined, Moralis.Core),
    );

    return res.send(raw);
  } catch (error) {
    return next(error);
  }
};