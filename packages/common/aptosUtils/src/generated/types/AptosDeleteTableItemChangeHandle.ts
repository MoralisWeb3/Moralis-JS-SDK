// $ref: #/components/schemas/DeleteTableItemChange/properties/handle
// typeName: DeleteTableItemChange_handle

export type AptosDeleteTableItemChangeHandleJSON = object;
export type AptosDeleteTableItemChangeHandleInput = AptosDeleteTableItemChangeHandleJSON;

export class AptosDeleteTableItemChangeHandle {
  public static create(input: AptosDeleteTableItemChangeHandleInput | AptosDeleteTableItemChangeHandle) {
    if (input instanceof AptosDeleteTableItemChangeHandle) {
      return input;
    }
    return new AptosDeleteTableItemChangeHandle(input);
  }

  public static fromJSON(json: AptosDeleteTableItemChangeHandleJSON) {
    return new AptosDeleteTableItemChangeHandle(json);
  }

  public constructor(public readonly value: AptosDeleteTableItemChangeHandleInput) {}

  public toJSON(): AptosDeleteTableItemChangeHandleJSON {
    return this.value;
  }
}
