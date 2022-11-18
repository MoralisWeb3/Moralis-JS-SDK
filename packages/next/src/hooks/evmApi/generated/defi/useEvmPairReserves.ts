import { fetcher } from '../../../../utils/fetcher';
import { 
  getPairReservesOperation as operation, 
  GetPairReservesRequest, 
  GetPairReservesResponse 
} from 'moralis/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import useSWR from 'swr';

export const useEvmPairReserves = (request: GetPairReservesRequest, SWRConfig?: SWRConfiguration) => {
  const { data, error, mutate, isValidating } = useSWR<GetPairReservesResponse>(
    ['evmApi/getPairReserves', {operation, request}], 
    fetcher, 
    {revalidateOnFocus: false, ...SWRConfig}
  );

  return {
    data,
    error,
    refetch: async () => mutate(),
    isValidating,
  };
};
