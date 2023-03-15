import Moralis from 'moralis';
import { ResolveAddressRequest, ResolveAddressResponse, resolveAddressOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useNullableOperationResolver, useQuery } from '../../utils';


export type UseEvmResolveAddressParams = ResolveAddressRequest;
export type UseEvmResolveAddressQueryOptions = QueryOptions<ResolveAddressResponse | null, UseEvmResolveAddressParams>;

export function useEvmResolveAddress({ address }: UseEvmResolveAddressParams = {}, queryOptions: UseEvmResolveAddressQueryOptions = {}) {
  const resolver = useNullableOperationResolver(resolveAddressOperation, Moralis.EvmApi.baseUrl);


  const queryKey: [string, ResolveAddressRequest] = useMemo(() => {
    return [
      resolveAddressOperation.id,
      {
        address
      },
    ];
  }, [address]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const response = await resolver.fetch(request);
      return response?.result || null;
    },
    enabled: queryOptions.enabled,
  });
}