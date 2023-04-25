import { OperationV3Resolver } from '@moralisweb3/api-utils';
import { createBaseUrlResolver } from '@moralisweb3/aptos-api';
import { OperationV3 } from 'moralis/common-core';
import { useMemo } from 'react';
import { useMoralisContext } from '../useMoralisContext';

export function useOperationV3Resolver<Request, RequestJSON, Response, ResponseJSON, Body, BodyJSON>(
  operation: OperationV3<Request, RequestJSON, Response, ResponseJSON, Body, BodyJSON>,
) {
  const { core } = useMoralisContext();
  return useMemo(() => new OperationV3Resolver(operation, createBaseUrlResolver(core), core), [core]);
}
