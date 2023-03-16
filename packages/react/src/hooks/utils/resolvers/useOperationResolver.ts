import { OperationResolver } from '@moralisweb3/api-utils';
import { Operation } from '@moralisweb3/common-core';
import { useMemo } from 'react';
import { useMoralisContext } from '../useMoralisContext';

export function useOperationResolver<Request, JSONRequest, Response, JSONResponse>(
  operation: Operation<Request, JSONRequest, Response, JSONResponse>,
  baseUrl: string,
) {
  const { core } = useMoralisContext();
  return useMemo(() => new OperationResolver(operation, baseUrl, core), [operation, core]);
}
