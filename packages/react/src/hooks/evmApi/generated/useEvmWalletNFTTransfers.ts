import Moralis from 'moralis';
import { GetWalletNFTTransfersRequest, GetWalletNFTTransfersResponse, getWalletNFTTransfersOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmWalletNFTTransfersParams = UseMoralisQueryParams<GetWalletNFTTransfersResponse, Partial<GetWalletNFTTransfersRequest>>

export function useEvmWalletNFTTransfers({ address, chain, format, direction, fromBlock, toBlock, limit, cursor, disableTotal, ...queryParams }: UseEvmWalletNFTTransfersParams = {}) {
  const resolver = usePaginatedOperationResolver(getWalletNFTTransfersOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address && address);
  }, [address , address]);

  const queryKey: [string, Partial<GetWalletNFTTransfersRequest>] = useMemo(() => {
    return [
      getWalletNFTTransfersOperation.id,
      {
        address, chain, format, direction, fromBlock, toBlock, limit, cursor, disableTotal
      },
    ];
  }, [address, chain, format, direction, fromBlock, toBlock, limit, cursor, disableTotal]);

  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['address' , 'address']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    ...queryParams,
    enabled: hasRequiredParams && queryParams.enabled,
  });
}