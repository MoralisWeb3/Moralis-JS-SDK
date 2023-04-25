import { EncodeSubmissionOperationRequest, string, AptosEncodeSubmissionRequestInput, AptosEncodeSubmissionRequest, EncodeSubmissionOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEncodeSubmissionParams = Partial<EncodeSubmissionOperationRequest>;
export type UseEncodeSubmissionQueryOptions = QueryOptions<string, UseEncodeSubmissionParams>;

export function useEncodeSubmission({ network }: UseEncodeSubmissionParams = {}, body?: AptosEncodeSubmissionRequestInput | AptosEncodeSubmissionRequest, queryOptions: UseEncodeSubmissionQueryOptions = {}) {
  const resolver = useOperationV3Resolver(EncodeSubmissionOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(body);
  }, [body]);

  const queryKey: [string, Partial<EncodeSubmissionOperationRequest>] = useMemo(() => {
    return [
      EncodeSubmissionOperation.operationId,
      {
        network
      },
    ];
  }, [network]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['body']);
      return resolver.resolve(params, body);
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}
