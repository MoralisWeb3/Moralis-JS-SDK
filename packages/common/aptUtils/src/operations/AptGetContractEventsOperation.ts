import { AptChainList, AptChainListJSON, AptChainListInput } from '../types/AptChainList';
import {
  AptGetContractEvents,
  AptGetContractEventsJSON,
  AptGetContractEventsInput,
} from '../types/AptGetContractEvents';
import {
  AptGetContractEventsBody,
  AptGetContractEventsBodyJSON,
  AptGetContractEventsBodyInput,
} from '../types/AptGetContractEventsBody';

export interface AptGetContractEventsOperationRequestJSON {
  readonly chain?: AptChainListJSON;
  readonly from_block?: number;
  readonly to_block?: number;
  readonly from_date?: string;
  readonly to_date?: string;
  readonly address: string;
  readonly topic: string;
  readonly offset?: number;
  readonly limit?: number;
  readonly disable_total?: boolean;
}

export interface AptGetContractEventsOperationRequest {
  readonly chain?: AptChainListInput;
  readonly fromBlock?: number;
  readonly toBlock?: number;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly address: string;
  readonly topic: string;
  readonly offset?: number;
  readonly limit?: number;
  readonly disableTotal?: boolean;
  readonly body?: AptGetContractEventsBodyInput;
}

/**
 * @description Get events for a contract ordered by block number in descending order. [Try it with Swagger](https://deep-index.moralis.io/api-docs-2.1/#/Events/getContractEvents).
 */
export const AptGetContractEventsOperation = {
  operationId: 'getContractEvents',
  httpMethod: 'post',
  routePattern: '/{address}/events',
  parameterNames: [
    'chain',
    'from_block',
    'to_block',
    'from_date',
    'to_date',
    'address',
    'topic',
    'offset',
    'limit',
    'disable_total',
  ],
  hasResponse: true,
  hasBody: true,

  parseResponse(json: AptGetContractEventsJSON): AptGetContractEvents {
    return AptGetContractEvents.fromJSON(json);
  },

  serializeRequest(request: AptGetContractEventsOperationRequest): AptGetContractEventsOperationRequestJSON {
    const chain = request.chain ? AptChainList.create(request.chain) : undefined;
    const fromBlock = request.fromBlock;
    const toBlock = request.toBlock;
    const fromDate = request.fromDate;
    const toDate = request.toDate;
    const address = request.address;
    const topic = request.topic;
    const offset = request.offset;
    const limit = request.limit;
    const disableTotal = request.disableTotal;
    return {
      chain: chain ? chain.toJSON() : undefined,
      from_block: fromBlock,
      to_block: toBlock,
      from_date: fromDate,
      to_date: toDate,
      address: address,
      topic: topic,
      offset: offset,
      limit: limit,
      disable_total: disableTotal,
    };
  },

  serializeBody(request: AptGetContractEventsOperationRequest): AptGetContractEventsBodyJSON | undefined {
    const body = request.body ? AptGetContractEventsBody.create(request.body) : undefined;
    return body ? body.toJSON() : undefined;
  },
};
