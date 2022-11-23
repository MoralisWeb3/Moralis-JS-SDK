import { fetcher } from '../../../../utils/fetcher';
import { 
  getTokenTransfersOperation as operation, 
  GetTokenTransfersRequest, 
  GetTokenTransfersResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useEvmTokenTransfers = (request: GetTokenTransfersRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<GetTokenTransfersResponse>(
    ['evmApi/getTokenTransfers', {operation, request}], 
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
