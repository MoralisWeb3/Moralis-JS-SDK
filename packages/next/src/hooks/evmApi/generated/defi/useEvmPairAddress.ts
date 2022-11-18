import { fetcher } from '../../../../utils/fetcher';
import { 
  getPairAddressOperation as operation, 
  GetPairAddressRequest, 
  GetPairAddressResponse 
} from 'moralis/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import useSWR from 'swr';

export const useEvmPairAddress = (request: GetPairAddressRequest, SWRConfig?: SWRConfiguration) => {
  const { data, error, mutate, isValidating } = useSWR<GetPairAddressResponse>(
    ['evmApi/getPairAddress', {operation, request}], 
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
