import { 
  getWalletNFTsOperation as operation, 
  GetWalletNFTsRequest,
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import { useResolverPaginated } from '../../../resolvers';

export const useEvmWalletNFTs = (
  request?: GetWalletNFTsRequest, 
  fetchParams?: FetchParams,
) => {
  const { data, error, fetch, isFetching } = useResolverPaginated({
    endpoint: 'evmApi/getWalletNFTs',
    operation,
    request,
    fetchParams,
  });

  return {
    data: data?.data,
    cursor: data?.cursor,
    page: data?.page,
    pageSize: data?.pageSize,
    total: data?.total,
    error,
    fetch,
    /**
     * @deprecated use `fetch()` instead
     */
    refetch: () => fetch(),
    isFetching,
    /**
     * @deprecated use `isFetching` instead
     */
    isValidating: isFetching,
  };
};
