import { fetcher } from '../../../../utils/fetcher';
import { 
  getTokenAllowanceOperation as operation, 
  GetTokenAllowanceRequest, 
  GetTokenAllowanceResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';
import Moralis from 'moralis';

export const useEvmTokenAllowance = (request: GetTokenAllowanceRequest, fetchParams?: FetchParams) => {
  const { deserializeResponse, serializeRequest } = operation
  const { data, error, mutate, isValidating } = useSWR<GetTokenAllowanceResponse>(
    ['evmApi/getTokenAllowance', { deserializeResponse, request: serializeRequest(request, Moralis.Core) }], 
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
