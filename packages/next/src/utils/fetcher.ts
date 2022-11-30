import axios from 'axios';
import Moralis from 'moralis';
import { Operation } from 'moralis/common-core';
export interface FetcherParams<Response> {
  deserializeResponse: Operation<unknown, unknown, Response, unknown>['deserializeResponse'];
  request: unknown;
}

export async function fetcher<Response>(endpoint: string, { deserializeResponse, request }: FetcherParams<Response>) {
  endpoint = `/api/moralis/${endpoint}`;

  const jsonResponse = await axios.post(endpoint, request);
  return deserializeResponse(jsonResponse.data, request, Moralis.Core);
}
