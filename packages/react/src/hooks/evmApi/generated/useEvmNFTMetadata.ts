import Moralis from 'moralis';
import { GetNFTMetadataRequest, GetNFTMetadataResponse, getNFTMetadataOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useNullableOperationResolver, useQuery } from '../../utils';

export type UseEvmNFTMetadataParams = UseMoralisQueryParams<GetNFTMetadataResponse| null, GetNFTMetadataRequest>

export function useEvmNFTMetadata({ address, tokenId, chain, format, normalizeMetadata, ...queryParams }: UseEvmNFTMetadataParams = {}) {
  const resolver = useNullableOperationResolver(getNFTMetadataOperation, Moralis.EvmApi.baseUrl);

  const queryKey: [string, GetNFTMetadataRequest] | undefined = useMemo(() => {
    if (address && tokenId) {
      return [
      getNFTMetadataOperation.id,
      {
        address, tokenId, chain, format, normalizeMetadata
      },
    ];
    }
      return;
  }, [address, tokenId, chain, format, normalizeMetadata]);

  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const response = await resolver.fetch(request);
      return response?.result || null;
    },
    ...queryParams,
    enabled: queryKey && queryParams.enabled,
  });
}