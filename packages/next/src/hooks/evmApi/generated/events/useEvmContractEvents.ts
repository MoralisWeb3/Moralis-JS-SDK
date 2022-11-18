import { fetcher } from '../../../../utils/fetcher';
import { 
  getContractEventsOperation as operation, 
  GetContractEventsRequest, 
  GetContractEventsResponse 
} from 'moralis/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import useSWR from 'swr';

export const useEvmContractEvents = (request: GetContractEventsRequest, SWRConfig?: SWRConfiguration) => {
  const { data, error, mutate, isValidating } = useSWR<GetContractEventsResponse>(
    ['evmApi/getContractEvents', {operation, request}], 
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
