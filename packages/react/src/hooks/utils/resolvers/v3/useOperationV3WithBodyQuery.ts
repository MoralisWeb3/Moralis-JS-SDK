import { OperationV3 } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../../types';
import { useQuery } from '../../useQuery';
import { useOperationV3Resolver } from '../useOperationV3Resolver';

function useAreRequiredPropertiesProvided<Parameter>(param?: OperationResolverParameter<Parameter>) {
  return useMemo(() => {
    if (!param) {
      return false;
    }
    if (!param.requiredPropertyNames) {
      return true;
    }
    const undefinedParams = param.requiredPropertyNames.filter((key) => typeof param.properties[key] === 'undefined');

    if (undefinedParams.length > 0) {
      throw new Error(`The following required parameters are undefined: ${undefinedParams.join(', ')}`);
    }

    return true;
  }, [param]);
}

export type OperationResolverParameter<Parameter> = {
  properties: Partial<Parameter>;
  requiredPropertyNames?: (keyof Parameter)[];
};

export function useOperationV3WithBodyQuery<Request, RequestJSON, Response, ResponseJSON, Body, BodyJSON>(
  operation: OperationV3<Request, RequestJSON, Response, ResponseJSON, Body, BodyJSON>,
  request?: OperationResolverParameter<Request>,
  body?: OperationResolverParameter<Body>,
  queryOptions?: QueryOptions<Response, [Partial<Request>, Partial<Body>]>,
) {
  const requestHasAllRequiredProps = useAreRequiredPropertiesProvided(request);
  const bodyHasAllRequiredProps = useAreRequiredPropertiesProvided(body);

  const resolver = useOperationV3Resolver(operation);

  const queryKey: [string, [Partial<Request>, Partial<Body>]] = useMemo(() => {
    return [operation.operationId, [request?.properties || {}, body?.properties || {}]];
  }, [operation.operationId, request?.properties, body?.properties]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, [queryRequest, queryBody]] }) => {
      return resolver.resolve(queryRequest as Request, queryBody as Body);
    },
    enabled: !!requestHasAllRequiredProps && !!bodyHasAllRequiredProps && queryOptions?.enabled,
  });
}
