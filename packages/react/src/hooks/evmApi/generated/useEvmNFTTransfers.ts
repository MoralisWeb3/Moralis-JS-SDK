import Moralis from 'moralis';
import { GetNFTTransfersRequest, GetNFTTransfersResponse, getNFTTransfersOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';

export type UseEvmNFTTransfersParams = UseMoralisQueryParams<GetNFTTransfersResponse, GetNFTTransfersRequest>

export function useEvmNFTTransfers({ address,tokenId,chain,format,limit,cursor,disableTotal, ...queryParams }: UseEvmNFTTransfersParams = {}) {
  const resolver = usePaginatedOperationResolver(getNFTTransfersOperation, Moralis.EvmApi.baseUrl);

  const queryKey: [string, GetNFTTransfersRequest] | undefined = useMemo(() => {
    if (address &&tokenId ) {
      return [
      getNFTTransfersOperation.id,
      {
        address,tokenId,chain,format,limit,cursor,disableTotal
      },
    ];
    }
      return;
  }, [address,tokenId,chain,format,limit,cursor,disableTotal]);

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