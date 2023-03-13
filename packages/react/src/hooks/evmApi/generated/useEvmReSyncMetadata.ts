import Moralis from 'moralis';
import { ReSyncMetadataRequest, ReSyncMetadataResponse, reSyncMetadataOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmReSyncMetadataParams = UseMoralisQueryParams<ReSyncMetadataResponse, Partial<ReSyncMetadataRequest>>

export function useEvmReSyncMetadata({ address, tokenId, chain, flag, mode, ...queryParams }: UseEvmReSyncMetadataParams = {}) {
  const resolver = useOperationResolver(reSyncMetadataOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address && address && tokenId);
  }, [address , address , tokenId]);

  const queryKey: [string, Partial<ReSyncMetadataRequest>] = useMemo(() => {
    return [
      reSyncMetadataOperation.id,
      {
        address, tokenId, chain, flag, mode
      },
    ];
  }, [address, tokenId, chain, flag, mode]);

  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['address' , 'address' , 'tokenId']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    ...queryParams,
    enabled: hasRequiredParams && queryParams.enabled,
  });
}