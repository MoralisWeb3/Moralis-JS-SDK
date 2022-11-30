import { fetcher } from '../../../../utils/fetcher';
import { 
  getNativeBalanceOperation as operation, 
  GetNativeBalanceRequest, 
  GetNativeBalanceResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';
import Moralis from 'moralis';

export const useEvmNativeBalance = (request: GetNativeBalanceRequest, fetchParams?: FetchParams) => {
  const { deserializeResponse, serializeRequest } = operation
  const { data, error, mutate, isValidating } = useSWR<GetNativeBalanceResponse>(
    ['evmApi/getNativeBalance', { deserializeResponse, request: serializeRequest(request, Moralis.Core) }], 
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
