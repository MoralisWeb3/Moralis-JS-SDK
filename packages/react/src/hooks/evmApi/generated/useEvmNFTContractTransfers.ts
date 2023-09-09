import Moralis from 'moralis';
import { GetNFTContractTransfersRequest, GetNFTContractTransfersResponse, getNFTContractTransfersOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmNFTContractTransfersParams = Partial<GetNFTContractTransfersRequest>;
export type UseEvmNFTContractTransfersQueryOptions = QueryOptions<GetNFTContractTransfersResponse, UseEvmNFTContractTransfersParams>;

export function useEvmNFTContractTransfers({ address, chain, format, limit, cursor, fromBlock, fromDate, toBlock, toDate }: UseEvmNFTContractTransfersParams = {}, queryOptions: UseEvmNFTContractTransfersQueryOptions = {}) {
  const resolver = usePaginatedOperationResolver(getNFTContractTransfersOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address);
  }, [address]);

  const queryKey: [string, Partial<GetNFTContractTransfersRequest>] = useMemo(() => {
    return [
      getNFTContractTransfersOperation.id,
      {
        address, chain, format, limit, cursor, fromBlock, fromDate, toBlock, toDate
      },
    ];
  }, [address, chain, format, limit, cursor, fromBlock, fromDate, toBlock, toDate]);

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
