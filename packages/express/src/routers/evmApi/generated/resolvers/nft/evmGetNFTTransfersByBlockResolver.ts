import {
  GetNFTTransfersByBlockJSONRequest,
  getNFTTransfersByBlockOperation,
} from 'moralis/common-evm-utils';
import { NextFunction, Response, Request } from 'express';
import { OperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

type RequestParams = Pick<GetNFTTransfersByBlockJSONRequest, | 'blockNumberOrHash'>

type RequestQuery = Pick<GetNFTTransfersByBlockJSONRequest, | 'chain'| 'subdomain'| 'limit'| 'cursor'>

export const evmGetNFTTransfersByBlockResolver  = async (
  req: Request<RequestParams, any, any, RequestQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { raw } = await new OperationResolver(getNFTTransfersByBlockOperation, Moralis.EvmApi.baseUrl, Moralis.Core).fetch(
      getNFTTransfersByBlockOperation.deserializeRequest({ ...req.params,  ...req.query, }, Moralis.Core),
    );

    return res.send(raw);
  } catch (error) {
    return next(error);
  }
};