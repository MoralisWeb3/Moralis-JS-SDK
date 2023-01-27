import { AptChainList, AptChainListJSON, AptChainListInput } from '../types/AptChainList';
import { AptLogCollection, AptLogCollectionJSON, AptLogCollectionInput } from '../types/AptLogCollection';

export interface AptGetContractLogsOperationRequestJSON {
  readonly chain?: AptChainListJSON;
  readonly block_number?: string;
  readonly from_block?: string;
  readonly to_block?: string;
  readonly from_date?: string;
  readonly to_date?: string;
  readonly address: string;
  readonly topic0?: string;
  readonly topic1?: string;
  readonly topic2?: string;
  readonly topic3?: string;
  readonly limit?: number;
  readonly disable_total?: boolean;
  readonly cursor?: string;
}

export interface AptGetContractLogsOperationRequest {
  readonly chain?: AptChainListInput;
  readonly blockNumber?: string;
  readonly fromBlock?: string;
  readonly toBlock?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly address: string;
  readonly topic0?: string;
  readonly topic1?: string;
  readonly topic2?: string;
  readonly topic3?: string;
  readonly limit?: number;
  readonly disableTotal?: boolean;
  readonly cursor?: string;
}

/**
 * @description Get the logs for a contract.
 */
export const AptGetContractLogsOperation = {
  operationId: "getContractLogs",
  httpMethod: "get",
  routePattern: "/{address}/logs",
  parameterNames: ["chain","block_number","from_block","to_block","from_date","to_date","address","topic0","topic1","topic2","topic3","limit","disable_total","cursor"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptLogCollectionJSON): AptLogCollection {
    return AptLogCollection.fromJSON(json);
  },

  serializeRequest(request: AptGetContractLogsOperationRequest): AptGetContractLogsOperationRequestJSON {
    const chain = request.chain ? AptChainList.create(request.chain) : undefined;
    const blockNumber = request.blockNumber;
    const fromBlock = request.fromBlock;
    const toBlock = request.toBlock;
    const fromDate = request.fromDate;
    const toDate = request.toDate;
    const address = request.address;
    const topic0 = request.topic0;
    const topic1 = request.topic1;
    const topic2 = request.topic2;
    const topic3 = request.topic3;
    const limit = request.limit;
    const disableTotal = request.disableTotal;
    const cursor = request.cursor;
    return {
      chain: chain ? chain.toJSON() : undefined,
      block_number: blockNumber,
      from_block: fromBlock,
      to_block: toBlock,
      from_date: fromDate,
      to_date: toDate,
      address: address,
      topic0: topic0,
      topic1: topic1,
      topic2: topic2,
      topic3: topic3,
      limit: limit,
      disable_total: disableTotal,
      cursor: cursor,
    };
  },

}
