import Moralis from 'moralis';
import { GetMultipleNFTsRequest, GetMultipleNFTsResponse, getMultipleNFTsOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmMultipleNFTsParams = Partial<GetMultipleNFTsRequest>;
export type UseEvmMultipleNFTsQueryOptions = QueryOptions<GetMultipleNFTsResponse, UseEvmMultipleNFTsParams>;

export function useEvmMultipleNFTs({ tokens, normalizeMetadata, chain }: UseEvmMultipleNFTsParams = {}, queryOptions: UseEvmMultipleNFTsQueryOptions = {}) {
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
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['tokens']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}