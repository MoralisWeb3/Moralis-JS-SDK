import { EvmChain, EvmChainInput, EvmChainJSON } from '../../dataTypes';
import { EvmGetMultipleTokenPricesIncludeEnum, EvmGetMultipleTokenPricesIncludeEnumValue, EvmGetMultipleTokenPricesIncludeEnumInput, EvmGetMultipleTokenPricesIncludeEnumJSON } from '../types/EvmGetMultipleTokenPricesIncludeEnum';
import { EvmErc20Price, EvmErc20PriceJSON } from '../types/EvmErc20Price';
import { EvmGetMultipleTokenPricesDto, EvmGetMultipleTokenPricesDtoInput, EvmGetMultipleTokenPricesDtoJSON } from '../types/EvmGetMultipleTokenPricesDto';

// request parameters:
// - chain ($ref: #/components/schemas/chainList)
// - include ($ref: #/paths/~1erc20~1prices/post/parameters/1/schema)
// - max_token_inactivity ($ref: #/paths/~1erc20~1prices/post/parameters/2/schema)

export interface GetMultipleTokenPricesOperationRequest {
  /**
   * @description The chain to query
   */
  readonly chain?: EvmChainInput | EvmChain;
  /**
   * @description If the result should contain the 24hr percent change
   */
  readonly include?: EvmGetMultipleTokenPricesIncludeEnumInput | EvmGetMultipleTokenPricesIncludeEnumValue;
  /**
   * @description Exclude tokens inactive for more than the given amount of days
   */
  readonly maxTokenInactivity?: number;
}

export interface GetMultipleTokenPricesOperationRequestJSON {
  readonly chain?: EvmChainJSON;
  readonly include?: EvmGetMultipleTokenPricesIncludeEnumJSON;
  readonly max_token_inactivity?: number;
}

export type GetMultipleTokenPricesOperationResponse = EvmErc20Price[];
export type GetMultipleTokenPricesOperationResponseJSON = EvmErc20PriceJSON[];

export type GetMultipleTokenPricesOperationBody = EvmGetMultipleTokenPricesDtoInput | EvmGetMultipleTokenPricesDto;

export const GetMultipleTokenPricesOperation = {
  operationId: "getMultipleTokenPrices",
  groupName: "token",
  httpMethod: "post",
  routePattern: "/erc20/prices",
  parameterNames: ["chain","include","max_token_inactivity"],
  hasResponse: true,
  hasBody: true,

  parseResponse(json: EvmErc20PriceJSON[]): EvmErc20Price[] {
    return json.map((item) => EvmErc20Price.fromJSON(item));
  },

  serializeRequest(request: GetMultipleTokenPricesOperationRequest): GetMultipleTokenPricesOperationRequestJSON {
    const chain = request.chain ? EvmChain.create(request.chain) : undefined;
    const include = request.include ? EvmGetMultipleTokenPricesIncludeEnum.create(request.include) : undefined;
    const maxTokenInactivity = request.maxTokenInactivity;
    return {
      chain: chain ? chain.toJSON() : undefined,
      include: include ? include : undefined,
      max_token_inactivity: maxTokenInactivity,
    };
  },

  serializeBody(body: EvmGetMultipleTokenPricesDtoInput | EvmGetMultipleTokenPricesDto): EvmGetMultipleTokenPricesDtoJSON {
    const value = EvmGetMultipleTokenPricesDto.create(body);
    return value.toJSON();
  },
}
