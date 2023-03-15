import Moralis from 'moralis';
import { ResolveDomainRequest, ResolveDomainResponse, resolveDomainOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useNullableOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmResolveDomainParams = Partial<ResolveDomainRequest>;
export type UseEvmResolveDomainQueryOptions = QueryOptions<ResolveDomainResponse | null, UseEvmResolveDomainParams>;

export function useEvmResolveDomain({ domain, currency }: UseEvmResolveDomainParams = {}, queryOptions: UseEvmResolveDomainQueryOptions = {}) {
  const resolver = useNullableOperationResolver(resolveDomainOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(domain);
  }, [domain]);

  const queryKey: [string, Partial<ResolveDomainRequest>] = useMemo(() => {
    return [
      resolveDomainOperation.id,
      {
        domain, currency
      },
    ];
  }, [domain, currency]);

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