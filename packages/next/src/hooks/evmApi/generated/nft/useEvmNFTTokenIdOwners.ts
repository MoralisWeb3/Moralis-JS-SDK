import { fetcher } from '../../../../utils/fetcher';
import { 
  getNFTTokenIdOwnersOperation as operation, 
  GetNFTTokenIdOwnersRequest, 
  GetNFTTokenIdOwnersResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useEvmNFTTokenIdOwners = (request: GetNFTTokenIdOwnersRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<GetNFTTokenIdOwnersResponse>(
    ['evmApi/getNFTTokenIdOwners', {operation, request}], 
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
