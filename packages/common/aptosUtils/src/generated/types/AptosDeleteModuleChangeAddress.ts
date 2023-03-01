// $ref: #/components/schemas/DeleteModuleChange/properties/address
// typeName: DeleteModuleChange_address

export type AptosDeleteModuleChangeAddressJSON = object;
export type AptosDeleteModuleChangeAddressInput = object;
export type AptosDeleteModuleChangeAddressValue = object;

export abstract class AptosDeleteModuleChangeAddress {
  public static create(input: AptosDeleteModuleChangeAddressInput | AptosDeleteModuleChangeAddressValue): AptosDeleteModuleChangeAddressValue {
    return input;
  }

  public static fromJSON(json: AptosDeleteModuleChangeAddressJSON): AptosDeleteModuleChangeAddressValue {
    return json;
  }
}
