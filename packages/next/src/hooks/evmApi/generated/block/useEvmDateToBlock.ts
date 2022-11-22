import { fetcher } from '../../../../utils/fetcher';
import { 
  getDateToBlockOperation as operation, 
  GetDateToBlockRequest, 
  GetDateToBlockResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useEvmDateToBlock = (request: GetDateToBlockRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<GetDateToBlockResponse>(
    ['evmApi/getDateToBlock', {operation, request}], 
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
