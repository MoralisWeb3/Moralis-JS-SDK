import {
  GetDateToBlockJSONRequest,
  getDateToBlockOperation,
} from 'moralis/common-evm-utils';
import { NextFunction, Response, Request } from 'express';
import { OperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';



type RequestQuery = Pick<GetDateToBlockJSONRequest, | 'chain'| 'date'>

export const evmGetDateToBlockResolver  = async (
  req: Request<undefined, undefined, undefined, RequestQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await new OperationResolver(getDateToBlockOperation, Moralis.EvmApi.baseUrl, Moralis.Core).fetch(
      getDateToBlockOperation.deserializeRequest({   ...req.query, }, Moralis.Core),
    );

    return res.send(data?.raw);
  } catch (error) {
    return next(error);
  }
};