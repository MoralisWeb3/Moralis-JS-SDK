import { fetcher } from '../../../../utils/fetcher';
import { 
  getPairReservesOperation as operation, 
  GetPairReservesRequest, 
  GetPairReservesResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';
import Moralis from 'moralis';

export const useEvmPairReserves = (request: GetPairReservesRequest, fetchParams?: FetchParams) => {
  const { deserializeResponse, serializeRequest } = operation
  const { data, error, mutate, isValidating } = useSWR<GetPairReservesResponse>(
    ['evmApi/getPairReserves', { deserializeResponse, request: serializeRequest(request, Moralis.Core) }], 
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
