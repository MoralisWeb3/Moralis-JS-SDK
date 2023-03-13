import Moralis from 'moralis';
import { GetNFTContractMetadataRequest, GetNFTContractMetadataResponse, getNFTContractMetadataOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useNullableOperationResolver, useQuery } from '../../utils';

type GetNFTContractMetadataParams = Partial<GetNFTContractMetadataRequest>;
export type UseEvmNFTContractMetadataParams = UseMoralisQueryParams<GetNFTContractMetadataResponse | null, GetNFTContractMetadataParams>

export function useEvmNFTContractMetadata({ address, chain, ...queryParams }: UseEvmNFTContractMetadataParams = {}) {
  const resolver = useNullableOperationResolver(getNFTContractMetadataOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    if (address) {
      return true
    }
    return false;
  }, [address])

  const queryKey: [string, GetNFTContractMetadataParams] = useMemo(() => {
    return [
      getNFTContractMetadataOperation.id,
      {
        address, chain
      },
    ];
  }, [address, chain]);

  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const response = await resolver.fetch(request as GetNFTContractMetadataRequest);
      return response?.result || null;
    },
    ...queryParams,
    enabled: hasRequiredParams && queryParams.enabled,
  });


}