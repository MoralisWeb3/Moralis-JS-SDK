// $ref: #/components/schemas/DeleteResourceChange/properties/resource
// typeName: DeleteResourceChange_resource

export type AptosDeleteResourceChangeResourceJSON = object;
export type AptosDeleteResourceChangeResourceInput = AptosDeleteResourceChangeResourceJSON;

export class AptosDeleteResourceChangeResource {
  public static create(input: AptosDeleteResourceChangeResourceInput | AptosDeleteResourceChangeResource) {
    if (input instanceof AptosDeleteResourceChangeResource) {
      return input;
    }
    return new AptosDeleteResourceChangeResource(input);
  }

  public static fromJSON(json: AptosDeleteResourceChangeResourceJSON) {
    return new AptosDeleteResourceChangeResource(json);
  }

  public constructor(public readonly value: AptosDeleteResourceChangeResourceInput) {}

  public toJSON(): AptosDeleteResourceChangeResourceJSON {
    return this.value;
  }
}
