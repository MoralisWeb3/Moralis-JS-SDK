import { fetcher } from '../../../../utils/fetcher';
import { 
  getNFTTransfersFromToBlockOperation as operation, 
  GetNFTTransfersFromToBlockRequest, 
  GetNFTTransfersFromToBlockResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';
import Moralis from 'moralis';

export const useEvmNFTTransfersFromToBlock = (request: GetNFTTransfersFromToBlockRequest, fetchParams?: FetchParams) => {
  const { deserializeResponse, serializeRequest } = operation
  const { data, error, mutate, isValidating } = useSWR<GetNFTTransfersFromToBlockResponse>(
    ['evmApi/getNFTTransfersFromToBlock', { deserializeResponse, request: serializeRequest(request, Moralis.Core) }], 
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
