import Moralis from 'moralis';
import { GetContractNFTsRequest, GetContractNFTsResponse, getContractNFTsOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmContractNFTsParams = Partial<GetContractNFTsRequest>;
export type UseEvmContractNFTsQueryOptions = QueryOptions<GetContractNFTsResponse, UseEvmContractNFTsParams>;

export function useEvmContractNFTs({ address, chain, format, limit, totalRanges, range, cursor, normalizeMetadata, disableTotal }: UseEvmContractNFTsParams = {}, queryOptions: UseEvmContractNFTsQueryOptions = {}) {
  const resolver = usePaginatedOperationResolver(getContractNFTsOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address);
  }, [address]);

  const queryKey: [string, Partial<GetContractNFTsRequest>] = useMemo(() => {
    return [
      getContractNFTsOperation.id,
      {
        address, chain, format, limit, totalRanges, range, cursor, normalizeMetadata, disableTotal
      },
    ];
  }, [address, chain, format, limit, totalRanges, range, cursor, normalizeMetadata, disableTotal]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['address']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}