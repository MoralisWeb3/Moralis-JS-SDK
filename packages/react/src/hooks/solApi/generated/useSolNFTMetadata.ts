import Moralis from 'moralis';
import { GetNFTMetadataRequest, GetNFTMetadataResponse, getNFTMetadataOperation } from 'moralis/common-sol-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseSolNFTMetadataParams = UseMoralisQueryParams<GetNFTMetadataResponse, Partial<GetNFTMetadataRequest>>

export function useSolNFTMetadata({ network, address, ...queryParams }: UseSolNFTMetadataParams = {}) {
  const resolver = useOperationResolver(getNFTMetadataOperation, Moralis.SolApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address && address);
  }, [address , address]);

  const queryKey: [string, Partial<GetNFTMetadataRequest>] = useMemo(() => {
    return [
      getNFTMetadataOperation.id,
      {
        network, address
      },
    ];
  }, [network, address]);

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