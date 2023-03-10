import Moralis from 'moralis';
import { ResolveDomainRequest, ResolveDomainResponse, resolveDomainOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useNullableOperationResolver, useQuery } from '../../utils';

export type UseEvmResolveDomainParams = UseMoralisQueryParams<ResolveDomainResponse| null, ResolveDomainRequest>

export function useEvmResolveDomain({ domain, currency, ...queryParams }: UseEvmResolveDomainParams = {}) {
  const resolver = useNullableOperationResolver(resolveDomainOperation, Moralis.EvmApi.baseUrl);

  const queryKey: [string, ResolveDomainRequest] | undefined = useMemo(() => {
    if (domain) {
      return [
      resolveDomainOperation.id,
      {
        domain, currency
      },
    ];
    }
      return;
  }, [domain, currency]);

  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const response = await resolver.fetch(request);
      return response?.result || null;
    },
    ...queryParams,
    enabled: queryKey && queryParams.enabled,
  });
}