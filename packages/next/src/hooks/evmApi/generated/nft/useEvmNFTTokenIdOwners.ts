import { fetcher } from '../../../../utils/fetcher';
import { 
  getNFTTokenIdOwnersOperation as operation, 
  GetNFTTokenIdOwnersRequest, 
  GetNFTTokenIdOwnersResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';
import Moralis from 'moralis';

export const useEvmNFTTokenIdOwners = (request: GetNFTTokenIdOwnersRequest, fetchParams?: FetchParams) => {
  const { deserializeResponse, serializeRequest } = operation
  const { data, error, mutate, isValidating } = useSWR<GetNFTTokenIdOwnersResponse>(
    ['evmApi/getNFTTokenIdOwners', { deserializeResponse, request: serializeRequest(request, Moralis.Core) }], 
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
