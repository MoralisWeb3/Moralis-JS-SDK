import Moralis from 'moralis';
import { GetNFTMetadataRequest, GetNFTMetadataResponse, getNFTMetadataOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useNullableOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmNFTMetadataParams = UseMoralisQueryParams<GetNFTMetadataResponse| null, Partial<GetNFTMetadataRequest>>

export function useEvmNFTMetadata({ address, tokenId, chain, format, normalizeMetadata, ...queryParams }: UseEvmNFTMetadataParams = {}) {
  const resolver = useNullableOperationResolver(getNFTMetadataOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address && address && tokenId);
  }, [address , address , tokenId]);

  const queryKey: [string, Partial<GetNFTMetadataRequest>] = useMemo(() => {
    return [
      getNFTMetadataOperation.id,
      {
        address, tokenId, chain, format, normalizeMetadata
      },
    ];
  }, [address, tokenId, chain, format, normalizeMetadata]);

  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['address' , 'address' , 'tokenId']);
      const response = await resolver.fetch(params);
      return response?.result || null;
    },
    ...queryParams,
    enabled: hasRequiredParams && queryParams.enabled,
  });
}