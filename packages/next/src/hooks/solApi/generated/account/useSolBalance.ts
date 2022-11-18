import { fetcher } from '../../../../utils/fetcher';
import { 
  getBalanceOperation as operation, 
  GetBalanceRequest, 
  GetBalanceResponse 
} from 'moralis/common-sol-utils';
import { SWRConfiguration } from 'swr/dist/types';
import useSWR from 'swr';

export const useSolBalance = (request: GetBalanceRequest, SWRConfig?: SWRConfiguration) => {
  const { data, error, mutate, isValidating } = useSWR<GetBalanceResponse>(
    ['solApi/getBalance', {operation, request}], 
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
