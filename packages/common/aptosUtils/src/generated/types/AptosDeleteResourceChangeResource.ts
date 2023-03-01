// $ref: #/components/schemas/DeleteResourceChange/properties/resource
// typeName: DeleteResourceChange_resource

export type AptosDeleteResourceChangeResourceJSON = object;
export type AptosDeleteResourceChangeResourceInput = object;
export type AptosDeleteResourceChangeResourceValue = object;

export abstract class AptosDeleteResourceChangeResource {
  public static create(input: AptosDeleteResourceChangeResourceInput | AptosDeleteResourceChangeResourceValue): AptosDeleteResourceChangeResourceValue {
    return input;
  }

  public static fromJSON(json: AptosDeleteResourceChangeResourceJSON): AptosDeleteResourceChangeResourceValue {
    return json;
  }
}
