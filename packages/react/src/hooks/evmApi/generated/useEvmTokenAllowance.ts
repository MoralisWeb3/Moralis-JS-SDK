import Moralis from 'moralis';
import { GetTokenAllowanceRequest, GetTokenAllowanceResponse, getTokenAllowanceOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmTokenAllowanceParams = Partial<GetTokenAllowanceRequest>;
export type UseEvmTokenAllowanceQueryOptions = QueryOptions<GetTokenAllowanceResponse, UseEvmTokenAllowanceParams>;

export function useEvmTokenAllowance({ address, chain, ownerAddress, spenderAddress }: UseEvmTokenAllowanceParams = {}, queryOptions: UseEvmTokenAllowanceQueryOptions = {}) {
  const resolver = useOperationResolver(getTokenAllowanceOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(ownerAddress && spenderAddress && address);
  }, [ownerAddress, spenderAddress, address]);

  const queryKey: [string, Partial<GetTokenAllowanceRequest>] = useMemo(() => {
    return [
      getTokenAllowanceOperation.id,
      {
        address, chain, ownerAddress, spenderAddress
      },
    ];
  }, [address, chain, ownerAddress, spenderAddress]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['ownerAddress', 'spenderAddress', 'address']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}