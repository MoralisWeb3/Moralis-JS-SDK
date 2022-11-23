import { fetcher } from '../../../../utils/fetcher';
import { 
  resolveAddressOperation as operation, 
  ResolveAddressRequest, 
  ResolveAddressResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useEvmResolveAddress = (request: ResolveAddressRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<ResolveAddressResponse>(
    ['evmApi/resolveAddress', {operation, request}], 
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
