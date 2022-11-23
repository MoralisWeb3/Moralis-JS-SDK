import { fetcher } from '../../../../utils/fetcher';
import { 
  getNFTOwnersOperation as operation, 
  GetNFTOwnersRequest, 
  GetNFTOwnersResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useEvmNFTOwners = (request: GetNFTOwnersRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<GetNFTOwnersResponse>(
    ['evmApi/getNFTOwners', {operation, request}], 
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
