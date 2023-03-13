import Moralis from 'moralis';
import { GetNFTContractMetadataRequest, GetNFTContractMetadataResponse, getNFTContractMetadataOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useNullableOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmNFTContractMetadataParams = UseMoralisQueryParams<GetNFTContractMetadataResponse| null, Partial<GetNFTContractMetadataRequest>>

export function useEvmNFTContractMetadata({ address, chain, ...queryParams }: UseEvmNFTContractMetadataParams = {}) {
  const resolver = useNullableOperationResolver(getNFTContractMetadataOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address && address);
  }, [address , address]);

  const queryKey: [string, Partial<GetNFTContractMetadataRequest>] = useMemo(() => {
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
      const params = validateParams(request, ['address' , 'address']);
      const response = await resolver.fetch(params);
      return response?.result || null;
    },
    ...queryParams,
    enabled: hasRequiredParams && queryParams.enabled,
  });
}