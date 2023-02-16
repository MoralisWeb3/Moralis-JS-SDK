// $ref: #/components/schemas/DeleteModuleChange/properties/module
// typeName: DeleteModuleChange_module

export type AptosDeleteModuleChangeModuleJSON = object;
export type AptosDeleteModuleChangeModuleInput = AptosDeleteModuleChangeModuleJSON;

export class AptosDeleteModuleChangeModule {
  public static create(input: AptosDeleteModuleChangeModuleInput | AptosDeleteModuleChangeModule) {
    if (input instanceof AptosDeleteModuleChangeModule) {
      return input;
    }
    return new AptosDeleteModuleChangeModule(input);
  }

  public static fromJSON(json: AptosDeleteModuleChangeModuleJSON) {
    return new AptosDeleteModuleChangeModule(json);
  }

  public constructor(public readonly value: AptosDeleteModuleChangeModuleInput) {}

  public toJSON(): AptosDeleteModuleChangeModuleJSON {
    return this.value;
  }
}
