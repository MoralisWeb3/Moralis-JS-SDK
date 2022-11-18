import { fetcher } from '../../../../utils/fetcher';
import { 
  getNFTContractTransfersOperation as operation, 
  GetNFTContractTransfersRequest, 
  GetNFTContractTransfersResponse 
} from 'moralis/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import useSWR from 'swr';

export const useEvmNFTContractTransfers = (request: GetNFTContractTransfersRequest, SWRConfig?: SWRConfiguration) => {
  const { data, error, mutate, isValidating } = useSWR<GetNFTContractTransfersResponse>(
    ['evmApi/getNFTContractTransfers', {operation, request}], 
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
