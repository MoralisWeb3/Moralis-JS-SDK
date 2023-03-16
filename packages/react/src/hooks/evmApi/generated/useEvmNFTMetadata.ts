import Moralis from 'moralis';
import { GetNFTMetadataRequest, GetNFTMetadataResponse, getNFTMetadataOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useNullableOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmNFTMetadataParams = Partial<GetNFTMetadataRequest>;
export type UseEvmNFTMetadataQueryOptions = QueryOptions<GetNFTMetadataResponse | null, UseEvmNFTMetadataParams>;

export function useEvmNFTMetadata({ address, tokenId, chain, format, normalizeMetadata }: UseEvmNFTMetadataParams = {}, queryOptions: UseEvmNFTMetadataQueryOptions = {}) {
  const resolver = useNullableOperationResolver(getNFTMetadataOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address && tokenId);
  }, [address, tokenId]);

  const queryKey: [string, Partial<GetNFTMetadataRequest>] = useMemo(() => {
    return [
      getNFTMetadataOperation.id,
      {
        address, tokenId, chain, format, normalizeMetadata
      },
    ];
  }, [address, tokenId, chain, format, normalizeMetadata]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['address', 'tokenId']);
      const response = await resolver.fetch(params);
      return response?.result || null;
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}