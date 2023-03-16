import Moralis from 'moralis';
import { GetWalletNFTCollectionsRequest, GetWalletNFTCollectionsResponse, getWalletNFTCollectionsOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmWalletNFTCollectionsParams = Partial<GetWalletNFTCollectionsRequest>;
export type UseEvmWalletNFTCollectionsQueryOptions = QueryOptions<GetWalletNFTCollectionsResponse, UseEvmWalletNFTCollectionsParams>;

export function useEvmWalletNFTCollections({ address, chain, limit, cursor, disableTotal }: UseEvmWalletNFTCollectionsParams = {}, queryOptions: UseEvmWalletNFTCollectionsQueryOptions = {}) {
  const resolver = usePaginatedOperationResolver(getWalletNFTCollectionsOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address);
  }, [address]);

  const queryKey: [string, Partial<GetWalletNFTCollectionsRequest>] = useMemo(() => {
    return [
      getWalletNFTCollectionsOperation.id,
      {
        address, chain, limit, cursor, disableTotal
      },
    ];
  }, [address, chain, limit, cursor, disableTotal]);

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