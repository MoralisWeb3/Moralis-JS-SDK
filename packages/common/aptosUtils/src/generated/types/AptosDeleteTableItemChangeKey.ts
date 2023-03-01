// $ref: #/components/schemas/DeleteTableItemChange/properties/key
// typeName: DeleteTableItemChange_key

export type AptosDeleteTableItemChangeKeyJSON = object;
export type AptosDeleteTableItemChangeKeyInput = object;
export type AptosDeleteTableItemChangeKeyValue = object;

export abstract class AptosDeleteTableItemChangeKey {
  public static create(input: AptosDeleteTableItemChangeKeyInput | AptosDeleteTableItemChangeKeyValue): AptosDeleteTableItemChangeKeyValue {
    return input;
  }

  public static fromJSON(json: AptosDeleteTableItemChangeKeyJSON): AptosDeleteTableItemChangeKeyValue {
    return json;
  }
}
