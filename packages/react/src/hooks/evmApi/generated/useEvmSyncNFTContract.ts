import Moralis from 'moralis';
import { SyncNFTContractRequest, SyncNFTContractResponse, syncNFTContractOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmSyncNFTContractParams = UseMoralisQueryParams<SyncNFTContractResponse, Partial<SyncNFTContractRequest>>

export function useEvmSyncNFTContract({ address, chain, ...queryParams }: UseEvmSyncNFTContractParams = {}) {
  const resolver = useOperationResolver(syncNFTContractOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address);
  }, [address]);

  const queryKey: [string, Partial<SyncNFTContractRequest>] = useMemo(() => {
    return [
      syncNFTContractOperation.id,
      {
        address, chain
      },
    ];
  }, [address, chain]);

  return useQuery({
    ...queryParams,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['address']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    enabled: hasRequiredParams && queryParams.enabled,
  });
}