import { fetcher } from '../../../../utils/fetcher';
import { 
  getSPLOperation as operation, 
  GetSPLRequest, 
  GetSPLResponse 
} from 'moralis/common-sol-utils';
import { SWRConfiguration } from 'swr/dist/types';
import useSWR from 'swr';

export const useSolSPL = (request: GetSPLRequest, SWRConfig?: SWRConfiguration) => {
  const { data, error, mutate, isValidating } = useSWR<GetSPLResponse>(
    ['solApi/getSPL', {operation, request}], 
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
