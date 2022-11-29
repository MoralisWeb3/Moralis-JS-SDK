import { fetcher } from '../../../../utils/fetcher';
import { 
  getNFTTransfersOperation as operation, 
  GetNFTTransfersRequest, 
  GetNFTTransfersResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';
import Moralis from 'moralis';

export const useEvmNFTTransfers = (request: GetNFTTransfersRequest, fetchParams?: FetchParams) => {
  const { deserializeResponse, serializeRequest } = operation
  const { data, error, mutate, isValidating } = useSWR<GetNFTTransfersResponse>(
    ['evmApi/getNFTTransfers', { deserializeResponse, request: serializeRequest(request, Moralis.Core) }], 
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
