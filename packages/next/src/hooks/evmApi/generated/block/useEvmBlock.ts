import { fetcher } from '../../../../utils/fetcher';
import { 
  getBlockOperation as operation, 
  GetBlockRequest, 
  GetBlockResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useEvmBlock = (request: GetBlockRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<GetBlockResponse>(
    ['evmApi/getBlock', {operation, request}], 
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
