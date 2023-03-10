import Moralis from 'moralis';
import { ResolveAddressRequest, ResolveAddressResponse, resolveAddressOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useNullableOperationResolver, useQuery } from '../../utils';

export type UseEvmResolveAddressParams = UseMoralisQueryParams<ResolveAddressResponse, ResolveAddressRequest>

export function useEvmResolveAddress({ address, ...queryParams }: UseEvmResolveAddressParams = {}) {
  const resolver = useNullableOperationResolver(resolveAddressOperation, Moralis.EvmApi.baseUrl);

  const queryKey: [string, ResolveAddressRequest] | undefined = useMemo(() => {
    if (address ) {
      return [
      resolveAddressOperation.id,
      {
        address
      },
    ];
    }
      return;
  }, [address]);

  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const { result } = await resolver.fetch(request);
      return result;
    },
    ...queryParams,
    enabled: queryKey && queryParams.enabled,
  });
}