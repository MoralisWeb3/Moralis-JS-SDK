// $ref: #/paths/~1resolve~1{address}~1domain/get/parameters/0/schema
// typeName: resolveAddressToDomain_currency_Enum

export type EvmResolveAddressToDomainCurrencyEnumJSON = "eth" | "0x1";
export type EvmResolveAddressToDomainCurrencyEnumInput = "eth" | "0x1";
export type EvmResolveAddressToDomainCurrencyEnumValue = "eth" | "0x1";

export abstract class EvmResolveAddressToDomainCurrencyEnum {
  public static create(input: EvmResolveAddressToDomainCurrencyEnumInput | EvmResolveAddressToDomainCurrencyEnumValue): EvmResolveAddressToDomainCurrencyEnumValue {
    return input;
  }

  public static fromJSON(json: EvmResolveAddressToDomainCurrencyEnumJSON): EvmResolveAddressToDomainCurrencyEnumValue {
    return json;
  }
}
