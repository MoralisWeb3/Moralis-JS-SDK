import Moralis from 'moralis';
import { GetNFTTransfersByBlockRequest, GetNFTTransfersByBlockResponse, getNFTTransfersByBlockOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';

export type UseEvmNFTTransfersByBlockParams = UseMoralisQueryParams<GetNFTTransfersByBlockResponse, GetNFTTransfersByBlockRequest>

export function useEvmNFTTransfersByBlock({ blockNumberOrHash,chain,limit,cursor,disableTotal, ...queryParams }: UseEvmNFTTransfersByBlockParams = {}) {
  const resolver = usePaginatedOperationResolver(getNFTTransfersByBlockOperation, Moralis.EvmApi.baseUrl);

  const queryKey: [string, GetNFTTransfersByBlockRequest] | undefined = useMemo(() => {
    if (blockNumberOrHash ) {
      return [
      getNFTTransfersByBlockOperation.id,
      {
        blockNumberOrHash,chain,limit,cursor,disableTotal
      },
    ];
    }
      return;
  }, [blockNumberOrHash,chain,limit,cursor,disableTotal]);

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