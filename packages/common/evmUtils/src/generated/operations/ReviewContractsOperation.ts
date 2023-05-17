import { EvmChain, EvmChainInput, EvmChainJSON } from '../../dataTypes';
import { EvmReviewContracts, EvmReviewContractsJSON } from '../types/EvmReviewContracts';
import { EvmContractsReviewDto, EvmContractsReviewDtoInput, EvmContractsReviewDtoJSON } from '../types/EvmContractsReviewDto';

// request parameters:
// - chain ($ref: #/components/schemas/chainList)

export interface ReviewContractsOperationRequest {
  /**
   * @description The chain to query
   */
  readonly chain?: EvmChainInput | EvmChain;
}

export interface ReviewContractsOperationRequestJSON {
  readonly chain?: EvmChainJSON;
}

export type ReviewContractsOperationResponse = EvmReviewContracts;
export type ReviewContractsOperationResponseJSON = EvmReviewContractsJSON;

export type ReviewContractsOperationBody = EvmContractsReviewDtoInput | EvmContractsReviewDto;

export const ReviewContractsOperation = {
  operationId: "reviewContracts",
  groupName: "utils",
  httpMethod: "post",
  routePattern: "/contracts-review",
  parameterNames: ["chain"],
  hasResponse: true,
  hasBody: true,

  parseResponse(json: EvmReviewContractsJSON): EvmReviewContracts {
    return EvmReviewContracts.fromJSON(json);
  },

  serializeRequest(request: ReviewContractsOperationRequest): ReviewContractsOperationRequestJSON {
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
