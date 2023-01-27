import { AptChainList, AptChainListJSON, AptChainListInput } from '../types/AptChainList';
import { AptErc20Metadata, AptErc20MetadataJSON, AptErc20MetadataInput } from '../types/AptErc20Metadata';

export interface AptGetTokenMetadataBySymbolOperationRequestJSON {
  readonly chain?: AptChainListJSON;
  readonly symbols: string[];
}

export interface AptGetTokenMetadataBySymbolOperationRequest {
  readonly chain?: AptChainListInput;
  readonly symbols: string[];
}

/**
 * @description Get the metadata for a list of token symbols (name, symbol, decimals, logo).
 */
export const AptGetTokenMetadataBySymbolOperation = {
  operationId: "getTokenMetadataBySymbol",
  httpMethod: "get",
  routePattern: "/erc20/metadata/symbols",
  parameterNames: ["chain","symbols"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptErc20MetadataJSON[]): AptErc20Metadata[] {
    return json.map((item) => AptErc20Metadata.fromJSON(item));
  },

  serializeRequest(request: AptGetTokenMetadataBySymbolOperationRequest): AptGetTokenMetadataBySymbolOperationRequestJSON {
    const chain = request.chain ? AptChainList.create(request.chain) : undefined;
    const symbols = request.symbols;
    return {
      chain: chain ? chain.toJSON() : undefined,
      symbols: symbols,
    };
  },

}
