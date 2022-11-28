import { fetcher } from '../../../../utils/fetcher';
import { 
  getTokenMetadataBySymbolOperation as operation, 
  GetTokenMetadataBySymbolRequest, 
  GetTokenMetadataBySymbolResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useEvmTokenMetadataBySymbol = (request: GetTokenMetadataBySymbolRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<GetTokenMetadataBySymbolResponse>(
    ['evmApi/getTokenMetadataBySymbol', {operation, request}], 
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
