import Moralis from 'moralis';
import { GetNFTContractTransfersRequest, GetNFTContractTransfersResponse, getNFTContractTransfersOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';

export type UseEvmNFTContractTransfersParams = UseMoralisQueryParams<GetNFTContractTransfersResponse, GetNFTContractTransfersRequest>

export function useEvmNFTContractTransfers({ address,chain,format,limit,cursor,fromBlock,fromDate,toBlock,toDate,disableTotal, ...queryParams }: UseEvmNFTContractTransfersParams = {}) {
  const resolver = usePaginatedOperationResolver(getNFTContractTransfersOperation, Moralis.EvmApi.baseUrl);

  const queryKey: [string, GetNFTContractTransfersRequest] | undefined = useMemo(() => {
    if (address ) {
      return [
      getNFTContractTransfersOperation.id,
      {
        address,chain,format,limit,cursor,fromBlock,fromDate,toBlock,toDate,disableTotal
      },
    ];
    }
      return;
  }, [address,chain,format,limit,cursor,fromBlock,fromDate,toBlock,toDate,disableTotal]);

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