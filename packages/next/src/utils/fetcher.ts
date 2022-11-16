import { UnknownOperation } from '@moralisweb3/api-utils';
import axios from 'axios';
import Moralis from 'moralis';

export interface FetcherParams {
  operation: any;
  request: any;
}

export async function fetcher(endpoint: string, { operation, request }: FetcherParams) {
  const { serializeRequest, deserializeResponse } = operation;

  endpoint = `/api/moralis/${endpoint}`;

  const jsonResponse = await axios.post(endpoint, serializeRequest(request, Moralis.Core));
  return deserializeResponse(jsonResponse.data, request, Moralis.Core);
}
