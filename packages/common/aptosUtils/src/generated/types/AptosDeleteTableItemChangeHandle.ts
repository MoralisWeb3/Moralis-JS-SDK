// $ref: #/components/schemas/DeleteTableItemChange/properties/handle
// typeName: DeleteTableItemChange_handle

export type AptosDeleteTableItemChangeHandleJSON = object;
export type AptosDeleteTableItemChangeHandleInput = object;
export type AptosDeleteTableItemChangeHandleValue = object;

export abstract class AptosDeleteTableItemChangeHandle {
  public static create(input: AptosDeleteTableItemChangeHandleInput | AptosDeleteTableItemChangeHandleValue): AptosDeleteTableItemChangeHandleValue {
    return input;
  }

  public static fromJSON(json: AptosDeleteTableItemChangeHandleJSON): AptosDeleteTableItemChangeHandleValue {
    return json;
  }
}
