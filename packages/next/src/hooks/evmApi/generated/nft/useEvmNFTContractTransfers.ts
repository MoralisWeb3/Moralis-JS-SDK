import { fetcher } from '../../../../utils/fetcher';
import { 
  getNFTContractTransfersOperation as operation, 
  GetNFTContractTransfersRequest, 
  GetNFTContractTransfersResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useEvmNFTContractTransfers = (request: GetNFTContractTransfersRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<GetNFTContractTransfersResponse>(
    ['evmApi/getNFTContractTransfers', {operation, request}], 
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
