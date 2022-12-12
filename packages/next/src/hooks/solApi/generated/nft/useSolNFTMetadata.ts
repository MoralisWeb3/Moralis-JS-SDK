import { 
  getNFTMetadataOperation as operation, 
  GetNFTMetadataRequest,
} from 'moralis/common-sol-utils';
import { FetchParams } from '../../../types';
import { useResolver } from '../../../resolvers';

export const useSolNFTMetadata = (
  request?: GetNFTMetadataRequest, 
  fetchParams?: FetchParams,
) => {
  const { data, error, fetch, isFetching } = useResolver({
    endpoint: 'solApi/getNFTMetadata',
    operation,
    request,
    fetchParams,
  });

  return {
    data,
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
