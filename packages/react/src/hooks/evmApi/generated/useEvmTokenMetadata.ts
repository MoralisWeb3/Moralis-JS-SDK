import Moralis from 'moralis';
import { GetTokenMetadataRequest, GetTokenMetadataResponse, getTokenMetadataOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmTokenMetadataParams = UseMoralisQueryParams<GetTokenMetadataResponse, Partial<GetTokenMetadataRequest>>

export function useEvmTokenMetadata({ chain, addresses, ...queryParams }: UseEvmTokenMetadataParams = {}) {
  const resolver = useOperationResolver(getTokenMetadataOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(addresses);
  }, [addresses]);

  const queryKey: [string, Partial<GetTokenMetadataRequest>] = useMemo(() => {
    return [
      getTokenMetadataOperation.id,
      {
        chain, addresses
      },
    ];
  }, [chain, addresses]);

  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['addresses']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    ...queryParams,
    enabled: hasRequiredParams && queryParams.enabled,
  });
}