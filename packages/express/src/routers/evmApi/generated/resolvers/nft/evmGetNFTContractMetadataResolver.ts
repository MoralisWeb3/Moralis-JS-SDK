import { GetNFTContractMetadataJSONRequest, getNFTContractMetadataOperation } from 'moralis/common-evm-utils';
import { NextFunction, Response, Request } from 'express';
import { OperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

type RequestParams = Pick<GetNFTContractMetadataJSONRequest, 'address'>;

type RequestQuery = Pick<GetNFTContractMetadataJSONRequest, 'chain'>;

export const evmGetNFTContractMetadataResolver = async (
  req: Request<RequestParams, undefined, undefined, RequestQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { raw } = await new OperationResolver(
      getNFTContractMetadataOperation,
      Moralis.EvmApi.baseUrl,
      Moralis.Core,
    ).fetch(getNFTContractMetadataOperation.deserializeRequest({ ...req.params, ...req.query }, Moralis.Core));

    return res.send(raw);
  } catch (error) {
    return next(error);
  }
};
