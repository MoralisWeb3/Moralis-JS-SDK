import {
  GetNFTContractTransfersJSONRequest,
  getNFTContractTransfersOperation,
} from 'moralis/common-evm-utils';
import { NextFunction, Response, Request } from 'express';
import { PaginatedOperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

type RequestParams = Pick<GetNFTContractTransfersJSONRequest, | 'address'>

type RequestQuery = Pick<GetNFTContractTransfersJSONRequest, | 'chain'| 'format'| 'limit'| 'cursor'| 'fromBlock'| 'fromDate'| 'toBlock'| 'toDate'>

export const evmGetNFTContractTransfersResolver  = async (
  req: Request<RequestParams, undefined, undefined, RequestQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await new PaginatedOperationResolver(getNFTContractTransfersOperation, Moralis.EvmApi.baseUrl, Moralis.Core).fetch(
      getNFTContractTransfersOperation.deserializeRequest({ ...req.params,  ...req.query, }, Moralis.Core),
    );

    return res.send(data?.raw);
  } catch (error) {
    return next(error);
  }
};