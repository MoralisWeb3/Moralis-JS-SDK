import { RunContractFunctionJSONRequest, runContractFunctionOperation } from 'moralis/common-evm-utils';
import { NextFunction, Response, Request } from 'express';
import { OperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

type RequestParams = Pick<RunContractFunctionJSONRequest, 'address'>;
type RequestBody = Pick<RunContractFunctionJSONRequest, 'abi' | 'params'>;
type RequestQuery = Pick<RunContractFunctionJSONRequest, 'chain' | 'functionName' | 'providerUrl' | 'subdomain'>;

export const evmRunContractFunctionResolver = async (
  req: Request<RequestParams, undefined, RequestBody, RequestQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { raw } = await new OperationResolver(
      runContractFunctionOperation,
      Moralis.EvmApi.baseUrl,
      Moralis.Core,
    ).fetch(
      runContractFunctionOperation.deserializeRequest({ ...req.params, ...req.body, ...req.query }, Moralis.Core),
    );

    return res.send(raw);
  } catch (error) {
    return next(error);
  }
};
