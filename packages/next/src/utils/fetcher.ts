import axios from 'axios';
import Moralis from 'moralis';
import { Operation } from 'moralis/common-core';
export interface FetcherParams<Response> {
  operation: Pick<Operation<unknown, unknown, Response, unknown>, 'serializeRequest' | 'deserializeResponse'>;
  request: unknown;
}

export async function fetcher<Response>(endpoint: string, { operation, request }: FetcherParams<Response>) {
  const { serializeRequest, deserializeResponse } = operation;

  endpoint = `/api/moralis/${endpoint}`;

  const jsonResponse = await axios.post(endpoint, serializeRequest(request, Moralis.Core));
  return deserializeResponse(jsonResponse.data, request, Moralis.Core);
}
