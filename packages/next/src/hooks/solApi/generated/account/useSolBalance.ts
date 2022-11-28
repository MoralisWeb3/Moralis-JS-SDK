import { fetcher } from '../../../../utils/fetcher';
import { 
  getBalanceOperation as operation, 
  GetBalanceRequest, 
  GetBalanceResponse 
} from 'moralis/common-sol-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useSolBalance = (request: GetBalanceRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<GetBalanceResponse>(
    ['solApi/getBalance', {operation, request}], 
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
