import { AptosDeleteModuleChange, AptosDeleteModuleChangeJSON, AptosDeleteModuleChangeInput } from '../types/AptosDeleteModuleChange';
import { AptosDeleteResourceChange, AptosDeleteResourceChangeJSON, AptosDeleteResourceChangeInput } from '../types/AptosDeleteResourceChange';
import { AptosDeleteTableItemChange, AptosDeleteTableItemChangeJSON, AptosDeleteTableItemChangeInput } from '../types/AptosDeleteTableItemChange';
import { AptosWriteOrUpdateModuleChange, AptosWriteOrUpdateModuleChangeJSON, AptosWriteOrUpdateModuleChangeInput } from '../types/AptosWriteOrUpdateModuleChange';
import { AptosWriteTableChangeSetChange, AptosWriteTableChangeSetChangeJSON, AptosWriteTableChangeSetChangeInput } from '../types/AptosWriteTableChangeSetChange';

// $ref: #/components/schemas/DirectWriteSet/properties/changes
// typeName: DirectWriteSet_changes
// unionType: oneOf

export type AptosDirectWriteSetChangesJSON = AptosDeleteModuleChangeJSON | AptosDeleteResourceChangeJSON | AptosDeleteTableItemChangeJSON | AptosWriteOrUpdateModuleChangeJSON | AptosWriteTableChangeSetChangeJSON;
export type AptosDirectWriteSetChangesInput = AptosDeleteModuleChangeInput | AptosDeleteResourceChangeInput | AptosDeleteTableItemChangeInput | AptosWriteOrUpdateModuleChangeInput | AptosWriteTableChangeSetChangeInput;

export class AptosDirectWriteSetChanges {
  public static create(input: AptosDirectWriteSetChangesInput | AptosDirectWriteSetChanges): AptosDirectWriteSetChanges {
    if (input instanceof AptosDirectWriteSetChanges) {
      return input;
    }
    if (AptosDeleteModuleChange.isInput(input)) {
      return new AptosDirectWriteSetChanges(AptosDeleteModuleChange.create(input));
    }
    if (AptosDeleteResourceChange.isInput(input)) {
      return new AptosDirectWriteSetChanges(AptosDeleteResourceChange.create(input));
    }
    if (AptosDeleteTableItemChange.isInput(input)) {
      return new AptosDirectWriteSetChanges(AptosDeleteTableItemChange.create(input));
    }
    if (AptosWriteOrUpdateModuleChange.isInput(input)) {
      return new AptosDirectWriteSetChanges(AptosWriteOrUpdateModuleChange.create(input));
    }
    if (AptosWriteTableChangeSetChange.isInput(input)) {
      return new AptosDirectWriteSetChanges(AptosWriteTableChangeSetChange.create(input));
    }
    throw new Error('Invalid input');
  }

  public static fromJSON(json: AptosDirectWriteSetChangesJSON): AptosDirectWriteSetChanges {
    if (AptosDeleteModuleChange.isJSON(json)) {
      return new AptosDirectWriteSetChanges(AptosDeleteModuleChange.fromJSON(json));
    }
    if (AptosDeleteResourceChange.isJSON(json)) {
      return new AptosDirectWriteSetChanges(AptosDeleteResourceChange.fromJSON(json));
    }
    if (AptosDeleteTableItemChange.isJSON(json)) {
      return new AptosDirectWriteSetChanges(AptosDeleteTableItemChange.fromJSON(json));
    }
    if (AptosWriteOrUpdateModuleChange.isJSON(json)) {
      return new AptosDirectWriteSetChanges(AptosWriteOrUpdateModuleChange.fromJSON(json));
    }
    if (AptosWriteTableChangeSetChange.isJSON(json)) {
      return new AptosDirectWriteSetChanges(AptosWriteTableChangeSetChange.fromJSON(json));
    }
    throw new Error(`Cannot resolve union for AptosDirectWriteSetChanges (keys: ${Object.keys(json).join(',') })`);
  }

  public constructor(public readonly value: AptosDeleteModuleChange | AptosDeleteResourceChange | AptosDeleteTableItemChange | AptosWriteOrUpdateModuleChange | AptosWriteTableChangeSetChange) {}

  public toJSON(): AptosDirectWriteSetChangesJSON {
    if (this.value instanceof AptosDeleteModuleChange) {
      return this.value.toJSON();
    }
    if (this.value instanceof AptosDeleteResourceChange) {
      return this.value.toJSON();
    }
    if (this.value instanceof AptosDeleteTableItemChange) {
      return this.value.toJSON();
    }
    if (this.value instanceof AptosWriteOrUpdateModuleChange) {
      return this.value.toJSON();
    }
    if (this.value instanceof AptosWriteTableChangeSetChange) {
      return this.value.toJSON();
    }
    throw new Error('Invalid value');
  }
}
