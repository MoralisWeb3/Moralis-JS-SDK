import { fetcher } from '../../../../utils/fetcher';
import { 
  getNFTTransfersByBlockOperation as operation, 
  GetNFTTransfersByBlockRequest, 
  GetNFTTransfersByBlockResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useEvmNFTTransfersByBlock = (request: GetNFTTransfersByBlockRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<GetNFTTransfersByBlockResponse>(
    ['evmApi/getNFTTransfersByBlock', {operation, request}], 
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
