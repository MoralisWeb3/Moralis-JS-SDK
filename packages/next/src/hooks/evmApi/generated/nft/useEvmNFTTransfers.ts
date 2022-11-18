import { fetcher } from '../../../../utils/fetcher';
import { 
  getNFTTransfersOperation as operation, 
  GetNFTTransfersRequest, 
  GetNFTTransfersResponse 
} from 'moralis/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import useSWR from 'swr';

export const useEvmNFTTransfers = (request: GetNFTTransfersRequest, SWRConfig?: SWRConfiguration) => {
  const { data, error, mutate, isValidating } = useSWR<GetNFTTransfersResponse>(
    ['evmApi/getNFTTransfers', {operation, request}], 
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
