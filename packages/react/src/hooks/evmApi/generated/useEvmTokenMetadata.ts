import Moralis from 'moralis';
import { GetTokenMetadataRequest, GetTokenMetadataResponse, getTokenMetadataOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmTokenMetadataParams = Partial<GetTokenMetadataRequest>;
export type UseEvmTokenMetadataQueryOptions = QueryOptions<GetTokenMetadataResponse, UseEvmTokenMetadataParams>;

export function useEvmTokenMetadata({ chain, addresses }: UseEvmTokenMetadataParams = {}, queryOptions: UseEvmTokenMetadataQueryOptions = {}) {
  const resolver = useOperationResolver(getTokenMetadataOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(addresses);
  }, [addresses]);

  const queryKey: [string, Partial<GetTokenMetadataRequest>] = useMemo(() => {
    return [
      getTokenMetadataOperation.id,
      {
        chain, addresses
      },
    ];
  }, [chain, addresses]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['addresses']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}