import { fetcher } from '../../../../utils/fetcher';
import { 
  getContractLogsOperation as operation, 
  GetContractLogsRequest, 
  GetContractLogsResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useEvmContractLogs = (request: GetContractLogsRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<GetContractLogsResponse>(
    ['evmApi/getContractLogs', {operation, request}], 
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
