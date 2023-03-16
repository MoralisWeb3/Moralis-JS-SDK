import Moralis from 'moralis';
import { GetNFTTransfersByBlockRequest, GetNFTTransfersByBlockResponse, getNFTTransfersByBlockOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmNFTTransfersByBlockParams = Partial<GetNFTTransfersByBlockRequest>;
export type UseEvmNFTTransfersByBlockQueryOptions = QueryOptions<GetNFTTransfersByBlockResponse, UseEvmNFTTransfersByBlockParams>;

export function useEvmNFTTransfersByBlock({ blockNumberOrHash, chain, limit, cursor, disableTotal }: UseEvmNFTTransfersByBlockParams = {}, queryOptions: UseEvmNFTTransfersByBlockQueryOptions = {}) {
  const resolver = usePaginatedOperationResolver(getNFTTransfersByBlockOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(blockNumberOrHash);
  }, [blockNumberOrHash]);

  const queryKey: [string, Partial<GetNFTTransfersByBlockRequest>] = useMemo(() => {
    return [
      getNFTTransfersByBlockOperation.id,
      {
        blockNumberOrHash, chain, limit, cursor, disableTotal
      },
    ];
  }, [blockNumberOrHash, chain, limit, cursor, disableTotal]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['blockNumberOrHash']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}