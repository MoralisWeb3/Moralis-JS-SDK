import Moralis from 'moralis';
import { GetNFTContractTransfersRequest, GetNFTContractTransfersResponse, getNFTContractTransfersOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmNFTContractTransfersParams = UseMoralisQueryParams<GetNFTContractTransfersResponse, Partial<GetNFTContractTransfersRequest>>

export function useEvmNFTContractTransfers({ address, chain, format, limit, cursor, fromBlock, fromDate, toBlock, toDate, disableTotal, ...queryParams }: UseEvmNFTContractTransfersParams = {}) {
  const resolver = usePaginatedOperationResolver(getNFTContractTransfersOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address);
  }, [address]);

  const queryKey: [string, Partial<GetNFTContractTransfersRequest>] = useMemo(() => {
    return [
      getNFTContractTransfersOperation.id,
      {
        address, chain, format, limit, cursor, fromBlock, fromDate, toBlock, toDate, disableTotal
      },
    ];
  }, [address, chain, format, limit, cursor, fromBlock, fromDate, toBlock, toDate, disableTotal]);

  return useQuery({
    ...queryParams,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['address']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    enabled: hasRequiredParams && queryParams.enabled,
  });
}