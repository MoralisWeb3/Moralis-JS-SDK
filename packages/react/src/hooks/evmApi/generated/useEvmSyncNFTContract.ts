import Moralis from 'moralis';
import { SyncNFTContractRequest, SyncNFTContractResponse, syncNFTContractOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';

export type UseEvmSyncNFTContractParams = UseMoralisQueryParams<SyncNFTContractResponse, SyncNFTContractRequest>

export function useEvmSyncNFTContract({ address,chain, ...queryParams }: UseEvmSyncNFTContractParams = {}) {
  const resolver = useOperationResolver(syncNFTContractOperation, Moralis.EvmApi.baseUrl);

  const queryKey: [string, SyncNFTContractRequest] | undefined = useMemo(() => {
    if (address ) {
      return [
      syncNFTContractOperation.id,
      {
        address,chain
      },
    ];
    }
      return;
  }, [address,chain]);

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