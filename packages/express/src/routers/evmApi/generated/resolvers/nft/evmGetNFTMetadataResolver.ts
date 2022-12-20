import { GetNFTMetadataJSONRequest, getNFTMetadataOperation } from 'moralis/common-evm-utils';
import { NextFunction, Response, Request } from 'express';
import { OperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

type RequestParams = Pick<GetNFTMetadataJSONRequest, 'address' | 'tokenId'>;

type RequestQuery = Pick<GetNFTMetadataJSONRequest, 'chain' | 'format' | 'normalizeMetadata'>;

export const evmGetNFTMetadataResolver = async (
  req: Request<RequestParams, any, any, RequestQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { raw } = await new OperationResolver(getNFTMetadataOperation, Moralis.EvmApi.baseUrl, Moralis.Core).fetch(
      getNFTMetadataOperation.deserializeRequest({ ...req.params, ...req.query }, Moralis.Core),
    );

    return res.send(raw);
  } catch (error) {
    return next(error);
  }
};
