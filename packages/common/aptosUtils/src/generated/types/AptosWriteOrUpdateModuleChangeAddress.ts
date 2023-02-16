// $ref: #/components/schemas/WriteOrUpdateModuleChange/properties/address
// typeName: WriteOrUpdateModuleChange_address

export type AptosWriteOrUpdateModuleChangeAddressJSON = object;
export type AptosWriteOrUpdateModuleChangeAddressInput = AptosWriteOrUpdateModuleChangeAddressJSON;

export class AptosWriteOrUpdateModuleChangeAddress {
  public static create(input: AptosWriteOrUpdateModuleChangeAddressInput | AptosWriteOrUpdateModuleChangeAddress) {
    if (input instanceof AptosWriteOrUpdateModuleChangeAddress) {
      return input;
    }
    return new AptosWriteOrUpdateModuleChangeAddress(input);
  }

  public static fromJSON(json: AptosWriteOrUpdateModuleChangeAddressJSON) {
    return new AptosWriteOrUpdateModuleChangeAddress(json);
  }

  public constructor(public readonly value: AptosWriteOrUpdateModuleChangeAddressInput) {}

  public toJSON(): AptosWriteOrUpdateModuleChangeAddressJSON {
    return this.value;
  }
}
