import { fetcher } from '../../../../utils/fetcher';
import { 
  getNFTContractTransfersOperation as operation, 
  GetNFTContractTransfersRequest, 
  GetNFTContractTransfersResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';
import Moralis from 'moralis';

export const useEvmNFTContractTransfers = (request: GetNFTContractTransfersRequest, fetchParams?: FetchParams) => {
  const { deserializeResponse, serializeRequest } = operation
  const { data, error, mutate, isValidating } = useSWR<GetNFTContractTransfersResponse>(
    ['evmApi/getNFTContractTransfers', { deserializeResponse, request: serializeRequest(request, Moralis.Core) }], 
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
