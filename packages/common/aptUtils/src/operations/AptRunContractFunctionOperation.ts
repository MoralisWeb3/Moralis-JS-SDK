import { AptChainList, AptChainListJSON, AptChainListInput } from '../types/AptChainList';
import { AptRunContractDto, AptRunContractDtoJSON, AptRunContractDtoInput } from '../types/AptRunContractDto';

export interface AptRunContractFunctionOperationRequestJSON {
  readonly chain?: AptChainListJSON;
  readonly address: string;
  readonly function_name: string;
}

export interface AptRunContractFunctionOperationRequest {
  readonly chain?: AptChainListInput;
  readonly address: string;
  readonly functionName: string;
  readonly body: AptRunContractDtoInput;
}

/**
 * @description Run a given function of a contract ABI and retrieve readonly data. [Try it with Swagger](https://deep-index.moralis.io/api-docs-2.1/#/Utils/runContractFunction).
 */
export const AptRunContractFunctionOperation = {
  operationId: "runContractFunction",
  httpMethod: "post",
  routePattern: "/{address}/function",
  parameterNames: ["chain","address","function_name"],
  hasResponse: true,
  hasBody: true,

  parseResponse(json: string): string {
    return json;
  },

  serializeRequest(request: AptRunContractFunctionOperationRequest): AptRunContractFunctionOperationRequestJSON {
    const chain = request.chain ? AptChainList.create(request.chain) : undefined;
    const address = request.address;
    const functionName = request.functionName;
    return {
      chain: chain ? chain.toJSON() : undefined,
      address: address,
      function_name: functionName,
    };
  },

  serializeBody(request: AptRunContractFunctionOperationRequest): AptRunContractDtoJSON {
    const body = AptRunContractDto.create(request.body);
    return body.toJSON();
  },
}
