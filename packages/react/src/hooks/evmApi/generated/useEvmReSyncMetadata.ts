import Moralis from 'moralis';
import { ReSyncMetadataRequest, ReSyncMetadataResponse, reSyncMetadataOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';

export type UseEvmReSyncMetadataParams = UseMoralisQueryParams<ReSyncMetadataResponse, ReSyncMetadataRequest>

export function useEvmReSyncMetadata({ address, tokenId, chain, flag, mode, ...queryParams }: UseEvmReSyncMetadataParams = {}) {
  const resolver = useOperationResolver(reSyncMetadataOperation, Moralis.EvmApi.baseUrl);

  const queryKey: [string, ReSyncMetadataRequest] | undefined = useMemo(() => {
    if (address && tokenId) {
      return [
      reSyncMetadataOperation.id,
      {
        address, tokenId, chain, flag, mode
      },
    ];
    }
      return;
  }, [address, tokenId, chain, flag, mode]);

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