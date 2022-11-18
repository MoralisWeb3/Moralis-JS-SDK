import { fetcher } from '../../../../utils/fetcher';
import { 
  getNFTTransfersByBlockOperation as operation, 
  GetNFTTransfersByBlockRequest, 
  GetNFTTransfersByBlockResponse 
} from 'moralis/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import useSWR from 'swr';

export const useEvmNFTTransfersByBlock = (request: GetNFTTransfersByBlockRequest, SWRConfig?: SWRConfiguration) => {
  const { data, error, mutate, isValidating } = useSWR<GetNFTTransfersByBlockResponse>(
    ['evmApi/getNFTTransfersByBlock', {operation, request}], 
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
