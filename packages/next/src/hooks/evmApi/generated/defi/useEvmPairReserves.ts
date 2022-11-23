import { fetcher } from '../../../../utils/fetcher';
import { 
  getPairReservesOperation as operation, 
  GetPairReservesRequest, 
  GetPairReservesResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useEvmPairReserves = (request: GetPairReservesRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<GetPairReservesResponse>(
    ['evmApi/getPairReserves', {operation, request}], 
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
