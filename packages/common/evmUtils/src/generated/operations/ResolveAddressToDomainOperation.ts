import { EvmResolveAddressToDomainCurrencyEnum, EvmResolveAddressToDomainCurrencyEnumValue, EvmResolveAddressToDomainCurrencyEnumInput, EvmResolveAddressToDomainCurrencyEnumJSON } from '../types/EvmResolveAddressToDomainCurrencyEnum';
import { EvmAddress, EvmAddressInput, EvmAddressJSON } from '../../dataTypes';
import { EvmUnstoppableDomain, EvmUnstoppableDomainJSON } from '../types/EvmUnstoppableDomain';

// request parameters:
// - currency ($ref: #/paths/~1resolve~1{address}~1domain/get/parameters/0/schema)
// - address ($ref: #/paths/~1resolve~1{address}~1domain/get/parameters/1/schema)

export interface ResolveAddressToDomainOperationRequest {
  /**
   * @description The currency to query
   */
  readonly currency?: EvmResolveAddressToDomainCurrencyEnumInput | EvmResolveAddressToDomainCurrencyEnumValue;
  /**
   * @description The address to be resolved
   */
  readonly address: EvmAddressInput | EvmAddress;
}

export interface ResolveAddressToDomainOperationRequestJSON {
  readonly currency?: EvmResolveAddressToDomainCurrencyEnumJSON;
  readonly address: EvmAddressJSON;
}

export type ResolveAddressToDomainOperationResponse = EvmUnstoppableDomain;
export type ResolveAddressToDomainOperationResponseJSON = EvmUnstoppableDomainJSON;

export const ResolveAddressToDomainOperation = {
  operationId: "resolveAddressToDomain",
  groupName: "resolve",
  httpMethod: "get",
  routePattern: "/resolve/{address}/domain",
  parameterNames: ["currency","address"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: EvmUnstoppableDomainJSON): EvmUnstoppableDomain {
    return EvmUnstoppableDomain.fromJSON(json);
  },

  serializeRequest(request: ResolveAddressToDomainOperationRequest): ResolveAddressToDomainOperationRequestJSON {
    const currency = request.currency ? EvmResolveAddressToDomainCurrencyEnum.create(request.currency) : undefined;
    const address = EvmAddress.create(request.address);
    return {
      currency: currency ? currency : undefined,
      address: address.toJSON(),
    };
  },

}
