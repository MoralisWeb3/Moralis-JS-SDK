import { EvmAddress, EvmAddressInput, EvmAddressJSON, EvmChain, EvmChainInput, EvmChainJSON } from '../../dataTypes';
import { EvmGetWalletProfitabilitySummary, EvmGetWalletProfitabilitySummaryJSON } from '../types/EvmGetWalletProfitabilitySummary';

// request parameters:
// - address ($ref: #/paths/~1wallets~1{address}~1profitability~1summary/get/parameters/0/schema)
// - days ($ref: #/paths/~1wallets~1{address}~1profitability~1summary/get/parameters/1/schema)
// - chain ($ref: #/components/schemas/discoveryApiChainsList)

export interface GetWalletProfitabilitySummaryOperationRequest {
  /**
   * @description The wallet address for which profitability summary is to be retrieved.
   */
  readonly address: EvmAddressInput | EvmAddress;
  /**
   * @description Timeframe in days for the profitability summary. Options include 'all', '7', '30', '60', '90' default is 'all'.
   */
  readonly days?: string;
  /**
   * @description The chain to query
   */
  readonly chain?: EvmChainInput | EvmChain;
}

export interface GetWalletProfitabilitySummaryOperationRequestJSON {
  readonly address: EvmAddressJSON;
  readonly days?: string;
  readonly chain?: EvmChainJSON;
}

export type GetWalletProfitabilitySummaryOperationResponse = EvmGetWalletProfitabilitySummary;
export type GetWalletProfitabilitySummaryOperationResponseJSON = EvmGetWalletProfitabilitySummaryJSON;

export const GetWalletProfitabilitySummaryOperation = {
  operationId: "getWalletProfitabilitySummary",
  groupName: "wallets",
  httpMethod: "get",
  routePattern: "/wallets/{address}/profitability/summary",
  parameterNames: ["address","days","chain"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: EvmGetWalletProfitabilitySummaryJSON): EvmGetWalletProfitabilitySummary {
    return EvmGetWalletProfitabilitySummary.fromJSON(json);
  },

  serializeRequest(request: GetWalletProfitabilitySummaryOperationRequest): GetWalletProfitabilitySummaryOperationRequestJSON {
    const address = EvmAddress.create(request.address);
    const days = request.days;
    const chain = request.chain ? EvmChain.create(request.chain) : undefined;
    return {
      address: address.toJSON(),
      days: days,
      chain: chain ? chain.toJSON() : undefined,
    };
  },

}
