import { AptChainList, AptChainListJSON, AptChainListInput } from '../types/AptChainList';
import { AptErc20Allowance, AptErc20AllowanceJSON, AptErc20AllowanceInput } from '../types/AptErc20Allowance';

export interface AptGetTokenAllowanceOperationRequestJSON {
  readonly chain?: AptChainListJSON;
  readonly address: string;
  readonly owner_address: string;
  readonly spender_address: string;
}

export interface AptGetTokenAllowanceOperationRequest {
  readonly chain?: AptChainListInput;
  readonly address: string;
  readonly ownerAddress: string;
  readonly spenderAddress: string;
}

/**
 * @description Get the amount which the spender is allowed to withdraw on behalf of the owner.
 */
export const AptGetTokenAllowanceOperation = {
  operationId: "getTokenAllowance",
  httpMethod: "get",
  routePattern: "/erc20/{address}/allowance",
  parameterNames: ["chain","address","owner_address","spender_address"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptErc20AllowanceJSON): AptErc20Allowance {
    return AptErc20Allowance.fromJSON(json);
  },

  serializeRequest(request: AptGetTokenAllowanceOperationRequest): AptGetTokenAllowanceOperationRequestJSON {
    const chain = request.chain ? AptChainList.create(request.chain) : undefined;
    const address = request.address;
    const ownerAddress = request.ownerAddress;
    const spenderAddress = request.spenderAddress;
    return {
      chain: chain ? chain.toJSON() : undefined,
      address: address,
      owner_address: ownerAddress,
      spender_address: spenderAddress,
    };
  },

}
