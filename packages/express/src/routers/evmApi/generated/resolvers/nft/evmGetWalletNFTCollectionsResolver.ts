import { GetWalletNFTCollectionsJSONRequest, getWalletNFTCollectionsOperation } from 'moralis/common-evm-utils';
import { NextFunction, Response, Request } from 'express';
import { OperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

type RequestParams = Pick<GetWalletNFTCollectionsJSONRequest, 'address'>;

type RequestQuery = Pick<GetWalletNFTCollectionsJSONRequest, 'chain' | 'limit' | 'cursor'>;

export const evmGetWalletNFTCollectionsResolver = async (
  req: Request<RequestParams, any, any, RequestQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { raw } = await new OperationResolver(
      getWalletNFTCollectionsOperation,
      Moralis.EvmApi.baseUrl,
      Moralis.Core,
    ).fetch(getWalletNFTCollectionsOperation.deserializeRequest({ ...req.params, ...req.query }, Moralis.Core));

    return res.send(raw);
  } catch (error) {
    return next(error);
  }
};
