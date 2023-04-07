import Moralis from 'moralis';
import { ResolveENSDomainRequest, ResolveENSDomainResponse, resolveENSDomainOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useNullableOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmResolveENSDomainParams = Partial<ResolveENSDomainRequest>;
export type UseEvmResolveENSDomainQueryOptions = QueryOptions<ResolveENSDomainResponse | null, UseEvmResolveENSDomainParams>;

export function useEvmResolveENSDomain({ domain }: UseEvmResolveENSDomainParams = {}, queryOptions: UseEvmResolveENSDomainQueryOptions = {}) {
  const resolver = useNullableOperationResolver(resolveENSDomainOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(domain);
  }, [domain]);

  const queryKey: [string, Partial<ResolveENSDomainRequest>] = useMemo(() => {
    return [
      resolveENSDomainOperation.id,
      {
        domain
      },
    ];
  }, [domain]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['domain']);
      const response = await resolver.fetch(params);
      return response?.result || null;
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}