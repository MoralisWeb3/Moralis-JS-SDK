import { fetcher } from '../../../../utils/fetcher';
import { 
  getContractLogsOperation as operation, 
  GetContractLogsRequest, 
  GetContractLogsResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';
import Moralis from 'moralis';

export const useEvmContractLogs = (request: GetContractLogsRequest, fetchParams?: FetchParams) => {
  const { deserializeResponse, serializeRequest } = operation
  const { data, error, mutate, isValidating } = useSWR<GetContractLogsResponse>(
    ['evmApi/getContractLogs', { deserializeResponse, request: serializeRequest(request, Moralis.Core) }], 
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
