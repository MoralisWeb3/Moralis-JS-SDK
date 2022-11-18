import { fetcher } from '../../../../utils/fetcher';
import { 
  syncNFTContractOperation as operation, 
  SyncNFTContractRequest, 
  SyncNFTContractResponse 
} from 'moralis/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import useSWR from 'swr';

export const useEvmSyncNFTContract = (request: SyncNFTContractRequest, SWRConfig?: SWRConfiguration) => {
  const { data, error, mutate, isValidating } = useSWR<SyncNFTContractResponse>(
    ['evmApi/syncNFTContract', {operation, request}], 
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
