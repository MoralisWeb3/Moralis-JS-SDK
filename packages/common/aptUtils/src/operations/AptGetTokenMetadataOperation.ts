import { AptChainList, AptChainListJSON, AptChainListInput } from '../types/AptChainList';
import { AptErc20Metadata, AptErc20MetadataJSON, AptErc20MetadataInput } from '../types/AptErc20Metadata';

export interface AptGetTokenMetadataOperationRequestJSON {
  readonly chain?: AptChainListJSON;
  readonly addresses: string[];
}

export interface AptGetTokenMetadataOperationRequest {
  readonly chain?: AptChainListInput;
  readonly addresses: string[];
}

/**
 * @description Get the metadata for a given token contract address (name, symbol, decimals, logo).
 */
export const AptGetTokenMetadataOperation = {
  operationId: "getTokenMetadata",
  httpMethod: "get",
  routePattern: "/erc20/metadata",
  parameterNames: ["chain","addresses"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptErc20MetadataJSON[]): AptErc20Metadata[] {
    return json.map((item) => AptErc20Metadata.fromJSON(item));
  },

  serializeRequest(request: AptGetTokenMetadataOperationRequest): AptGetTokenMetadataOperationRequestJSON {
    const chain = request.chain ? AptChainList.create(request.chain) : undefined;
    const addresses = request.addresses;
    return {
      chain: chain ? chain.toJSON() : undefined,
      addresses: addresses,
    };
  },

}
