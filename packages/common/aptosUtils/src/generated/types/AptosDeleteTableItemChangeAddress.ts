// $ref: #/components/schemas/DeleteTableItemChange/properties/address
// typeName: DeleteTableItemChange_address

export type AptosDeleteTableItemChangeAddressJSON = object;
export type AptosDeleteTableItemChangeAddressInput = object;
export type AptosDeleteTableItemChangeAddressValue = object;

export abstract class AptosDeleteTableItemChangeAddress {
  public static create(input: AptosDeleteTableItemChangeAddressInput | AptosDeleteTableItemChangeAddressValue): AptosDeleteTableItemChangeAddressValue {
    return input;
  }

  public static fromJSON(json: AptosDeleteTableItemChangeAddressJSON): AptosDeleteTableItemChangeAddressValue {
    return json;
  }
}
