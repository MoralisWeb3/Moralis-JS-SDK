// $ref: #/components/schemas/DeleteModuleChange/properties/address
// typeName: DeleteModuleChange_address

export type AptosDeleteModuleChangeAddressJSON = object;
export type AptosDeleteModuleChangeAddressInput = AptosDeleteModuleChangeAddressJSON;

export class AptosDeleteModuleChangeAddress {
  public static create(input: AptosDeleteModuleChangeAddressInput | AptosDeleteModuleChangeAddress) {
    if (input instanceof AptosDeleteModuleChangeAddress) {
      return input;
    }
    return new AptosDeleteModuleChangeAddress(input);
  }

  public static fromJSON(json: AptosDeleteModuleChangeAddressJSON) {
    return new AptosDeleteModuleChangeAddress(json);
  }

  public constructor(public readonly value: AptosDeleteModuleChangeAddressInput) {}

  public toJSON(): AptosDeleteModuleChangeAddressJSON {
    return this.value;
  }
}
