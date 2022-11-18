import { fetcher } from '../../../../utils/fetcher';
import { 
  resolveAddressOperation as operation, 
  ResolveAddressRequest, 
  ResolveAddressResponse 
} from 'moralis/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import useSWR from 'swr';

export const useEvmResolveAddress = (request: ResolveAddressRequest, SWRConfig?: SWRConfiguration) => {
  const { data, error, mutate, isValidating } = useSWR<ResolveAddressResponse>(
    ['evmApi/resolveAddress', {operation, request}], 
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
