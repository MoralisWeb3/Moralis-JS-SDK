import { fetcher } from '../../../../utils/fetcher';
import { 
  getContractEventsOperation as operation, 
  GetContractEventsRequest, 
  GetContractEventsResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useEvmContractEvents = (request: GetContractEventsRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<GetContractEventsResponse>(
    ['evmApi/getContractEvents', {operation, request}], 
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
