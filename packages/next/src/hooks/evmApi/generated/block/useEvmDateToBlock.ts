import { fetcher } from '../../../../utils/fetcher';
import { 
  getDateToBlockOperation as operation, 
  GetDateToBlockRequest, 
  GetDateToBlockResponse 
} from 'moralis/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import useSWR from 'swr';

export const useEvmDateToBlock = (request: GetDateToBlockRequest, SWRConfig?: SWRConfiguration) => {
  const { data, error, mutate, isValidating } = useSWR<GetDateToBlockResponse>(
    ['evmApi/getDateToBlock', {operation, request}], 
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
