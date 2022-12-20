import { ReSyncMetadataJSONRequest, reSyncMetadataOperation } from 'moralis/common-evm-utils';
import { NextFunction, Response, Request } from 'express';
import { OperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

type RequestParams = Pick<ReSyncMetadataJSONRequest, 'address' | 'tokenId'>;

type RequestQuery = Pick<ReSyncMetadataJSONRequest, 'chain' | 'flag' | 'mode'>;

export const evmReSyncMetadataResolver = async (
  req: Request<RequestParams, any, any, RequestQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { raw } = await new OperationResolver(reSyncMetadataOperation, Moralis.EvmApi.baseUrl, Moralis.Core).fetch(
      reSyncMetadataOperation.deserializeRequest({ ...req.params, ...req.query }, Moralis.Core),
    );

    return res.send(raw);
  } catch (error) {
    return next(error);
  }
};
