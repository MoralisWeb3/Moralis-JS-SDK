import { GetContractNFTsJSONRequest, getContractNFTsOperation } from 'moralis/common-evm-utils';
import { NextFunction, Response, Request } from 'express';
import { OperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

type RequestParams = Pick<GetContractNFTsJSONRequest, 'address'>;

type RequestQuery = Pick<
  GetContractNFTsJSONRequest,
  'chain' | 'format' | 'limit' | 'totalRanges' | 'range' | 'cursor' | 'normalizeMetadata'
>;

export const evmGetContractNFTsResolver = async (
  req: Request<RequestParams, undefined, undefined, RequestQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { raw } = await new OperationResolver(getContractNFTsOperation, Moralis.EvmApi.baseUrl, Moralis.Core).fetch(
      getContractNFTsOperation.deserializeRequest({ ...req.params, ...req.query }, Moralis.Core),
    );

    return res.send(raw);
  } catch (error) {
    return next(error);
  }
};
