import { AptosDeleteModuleChange, AptosDeleteModuleChangeJSON, AptosDeleteModuleChangeInput } from '../types/AptosDeleteModuleChange';
import { AptosDeleteResourceChange, AptosDeleteResourceChangeJSON, AptosDeleteResourceChangeInput } from '../types/AptosDeleteResourceChange';
import { AptosDeleteTableItemChange, AptosDeleteTableItemChangeJSON, AptosDeleteTableItemChangeInput } from '../types/AptosDeleteTableItemChange';
import { AptosWriteOrUpdateModuleChange, AptosWriteOrUpdateModuleChangeJSON, AptosWriteOrUpdateModuleChangeInput } from '../types/AptosWriteOrUpdateModuleChange';
import { AptosWriteTableChangeSetChange, AptosWriteTableChangeSetChangeJSON, AptosWriteTableChangeSetChangeInput } from '../types/AptosWriteTableChangeSetChange';

// $ref: #/components/schemas/StateCheckpointTransaction/properties/changes
// typeName: StateCheckpointTransaction_changes
// unionType: oneOf

export type AptosStateCheckpointTransactionChangesJSON = AptosDeleteModuleChangeJSON | AptosDeleteResourceChangeJSON | AptosDeleteTableItemChangeJSON | AptosWriteOrUpdateModuleChangeJSON | AptosWriteTableChangeSetChangeJSON;
export type AptosStateCheckpointTransactionChangesInput = AptosDeleteModuleChangeInput | AptosDeleteResourceChangeInput | AptosDeleteTableItemChangeInput | AptosWriteOrUpdateModuleChangeInput | AptosWriteTableChangeSetChangeInput;

export class AptosStateCheckpointTransactionChanges {
  public static create(input: AptosStateCheckpointTransactionChangesInput | AptosStateCheckpointTransactionChanges): AptosStateCheckpointTransactionChanges {
    if (input instanceof AptosStateCheckpointTransactionChanges) {
      return input;
    }
    if (AptosDeleteModuleChange.isInput(input)) {
      return new AptosStateCheckpointTransactionChanges(AptosDeleteModuleChange.create(input));
    }
    if (AptosDeleteResourceChange.isInput(input)) {
      return new AptosStateCheckpointTransactionChanges(AptosDeleteResourceChange.create(input));
    }
    if (AptosDeleteTableItemChange.isInput(input)) {
      return new AptosStateCheckpointTransactionChanges(AptosDeleteTableItemChange.create(input));
    }
    if (AptosWriteOrUpdateModuleChange.isInput(input)) {
      return new AptosStateCheckpointTransactionChanges(AptosWriteOrUpdateModuleChange.create(input));
    }
    if (AptosWriteTableChangeSetChange.isInput(input)) {
      return new AptosStateCheckpointTransactionChanges(AptosWriteTableChangeSetChange.create(input));
    }
    throw new Error('Invalid input');
  }

  public static fromJSON(json: AptosStateCheckpointTransactionChangesJSON): AptosStateCheckpointTransactionChanges {
    if (AptosDeleteModuleChange.isJSON(json)) {
      return new AptosStateCheckpointTransactionChanges(AptosDeleteModuleChange.fromJSON(json));
    }
    if (AptosDeleteResourceChange.isJSON(json)) {
      return new AptosStateCheckpointTransactionChanges(AptosDeleteResourceChange.fromJSON(json));
    }
    if (AptosDeleteTableItemChange.isJSON(json)) {
      return new AptosStateCheckpointTransactionChanges(AptosDeleteTableItemChange.fromJSON(json));
    }
    if (AptosWriteOrUpdateModuleChange.isJSON(json)) {
      return new AptosStateCheckpointTransactionChanges(AptosWriteOrUpdateModuleChange.fromJSON(json));
    }
    if (AptosWriteTableChangeSetChange.isJSON(json)) {
      return new AptosStateCheckpointTransactionChanges(AptosWriteTableChangeSetChange.fromJSON(json));
    }
    throw new Error(`Cannot resolve union for AptosStateCheckpointTransactionChanges (keys: ${Object.keys(json).join(',') })`);
  }

  public constructor(public readonly value: AptosDeleteModuleChange | AptosDeleteResourceChange | AptosDeleteTableItemChange | AptosWriteOrUpdateModuleChange | AptosWriteTableChangeSetChange) {}

  public toJSON(): AptosStateCheckpointTransactionChangesJSON {
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
