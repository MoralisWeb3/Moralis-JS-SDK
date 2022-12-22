import {
  GetMultipleNFTsJSONRequest,
  getMultipleNFTsOperation,
} from 'moralis/common-evm-utils';
import { NextFunction, Response, Request } from 'express';
import { OperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';


type RequestBody = Pick<GetMultipleNFTsJSONRequest, | 'tokens'| 'normalizeMetadata'>
type RequestQuery = Pick<GetMultipleNFTsJSONRequest, | 'chain'>

export const evmGetMultipleNFTsResolver  = async (
  req: Request<undefined, undefined, RequestBody, RequestQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { raw } = await new OperationResolver(getMultipleNFTsOperation, Moralis.EvmApi.baseUrl, Moralis.Core).fetch(
      getMultipleNFTsOperation.deserializeRequest({  ...req.body, ...req.query, }, Moralis.Core),
    );

    return res.send(raw);
  } catch (error) {
    return next(error);
  }
};