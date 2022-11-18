import { fetcher } from '../../../../utils/fetcher';
import { 
  getNFTTokenIdOwnersOperation as operation, 
  GetNFTTokenIdOwnersRequest, 
  GetNFTTokenIdOwnersResponse 
} from 'moralis/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import useSWR from 'swr';

export const useEvmNFTTokenIdOwners = (request: GetNFTTokenIdOwnersRequest, SWRConfig?: SWRConfiguration) => {
  const { data, error, mutate, isValidating } = useSWR<GetNFTTokenIdOwnersResponse>(
    ['evmApi/getNFTTokenIdOwners', {operation, request}], 
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
