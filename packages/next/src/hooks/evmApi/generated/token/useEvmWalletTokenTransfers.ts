import { fetcher } from '../../../../utils/fetcher';
import { 
  getWalletTokenTransfersOperation as operation, 
  GetWalletTokenTransfersRequest, 
  GetWalletTokenTransfersResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';
import Moralis from 'moralis';

export const useEvmWalletTokenTransfers = (request: GetWalletTokenTransfersRequest, fetchParams?: FetchParams) => {
  const { deserializeResponse, serializeRequest } = operation
  const { data, error, mutate, isValidating } = useSWR<GetWalletTokenTransfersResponse>(
    ['evmApi/getWalletTokenTransfers', { deserializeResponse, request: serializeRequest(request, Moralis.Core) }], 
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
