import { PaginatedOperationResolver } from '@moralisweb3/api-utils';
import { PaginatedOperation, PaginatedRequest } from '@moralisweb3/common-core';
import { useMemo } from 'react';
import { useMoralisContext } from '../useMoralisContext';

export function usePaginatedOperationResolver<Request extends PaginatedRequest, JSONRequest, Response, JSONResult>(
  operation: PaginatedOperation<Request, JSONRequest, Response, JSONResult>,
  baseUrl: string,
) {
  const { core } = useMoralisContext();
  return useMemo(() => new PaginatedOperationResolver(operation, baseUrl, core), [operation, core]);
}
