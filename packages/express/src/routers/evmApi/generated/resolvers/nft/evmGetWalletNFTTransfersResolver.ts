import {
  GetWalletNFTTransfersJSONRequest,
  getWalletNFTTransfersOperation,
} from 'moralis/common-evm-utils';
import { NextFunction, Response, Request } from 'express';
import { OperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

type RequestParams = Pick<GetWalletNFTTransfersJSONRequest, | 'address'>

type RequestQuery = Pick<GetWalletNFTTransfersJSONRequest, | 'chain'| 'format'| 'direction'| 'fromBlock'| 'toBlock'| 'limit'| 'cursor'>

export const evmGetWalletNFTTransfersResolver  = async (
  req: Request<RequestParams, any, any, RequestQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { raw } = await new OperationResolver(getWalletNFTTransfersOperation, Moralis.EvmApi.baseUrl, Moralis.Core).fetch(
      getWalletNFTTransfersOperation.deserializeRequest({ ...req.params,  ...req.query, }, Moralis.Core),
    );

    return res.send(raw);
  } catch (error) {
    return next(error);
  }
};