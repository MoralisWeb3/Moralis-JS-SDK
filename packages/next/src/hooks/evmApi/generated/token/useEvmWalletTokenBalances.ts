import { fetcher } from '../../../../utils/fetcher';
import { 
  getWalletTokenBalancesOperation as operation, 
  GetWalletTokenBalancesRequest, 
  GetWalletTokenBalancesResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';
import Moralis from 'moralis';

export const useEvmWalletTokenBalances = (request: GetWalletTokenBalancesRequest, fetchParams?: FetchParams) => {
  const { deserializeResponse, serializeRequest } = operation
  const { data, error, mutate, isValidating } = useSWR<GetWalletTokenBalancesResponse>(
    ['evmApi/getWalletTokenBalances', { deserializeResponse, request: serializeRequest(request, Moralis.Core) }], 
    fetcher, 
    {revalidateOnFocus: false, ...fetchParams}
  );

  return {
    data,
    error,
    refetch: async () => mutate(),
    isValidating,
  };
};
