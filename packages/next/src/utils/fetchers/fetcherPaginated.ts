import axios from 'axios';
import Moralis from 'moralis';
import { PaginatedJSONResponse, PaginatedOperation, PaginatedRequest, PaginationReader } from 'moralis/common-core';

export interface FetcherPaginatedResponse<Response> {
  total: number;
  page: number;
  pageSize: number;
  cursor?: string | undefined;
  data: Response;
}

export interface FetcherParams<TOperation> {
  operation: TOperation;
  request: PaginatedRequest;
}

async function fetcherPaginated<JSONRequest, Response, JSONResult>(
  endpoint: string,
  {
    operation,
    request,
  }: FetcherParams<
    Pick<
      PaginatedOperation<PaginatedRequest, JSONRequest, Response, JSONResult>,
      'serializeRequest' | 'deserializeResponse'
    >
  >,
) {
  endpoint = `/api/moralis/${endpoint}`;

  const { data } = await axios.post<PaginatedJSONResponse<JSONResult>>(
    endpoint,
    operation.serializeRequest(request, Moralis.Core),
  );

  return {
    data: operation.deserializeResponse(data, request, Moralis.Core),
    ...PaginationReader.read(data),
  };
}

export default fetcherPaginated;
