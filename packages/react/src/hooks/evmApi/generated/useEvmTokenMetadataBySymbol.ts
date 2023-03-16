import Moralis from 'moralis';
import { GetTokenMetadataBySymbolRequest, GetTokenMetadataBySymbolResponse, getTokenMetadataBySymbolOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmTokenMetadataBySymbolParams = Partial<GetTokenMetadataBySymbolRequest>;
export type UseEvmTokenMetadataBySymbolQueryOptions = QueryOptions<GetTokenMetadataBySymbolResponse, UseEvmTokenMetadataBySymbolParams>;

export function useEvmTokenMetadataBySymbol({ chain, symbols }: UseEvmTokenMetadataBySymbolParams = {}, queryOptions: UseEvmTokenMetadataBySymbolQueryOptions = {}) {
  const resolver = useOperationResolver(getTokenMetadataBySymbolOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(symbols);
  }, [symbols]);

  const queryKey: [string, Partial<GetTokenMetadataBySymbolRequest>] = useMemo(() => {
    return [
      getTokenMetadataBySymbolOperation.id,
      {
        chain, symbols
      },
    ];
  }, [chain, symbols]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['symbols']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}