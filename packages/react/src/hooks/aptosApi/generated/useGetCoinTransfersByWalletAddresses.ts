import { GetCoinTransfersByWalletAddressesOperationRequest, AptosGetCoinTransfersByOwnerAddressesResponse, GetCoinTransfersByWalletAddressesOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseGetCoinTransfersByWalletAddressesParams = Partial<GetCoinTransfersByWalletAddressesOperationRequest>;
export type UseGetCoinTransfersByWalletAddressesQueryOptions = QueryOptions<AptosGetCoinTransfersByOwnerAddressesResponse, UseGetCoinTransfersByWalletAddressesParams>;

export function useGetCoinTransfersByWalletAddresses({ limit, offset, cursor, ownerAddresses, fromDate, toDate, coinTypeBlacklist, coinTypeWhitelist, network }: UseGetCoinTransfersByWalletAddressesParams = {},  queryOptions: UseGetCoinTransfersByWalletAddressesQueryOptions = {}) {
  const resolver = useOperationV3Resolver(GetCoinTransfersByWalletAddressesOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(limit && ownerAddresses);
  }, [limit, ownerAddresses]);

  const queryKey: [string, Partial<GetCoinTransfersByWalletAddressesOperationRequest>] = useMemo(() => {
    return [
      GetCoinTransfersByWalletAddressesOperation.operationId,
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
