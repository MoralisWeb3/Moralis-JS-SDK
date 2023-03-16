import Moralis from 'moralis';
import { GetNFTContractMetadataRequest, GetNFTContractMetadataResponse, getNFTContractMetadataOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useNullableOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmNFTContractMetadataParams = Partial<GetNFTContractMetadataRequest>;
export type UseEvmNFTContractMetadataQueryOptions = QueryOptions<GetNFTContractMetadataResponse | null, UseEvmNFTContractMetadataParams>;

export function useEvmNFTContractMetadata({ address, chain }: UseEvmNFTContractMetadataParams = {}, queryOptions: UseEvmNFTContractMetadataQueryOptions = {}) {
  const resolver = useNullableOperationResolver(getNFTContractMetadataOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address);
  }, [address]);

  const queryKey: [string, Partial<GetNFTContractMetadataRequest>] = useMemo(() => {
    return [
      getNFTContractMetadataOperation.id,
      {
        address, chain
      },
    ];
  }, [address, chain]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['address']);
      const response = await resolver.fetch(params);
      return response?.result || null;
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}