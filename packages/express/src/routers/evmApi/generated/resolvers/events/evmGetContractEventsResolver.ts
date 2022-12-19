import {
  GetContractEventsJSONRequest,
  getContractEventsOperation,
} from 'moralis/common-evm-utils';
import { NextFunction, Response, Request } from 'express';
import { OperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

type RequestParams = Pick<GetContractEventsJSONRequest, | 'address'>
type RequestBody = Pick<GetContractEventsJSONRequest, | 'abi'>
type RequestQuery = Pick<GetContractEventsJSONRequest, | 'chain'| 'subdomain'| 'providerUrl'| 'fromBlock'| 'toBlock'| 'fromDate'| 'toDate'| 'topic'| 'offset'| 'limit'>

export const evmGetContractEventsResolver  = async (
  req: Request<RequestParams, any, RequestBody, RequestQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { raw } = await new OperationResolver(getContractEventsOperation, Moralis.EvmApi.baseUrl, Moralis.Core).fetch(
      getContractEventsOperation.deserializeRequest({ ...req.params, ...req.body, ...req.query, }, Moralis.Core),
    );

    return res.send(raw);
  } catch (error) {
    return next(error);
  }
};