import Moralis from 'moralis';
import { GetNFTMetadataRequest, GetNFTMetadataResponse, getNFTMetadataOperation } from 'moralis/common-sol-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseSolNFTMetadataParams = Partial<GetNFTMetadataRequest>;
export type UseSolNFTMetadataQueryOptions = QueryOptions<GetNFTMetadataResponse, UseSolNFTMetadataParams>;

export function useSolNFTMetadata({ network, address }: UseSolNFTMetadataParams = {}, queryOptions: UseSolNFTMetadataQueryOptions = {}) {
  const resolver = useOperationResolver(getNFTMetadataOperation, Moralis.SolApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address);
  }, [address]);

  const queryKey: [string, Partial<GetNFTMetadataRequest>] = useMemo(() => {
    return [
      getNFTMetadataOperation.id,
      {
        network, address
      },
    ];
  }, [network, address]);

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