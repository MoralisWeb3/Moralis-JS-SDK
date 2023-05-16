import { EvmChain, EvmChainInput, EvmChainJSON } from '../../dataTypes';
import { EvmContractsReview, EvmContractsReviewValue, EvmContractsReviewJSON } from '../types/EvmContractsReview';
import { EvmContractsReviewDto, EvmContractsReviewDtoInput, EvmContractsReviewDtoJSON } from '../types/EvmContractsReviewDto';

// request parameters:
// - chain ($ref: #/components/schemas/chainList)

export interface ContractsReviewOperationRequest {
  /**
   * @description The chain to query
   */
  readonly chain?: EvmChainInput | EvmChain;
}

export interface ContractsReviewOperationRequestJSON {
  readonly chain?: EvmChainJSON;
}

export type ContractsReviewOperationResponse = EvmContractsReviewValue;
export type ContractsReviewOperationResponseJSON = EvmContractsReviewJSON;

export type ContractsReviewOperationBody = EvmContractsReviewDtoInput | EvmContractsReviewDto;

export const ContractsReviewOperation = {
  operationId: "contractsReview",
  groupName: "utils",
  httpMethod: "post",
  routePattern: "/contracts-review",
  parameterNames: ["chain"],
  hasResponse: true,
  hasBody: true,

  parseResponse(json: EvmContractsReviewJSON): EvmContractsReviewValue {
    return EvmContractsReview.fromJSON(json);
  },

  serializeRequest(request: ContractsReviewOperationRequest): ContractsReviewOperationRequestJSON {
    const chain = request.chain ? EvmChain.create(request.chain) : undefined;
    return {
      chain: chain ? chain.toJSON() : undefined,
    };
  },

  serializeBody(body: EvmContractsReviewDtoInput | EvmContractsReviewDto): EvmContractsReviewDtoJSON {
    const value = EvmContractsReviewDto.create(body);
    return value.toJSON();
  },
}
