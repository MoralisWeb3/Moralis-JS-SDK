import { fetcher } from '../../../../utils/fetcher';
import { 
  getTokenAllowanceOperation as operation, 
  GetTokenAllowanceRequest, 
  GetTokenAllowanceResponse 
} from 'moralis/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import useSWR from 'swr';

export const useEvmTokenAllowance = (request: GetTokenAllowanceRequest, SWRConfig?: SWRConfiguration) => {
  const { data, error, mutate, isValidating } = useSWR<GetTokenAllowanceResponse>(
    ['evmApi/getTokenAllowance', {operation, request}], 
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
