import { SearchNFTsJSONRequest, searchNFTsOperation } from 'moralis/common-evm-utils';
import { NextFunction, Response, Request } from 'express';
import { OperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

type RequestQuery = Pick<
  SearchNFTsJSONRequest,
  | 'chain'
  | 'format'
  | 'q'
  | 'filter'
  | 'fromBlock'
  | 'toBlock'
  | 'fromDate'
  | 'toDate'
  | 'addresses'
  | 'cursor'
  | 'limit'
>;

export const evmSearchNFTsResolver = async (
  req: Request<any, any, any, RequestQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { raw } = await new OperationResolver(searchNFTsOperation, Moralis.EvmApi.baseUrl, Moralis.Core).fetch(
      searchNFTsOperation.deserializeRequest({ ...req.query }, Moralis.Core),
    );

    return res.send(raw);
  } catch (error) {
    return next(error);
  }
};
