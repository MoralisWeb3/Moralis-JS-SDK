import { fetcher } from '../../../../utils/fetcher';
import { 
  getTokenTransfersOperation as operation, 
  GetTokenTransfersRequest, 
  GetTokenTransfersResponse 
} from 'moralis/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import useSWR from 'swr';

export const useEvmTokenTransfers = (request: GetTokenTransfersRequest, SWRConfig?: SWRConfiguration) => {
  const { data, error, mutate, isValidating } = useSWR<GetTokenTransfersResponse>(
    ['evmApi/getTokenTransfers', {operation, request}], 
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
