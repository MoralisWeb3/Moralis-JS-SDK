import { fetcher } from '../../../../utils/fetcher';
import { 
  getSPLOperation as operation, 
  GetSPLRequest, 
  GetSPLResponse 
} from 'moralis/common-sol-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useSolSPL = (request: GetSPLRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<GetSPLResponse>(
    ['solApi/getSPL', {operation, request}], 
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
