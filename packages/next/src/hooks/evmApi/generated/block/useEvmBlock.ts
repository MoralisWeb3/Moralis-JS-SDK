import { fetcher } from '../../../../utils/fetcher';
import { 
  getBlockOperation as operation, 
  GetBlockRequest, 
  GetBlockResponse 
} from 'moralis/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import useSWR from 'swr';

export const useEvmBlock = (request: GetBlockRequest, SWRConfig?: SWRConfiguration) => {
  const { data, error, mutate, isValidating } = useSWR<GetBlockResponse>(
    ['evmApi/getBlock', {operation, request}], 
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
