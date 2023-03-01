// $ref: #/components/schemas/DeleteModuleChange/properties/module
// typeName: DeleteModuleChange_module

export type AptosDeleteModuleChangeModuleJSON = object;
export type AptosDeleteModuleChangeModuleInput = object;
export type AptosDeleteModuleChangeModuleValue = object;

export abstract class AptosDeleteModuleChangeModule {
  public static create(input: AptosDeleteModuleChangeModuleInput | AptosDeleteModuleChangeModuleValue): AptosDeleteModuleChangeModuleValue {
    return input;
  }

  public static fromJSON(json: AptosDeleteModuleChangeModuleJSON): AptosDeleteModuleChangeModuleValue {
    return json;
  }
}
