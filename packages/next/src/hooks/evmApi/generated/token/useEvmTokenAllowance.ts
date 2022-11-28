import { fetcher } from '../../../../utils/fetcher';
import { 
  getTokenAllowanceOperation as operation, 
  GetTokenAllowanceRequest, 
  GetTokenAllowanceResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useEvmTokenAllowance = (request: GetTokenAllowanceRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<GetTokenAllowanceResponse>(
    ['evmApi/getTokenAllowance', {operation, request}], 
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
