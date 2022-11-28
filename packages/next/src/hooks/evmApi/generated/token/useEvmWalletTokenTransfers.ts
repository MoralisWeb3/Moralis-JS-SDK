import { fetcher } from '../../../../utils/fetcher';
import { 
  getWalletTokenTransfersOperation as operation, 
  GetWalletTokenTransfersRequest, 
  GetWalletTokenTransfersResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useEvmWalletTokenTransfers = (request: GetWalletTokenTransfersRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<GetWalletTokenTransfersResponse>(
    ['evmApi/getWalletTokenTransfers', {operation, request}], 
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
