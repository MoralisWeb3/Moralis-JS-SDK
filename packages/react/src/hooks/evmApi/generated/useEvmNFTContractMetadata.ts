import Moralis from 'moralis';
import { GetNFTContractMetadataRequest, GetNFTContractMetadataResponse, getNFTContractMetadataOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useNullableOperationResolver, useQuery } from '../../utils';

export type UseEvmNFTContractMetadataParams = UseMoralisQueryParams<GetNFTContractMetadataResponse, GetNFTContractMetadataRequest>

export function useEvmNFTContractMetadata({ address,chain, ...queryParams }: UseEvmNFTContractMetadataParams = {}) {
  const resolver = useNullableOperationResolver(getNFTContractMetadataOperation, Moralis.EvmApi.baseUrl);

  const queryKey: [string, GetNFTContractMetadataRequest] | undefined = useMemo(() => {
    if (address ) {
      return [
      getNFTContractMetadataOperation.id,
      {
        address,chain
      },
    ];
    }
      return;
  }, [address,chain]);

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