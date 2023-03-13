import Moralis from 'moralis';
import { GetNFTTransfersRequest, GetNFTTransfersResponse, getNFTTransfersOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmNFTTransfersParams = UseMoralisQueryParams<GetNFTTransfersResponse, Partial<GetNFTTransfersRequest>>

export function useEvmNFTTransfers({ address, tokenId, chain, format, limit, cursor, disableTotal, ...queryParams }: UseEvmNFTTransfersParams = {}) {
  const resolver = usePaginatedOperationResolver(getNFTTransfersOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address && tokenId);
  }, [address , tokenId]);

  const queryKey: [string, Partial<GetNFTTransfersRequest>] = useMemo(() => {
    return [
      getNFTTransfersOperation.id,
      {
        address, tokenId, chain, format, limit, cursor, disableTotal
      },
    ];
  }, [address, tokenId, chain, format, limit, cursor, disableTotal]);

  return useQuery({
    ...queryParams,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['address', 'tokenId']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    enabled: hasRequiredParams && queryParams.enabled,
  });
}