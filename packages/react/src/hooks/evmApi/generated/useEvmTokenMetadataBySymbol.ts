import Moralis from 'moralis';
import { GetTokenMetadataBySymbolRequest, GetTokenMetadataBySymbolResponse, getTokenMetadataBySymbolOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';

export type UseEvmTokenMetadataBySymbolParams = UseMoralisQueryParams<GetTokenMetadataBySymbolResponse, GetTokenMetadataBySymbolRequest>

export function useEvmTokenMetadataBySymbol({ chain, symbols, ...queryParams }: UseEvmTokenMetadataBySymbolParams = {}) {
  const resolver = useOperationResolver(getTokenMetadataBySymbolOperation, Moralis.EvmApi.baseUrl);

  const queryKey: [string, GetTokenMetadataBySymbolRequest] | undefined = useMemo(() => {
    if (symbols) {
      return [
        getTokenMetadataBySymbolOperation.id,
        {
          chain, symbols
        },
      ]
    }
    return;
  }, [chain, symbols]);

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