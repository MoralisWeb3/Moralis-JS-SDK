import { fetcher } from '../../../../utils/fetcher';
import { 
  getNFTTransfersFromToBlockOperation as operation, 
  GetNFTTransfersFromToBlockRequest, 
  GetNFTTransfersFromToBlockResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useEvmNFTTransfersFromToBlock = (request: GetNFTTransfersFromToBlockRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<GetNFTTransfersFromToBlockResponse>(
    ['evmApi/getNFTTransfersFromToBlock', {operation, request}], 
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
