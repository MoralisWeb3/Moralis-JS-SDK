// $ref: #/components/schemas/WriteOrUpdateModuleChange/properties/address
// typeName: WriteOrUpdateModuleChange_address

export type AptosWriteOrUpdateModuleChangeAddressJSON = object;
export type AptosWriteOrUpdateModuleChangeAddressInput = object;
export type AptosWriteOrUpdateModuleChangeAddressValue = object;

export abstract class AptosWriteOrUpdateModuleChangeAddress {
  public static create(input: AptosWriteOrUpdateModuleChangeAddressInput | AptosWriteOrUpdateModuleChangeAddressValue): AptosWriteOrUpdateModuleChangeAddressValue {
    return input;
  }

  public static fromJSON(json: AptosWriteOrUpdateModuleChangeAddressJSON): AptosWriteOrUpdateModuleChangeAddressValue {
    return json;
  }
}
