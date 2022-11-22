import { fetcher } from '../../../../utils/fetcher';
import { 
  getNFTTransfersOperation as operation, 
  GetNFTTransfersRequest, 
  GetNFTTransfersResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useEvmNFTTransfers = (request: GetNFTTransfersRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<GetNFTTransfersResponse>(
    ['evmApi/getNFTTransfers', {operation, request}], 
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
