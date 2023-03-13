import Moralis from 'moralis';
import { GetNFTTransfersByBlockRequest, GetNFTTransfersByBlockResponse, getNFTTransfersByBlockOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmNFTTransfersByBlockParams = UseMoralisQueryParams<GetNFTTransfersByBlockResponse, Partial<GetNFTTransfersByBlockRequest>>

export function useEvmNFTTransfersByBlock({ blockNumberOrHash, chain, limit, cursor, disableTotal, ...queryParams }: UseEvmNFTTransfersByBlockParams = {}) {
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
    ...queryParams,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['blockNumberOrHash']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    enabled: hasRequiredParams && queryParams.enabled,
  });
}