import { fetcher } from '../../../../utils/fetcher';
import { 
  getWalletTokenTransfersOperation as operation, 
  GetWalletTokenTransfersRequest, 
  GetWalletTokenTransfersResponse 
} from 'moralis/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import useSWR from 'swr';

export const useEvmWalletTokenTransfers = (request: GetWalletTokenTransfersRequest, SWRConfig?: SWRConfiguration) => {
  const { data, error, mutate, isValidating } = useSWR<GetWalletTokenTransfersResponse>(
    ['evmApi/getWalletTokenTransfers', {operation, request}], 
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
