import Moralis from 'moralis';
import { GetMultipleNFTsRequest, GetMultipleNFTsResponse, getMultipleNFTsOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmMultipleNFTsParams = UseMoralisQueryParams<GetMultipleNFTsResponse, Partial<GetMultipleNFTsRequest>>

export function useEvmMultipleNFTs({ tokens, normalizeMetadata, chain, ...queryParams }: UseEvmMultipleNFTsParams = {}) {
  const resolver = useOperationResolver(getMultipleNFTsOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(tokens);
  }, [tokens]);

  const queryKey: [string, Partial<GetMultipleNFTsRequest>] = useMemo(() => {
    return [
      getMultipleNFTsOperation.id,
      {
        tokens, normalizeMetadata, chain
      },
    ];
  }, [tokens, normalizeMetadata, chain]);

  return useQuery({
    ...queryParams,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['tokens']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    enabled: hasRequiredParams && queryParams.enabled,
  });
}