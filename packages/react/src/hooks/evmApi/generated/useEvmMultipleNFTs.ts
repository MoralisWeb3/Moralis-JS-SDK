import Moralis from 'moralis';
import { GetMultipleNFTsRequest, GetMultipleNFTsResponse, getMultipleNFTsOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';

export type UseEvmMultipleNFTsParams = UseMoralisQueryParams<GetMultipleNFTsResponse, GetMultipleNFTsRequest>

export function useEvmMultipleNFTs({ tokens, normalizeMetadata, chain, ...queryParams }: UseEvmMultipleNFTsParams = {}) {
  const resolver = useOperationResolver(getMultipleNFTsOperation, Moralis.EvmApi.baseUrl);

  const queryKey: [string, GetMultipleNFTsRequest] | undefined = useMemo(() => {
    if (tokens) {
      return [
      getMultipleNFTsOperation.id,
      {
        tokens, normalizeMetadata, chain
      },
    ];
    }
      return;
  }, [tokens, normalizeMetadata, chain]);

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