// $ref: #/components/schemas/DeleteResourceChange/properties/address
// typeName: DeleteResourceChange_address

export type AptosDeleteResourceChangeAddressJSON = object;
export type AptosDeleteResourceChangeAddressInput = AptosDeleteResourceChangeAddressJSON;

export class AptosDeleteResourceChangeAddress {
  public static create(input: AptosDeleteResourceChangeAddressInput | AptosDeleteResourceChangeAddress) {
    if (input instanceof AptosDeleteResourceChangeAddress) {
      return input;
    }
    return new AptosDeleteResourceChangeAddress(input);
  }

  public static fromJSON(json: AptosDeleteResourceChangeAddressJSON) {
    return new AptosDeleteResourceChangeAddress(json);
  }

  public constructor(public readonly value: AptosDeleteResourceChangeAddressInput) {}

  public toJSON(): AptosDeleteResourceChangeAddressJSON {
    return this.value;
  }
}
