import { fetcher } from '../../../../utils/fetcher';
import { 
  getPairAddressOperation as operation, 
  GetPairAddressRequest, 
  GetPairAddressResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useEvmPairAddress = (request: GetPairAddressRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<GetPairAddressResponse>(
    ['evmApi/getPairAddress', {operation, request}], 
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
