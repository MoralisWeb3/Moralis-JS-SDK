// $ref: #/components/schemas/DeleteTableItemChange/properties/key
// typeName: DeleteTableItemChange_key

export type AptosDeleteTableItemChangeKeyJSON = object;
export type AptosDeleteTableItemChangeKeyInput = AptosDeleteTableItemChangeKeyJSON;

export class AptosDeleteTableItemChangeKey {
  public static create(input: AptosDeleteTableItemChangeKeyInput | AptosDeleteTableItemChangeKey) {
    if (input instanceof AptosDeleteTableItemChangeKey) {
      return input;
    }
    return new AptosDeleteTableItemChangeKey(input);
  }

  public static fromJSON(json: AptosDeleteTableItemChangeKeyJSON) {
    return new AptosDeleteTableItemChangeKey(json);
  }

  public constructor(public readonly value: AptosDeleteTableItemChangeKeyInput) {}

  public toJSON(): AptosDeleteTableItemChangeKeyJSON {
    return this.value;
  }
}
