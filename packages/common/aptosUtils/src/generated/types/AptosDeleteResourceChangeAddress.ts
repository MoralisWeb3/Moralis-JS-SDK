// $ref: #/components/schemas/DeleteResourceChange/properties/address
// typeName: DeleteResourceChange_address

export type AptosDeleteResourceChangeAddressJSON = object;
export type AptosDeleteResourceChangeAddressInput = object;
export type AptosDeleteResourceChangeAddressValue = object;

export abstract class AptosDeleteResourceChangeAddress {
  public static create(input: AptosDeleteResourceChangeAddressInput | AptosDeleteResourceChangeAddressValue): AptosDeleteResourceChangeAddressValue {
    return input;
  }

  public static fromJSON(json: AptosDeleteResourceChangeAddressJSON): AptosDeleteResourceChangeAddressValue {
    return json;
  }
}
