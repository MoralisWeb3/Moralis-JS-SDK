// $ref: #/components/schemas/DeleteTableItemChange/properties/address
// typeName: DeleteTableItemChange_address

export type AptosDeleteTableItemChangeAddressJSON = object;
export type AptosDeleteTableItemChangeAddressInput = AptosDeleteTableItemChangeAddressJSON;

export class AptosDeleteTableItemChangeAddress {
  public static create(input: AptosDeleteTableItemChangeAddressInput | AptosDeleteTableItemChangeAddress) {
    if (input instanceof AptosDeleteTableItemChangeAddress) {
      return input;
    }
    return new AptosDeleteTableItemChangeAddress(input);
  }

  public static fromJSON(json: AptosDeleteTableItemChangeAddressJSON) {
    return new AptosDeleteTableItemChangeAddress(json);
  }

  public constructor(public readonly value: AptosDeleteTableItemChangeAddressInput) {}

  public toJSON(): AptosDeleteTableItemChangeAddressJSON {
    return this.value;
  }
}
