import { fetcher } from '../../../../utils/fetcher';
import { 
  resolveAddressOperation as operation, 
  ResolveAddressRequest, 
  ResolveAddressResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';
import Moralis from 'moralis';

export const useEvmResolveAddress = (request: ResolveAddressRequest, fetchParams?: FetchParams) => {
  const { deserializeResponse, serializeRequest } = operation
  const { data, error, mutate, isValidating } = useSWR<ResolveAddressResponse>(
    ['evmApi/resolveAddress', { deserializeResponse, request: serializeRequest(request, Moralis.Core) }], 
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
