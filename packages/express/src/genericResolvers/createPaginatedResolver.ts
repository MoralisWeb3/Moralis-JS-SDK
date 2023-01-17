import { Request as ExpressRequest, Response as ExpressResponse, NextFunction } from 'express';
import { PaginatedOperation, PaginatedRequest } from '@moralisweb3/common-core';
import { PaginatedOperationResolver } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

export const createPaginatedResolver = <Request extends PaginatedRequest, JSONRequest, Result, JSONResult>(
  operation: PaginatedOperation<Request, JSONRequest, Result, JSONResult>,
  baseUrl: string,
) => {
  const resolver = new PaginatedOperationResolver(operation, baseUrl, Moralis.Core);

  async function handle(
    req: ExpressRequest<unknown, unknown, unknown, unknown>,
    res: ExpressResponse,
    next: NextFunction,
  ) {
    try {
      const jsonRequest = {
        ...(req?.params || {}),
        ...(req?.query || {}),
        ...(req?.body || {}),
      } as JSONRequest;
      const deserializedRequest = operation.deserializeRequest(jsonRequest, Moralis.Core);

      const response = await resolver.fetch(deserializedRequest);

      return res.send(response?.raw);
    } catch (error) {
      return next(error);
    }
  }

  return handle;
};
