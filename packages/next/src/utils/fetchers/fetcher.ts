import axios, { isAxiosError } from 'axios';
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

  try {
    const { data } = await axios.post<JSONResponse>(endpoint, request);
    return operation.deserializeResponse(data, request, Moralis.Core);
  } catch (error) {
    // Overwrite error message if the nextjs api returns additional error details
    if (isAxiosError(error)) {
      const errorMessage = error.response?.data?.error;
      if (errorMessage) {
        error.message = errorMessage;
      }
    }

    throw error;
  }
}

export default fetcher;
