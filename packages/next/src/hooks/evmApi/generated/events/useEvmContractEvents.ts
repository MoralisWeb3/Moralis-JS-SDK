import { fetcher } from '../../../../utils/fetcher';
import { 
  getContractEventsOperation as operation, 
  GetContractEventsRequest, 
  GetContractEventsResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';
import Moralis from 'moralis';

export const useEvmContractEvents = (request: GetContractEventsRequest, fetchParams?: FetchParams) => {
  const { deserializeResponse, serializeRequest } = operation
  const { data, error, mutate, isValidating } = useSWR<GetContractEventsResponse>(
    ['evmApi/getContractEvents', { deserializeResponse, request: serializeRequest(request, Moralis.Core) }], 
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
