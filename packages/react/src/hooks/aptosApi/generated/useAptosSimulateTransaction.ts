import { AptosSimulateTransactionValue, AptosSubmitTransactionRequest, AptosSubmitTransactionRequestInput, SimulateTransactionOperation, SimulateTransactionOperationRequest } from 'moralis/common-aptos-utils';
import { QueryOptions } from '../../types';
import { useOperationV3WithBodyQuery } from '../../utils/resolvers/v3/useOperationV3WithBodyQuery';

type UseSimulateTransactionRequest = Partial<SimulateTransactionOperationRequest>;
type UseSimulateTransactionBody = Partial<AptosSubmitTransactionRequestInput | AptosSubmitTransactionRequest>;
export type UseSimulateTransactionQueryOptions = QueryOptions<AptosSimulateTransactionValue, [UseSimulateTransactionRequest, UseSimulateTransactionBody]>;

export function useSimulateTransaction(request: UseSimulateTransactionRequest = {}, body: UseSimulateTransactionBody = {}, queryOptions?: UseSimulateTransactionQueryOptions) {
  return useOperationV3WithBodyQuery(SimulateTransactionOperation, { properties: request }, { properties: body }, queryOptions);
}
