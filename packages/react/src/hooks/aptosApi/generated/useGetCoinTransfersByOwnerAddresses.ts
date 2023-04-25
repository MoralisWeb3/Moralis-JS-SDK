import { GetCoinTransfersByOwnerAddressesOperationRequest, AptosGetCoinTransfersByOwnerAddressesResponse, GetCoinTransfersByOwnerAddressesOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseGetCoinTransfersByOwnerAddressesParams = Partial<GetCoinTransfersByOwnerAddressesOperationRequest>;
export type UseGetCoinTransfersByOwnerAddressesQueryOptions = QueryOptions<AptosGetCoinTransfersByOwnerAddressesResponse, UseGetCoinTransfersByOwnerAddressesParams>;

export function useGetCoinTransfersByOwnerAddresses({ limit, offset, cursor, ownerAddresses, fromDate, toDate, coinTypeBlacklist, coinTypeWhitelist, network }: UseGetCoinTransfersByOwnerAddressesParams = {},  queryOptions: UseGetCoinTransfersByOwnerAddressesQueryOptions = {}) {
  const resolver = useOperationV3Resolver(GetCoinTransfersByOwnerAddressesOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(limit && ownerAddresses);
  }, [limit, ownerAddresses]);

  const queryKey: [string, Partial<GetCoinTransfersByOwnerAddressesOperationRequest>] = useMemo(() => {
    return [
      GetCoinTransfersByOwnerAddressesOperation.operationId,
      {
        limit, offset, cursor, ownerAddresses, fromDate, toDate, coinTypeBlacklist, coinTypeWhitelist, network
      },
    ];
  }, [limit, offset, cursor, ownerAddresses, fromDate, toDate, coinTypeBlacklist, coinTypeWhitelist, network]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['limit', 'ownerAddresses']);
      return resolver.resolve(params, {});
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}
