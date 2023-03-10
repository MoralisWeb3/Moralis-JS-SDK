import Moralis from 'moralis';
import { GetTokenMetadataRequest, GetTokenMetadataResponse, getTokenMetadataOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';

export type UseEvmTokenMetadataParams = UseMoralisQueryParams<GetTokenMetadataResponse, GetTokenMetadataRequest>

export function useEvmTokenMetadata({ chain, addresses, ...queryParams }: UseEvmTokenMetadataParams = {}) {
  const resolver = useOperationResolver(getTokenMetadataOperation, Moralis.EvmApi.baseUrl);

  const queryKey: [string, GetTokenMetadataRequest] | undefined = useMemo(() => {
    if (addresses) {
      return [
      getTokenMetadataOperation.id,
      {
        chain, addresses
      },
    ];
    }
      return;
  }, [chain, addresses]);

  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const response = await resolver.fetch(request);
      return response.result;
    },
    ...queryParams,
    enabled: queryKey && queryParams.enabled,
  });
}