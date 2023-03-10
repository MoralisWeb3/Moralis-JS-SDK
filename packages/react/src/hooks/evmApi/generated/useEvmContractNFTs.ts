import Moralis from 'moralis';
import { GetContractNFTsRequest, GetContractNFTsResponse, getContractNFTsOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';

export type UseEvmContractNFTsParams = UseMoralisQueryParams<GetContractNFTsResponse, GetContractNFTsRequest>

export function useEvmContractNFTs({ address,chain,format,limit,totalRanges,range,cursor,normalizeMetadata,disableTotal, ...queryParams }: UseEvmContractNFTsParams = {}) {
  const resolver = usePaginatedOperationResolver(getContractNFTsOperation, Moralis.EvmApi.baseUrl);

  const queryKey: [string, GetContractNFTsRequest] | undefined = useMemo(() => {
    if (address ) {
      return [
      getContractNFTsOperation.id,
      {
        address,chain,format,limit,totalRanges,range,cursor,normalizeMetadata,disableTotal
      },
    ];
    }
      return;
  }, [address,chain,format,limit,totalRanges,range,cursor,normalizeMetadata,disableTotal]);

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