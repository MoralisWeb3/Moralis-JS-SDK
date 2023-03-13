import Moralis from 'moralis';
import { GetNFTsRequest, GetNFTsResponse, getNFTsOperation } from 'moralis/common-sol-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseSolNFTsParams = UseMoralisQueryParams<GetNFTsResponse, Partial<GetNFTsRequest>>

export function useSolNFTs({ network, address, ...queryParams }: UseSolNFTsParams = {}) {
  const resolver = useOperationResolver(getNFTsOperation, Moralis.SolApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address);
  }, [address]);

  const queryKey: [string, Partial<GetNFTsRequest>] = useMemo(() => {
    return [
      getNFTsOperation.id,
      {
        network, address
      },
    ];
  }, [network, address]);

  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['address']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    ...queryParams,
    enabled: hasRequiredParams && queryParams.enabled,
  });
}