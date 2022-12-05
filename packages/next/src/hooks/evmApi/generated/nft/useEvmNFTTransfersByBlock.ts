import { fetcher } from '../../../../utils/fetcher';
import { 
  getNFTTransfersByBlockOperation as operation, 
  GetNFTTransfersByBlockRequest, 
  GetNFTTransfersByBlockResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';
import Moralis from 'moralis';

export const useEvmNFTTransfersByBlock = (request: GetNFTTransfersByBlockRequest, fetchParams?: FetchParams) => {
  const { deserializeResponse, serializeRequest } = operation
  const { data, error, mutate, isValidating } = useSWR<GetNFTTransfersByBlockResponse>(
    ['evmApi/getNFTTransfersByBlock', { deserializeResponse, request: serializeRequest(request, Moralis.Core) }], 
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
