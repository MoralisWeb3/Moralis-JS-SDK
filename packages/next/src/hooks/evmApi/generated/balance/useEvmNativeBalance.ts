import { fetcher } from '../../../../utils/fetcher';
import { 
  getNativeBalanceOperation as operation, 
  GetNativeBalanceRequest, 
  GetNativeBalanceResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useEvmNativeBalance = (request: GetNativeBalanceRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<GetNativeBalanceResponse>(
    ['evmApi/getNativeBalance', {operation, request}], 
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
