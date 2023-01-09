import axios from 'axios';
import Moralis from 'moralis';
import { Operation } from 'moralis/common-core';
export interface FetcherParams<TOperation, Request> {
  operation: TOperation;
  request: Request;
}

async function fetcher<Request, Response, JSONResponse>(
  endpoint: string,
  {
    operation,
    request,
  }: FetcherParams<
    Pick<Operation<Request, unknown, Response, JSONResponse>, 'serializeRequest' | 'deserializeResponse'>,
    Request
  >,
) {
  endpoint = `/api/moralis/${endpoint}`;

  const { data } = await axios.post<JSONResponse>(endpoint, request);

  return operation.deserializeResponse(data, request, Moralis.Core);
}

export default fetcher;
