import {
  GetWalletNFTCollectionsJSONRequest,
  getWalletNFTCollectionsOperation,
} from 'moralis/common-evm-utils';
import { NextFunction, Response, Request } from 'express';
import { PaginatedOperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

type RequestParams = Pick<GetWalletNFTCollectionsJSONRequest, | 'address'>

type RequestQuery = Pick<GetWalletNFTCollectionsJSONRequest, | 'chain'| 'limit'| 'cursor'>

export const evmGetWalletNFTCollectionsResolver  = async (
  req: Request<RequestParams, undefined, undefined, RequestQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await new PaginatedOperationResolver(getWalletNFTCollectionsOperation, Moralis.EvmApi.baseUrl, Moralis.Core).fetch(
      getWalletNFTCollectionsOperation.deserializeRequest({ ...req.params,  ...req.query, }, Moralis.Core),
    );

    return res.send(data?.raw);
  } catch (error) {
    return next(error);
  }
};