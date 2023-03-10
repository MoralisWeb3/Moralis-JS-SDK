import Moralis from 'moralis';
import { GetWalletNFTTransfersRequest, GetWalletNFTTransfersResponse, getWalletNFTTransfersOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';

export type UseEvmWalletNFTTransfersParams = UseMoralisQueryParams<GetWalletNFTTransfersResponse, GetWalletNFTTransfersRequest>

export function useEvmWalletNFTTransfers({ address,chain,format,direction,fromBlock,toBlock,limit,cursor,disableTotal, ...queryParams }: UseEvmWalletNFTTransfersParams = {}) {
  const resolver = usePaginatedOperationResolver(getWalletNFTTransfersOperation, Moralis.EvmApi.baseUrl);

  const queryKey: [string, GetWalletNFTTransfersRequest] | undefined = useMemo(() => {
    if (address ) {
      return [
      getWalletNFTTransfersOperation.id,
      {
        address,chain,format,direction,fromBlock,toBlock,limit,cursor,disableTotal
      },
    ];
    }
      return;
  }, [address,chain,format,direction,fromBlock,toBlock,limit,cursor,disableTotal]);

  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const { result } = await resolver.fetch(request);
      return result;
    },
    ...queryParams,
    enabled: queryKey && queryParams.enabled,
  });
}