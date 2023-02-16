import { AptosDeleteModuleChange, AptosDeleteModuleChangeJSON, AptosDeleteModuleChangeInput } from '../types/AptosDeleteModuleChange';
import { AptosDeleteResourceChange, AptosDeleteResourceChangeJSON, AptosDeleteResourceChangeInput } from '../types/AptosDeleteResourceChange';
import { AptosDeleteTableItemChange, AptosDeleteTableItemChangeJSON, AptosDeleteTableItemChangeInput } from '../types/AptosDeleteTableItemChange';
import { AptosWriteOrUpdateModuleChange, AptosWriteOrUpdateModuleChangeJSON, AptosWriteOrUpdateModuleChangeInput } from '../types/AptosWriteOrUpdateModuleChange';
import { AptosWriteTableChangeSetChange, AptosWriteTableChangeSetChangeJSON, AptosWriteTableChangeSetChangeInput } from '../types/AptosWriteTableChangeSetChange';

// $ref: #/components/schemas/UserTransaction/properties/changes
// typeName: UserTransaction_changes
// unionType: oneOf

export type AptosUserTransactionChangesJSON = AptosDeleteModuleChangeJSON | AptosDeleteResourceChangeJSON | AptosDeleteTableItemChangeJSON | AptosWriteOrUpdateModuleChangeJSON | AptosWriteTableChangeSetChangeJSON;
export type AptosUserTransactionChangesInput = AptosDeleteModuleChangeInput | AptosDeleteResourceChangeInput | AptosDeleteTableItemChangeInput | AptosWriteOrUpdateModuleChangeInput | AptosWriteTableChangeSetChangeInput;

export class AptosUserTransactionChanges {
  public static create(input: AptosUserTransactionChangesInput | AptosUserTransactionChanges): AptosUserTransactionChanges {
    if (input instanceof AptosUserTransactionChanges) {
      return input;
    }
    if (AptosDeleteModuleChange.isInput(input)) {
      return new AptosUserTransactionChanges(AptosDeleteModuleChange.create(input));
    }
    if (AptosDeleteResourceChange.isInput(input)) {
      return new AptosUserTransactionChanges(AptosDeleteResourceChange.create(input));
    }
    if (AptosDeleteTableItemChange.isInput(input)) {
      return new AptosUserTransactionChanges(AptosDeleteTableItemChange.create(input));
    }
    if (AptosWriteOrUpdateModuleChange.isInput(input)) {
      return new AptosUserTransactionChanges(AptosWriteOrUpdateModuleChange.create(input));
    }
    if (AptosWriteTableChangeSetChange.isInput(input)) {
      return new AptosUserTransactionChanges(AptosWriteTableChangeSetChange.create(input));
    }
    throw new Error('Invalid input');
  }

  public static fromJSON(json: AptosUserTransactionChangesJSON): AptosUserTransactionChanges {
    if (AptosDeleteModuleChange.isJSON(json)) {
      return new AptosUserTransactionChanges(AptosDeleteModuleChange.fromJSON(json));
    }
    if (AptosDeleteResourceChange.isJSON(json)) {
      return new AptosUserTransactionChanges(AptosDeleteResourceChange.fromJSON(json));
    }
    if (AptosDeleteTableItemChange.isJSON(json)) {
      return new AptosUserTransactionChanges(AptosDeleteTableItemChange.fromJSON(json));
    }
    if (AptosWriteOrUpdateModuleChange.isJSON(json)) {
      return new AptosUserTransactionChanges(AptosWriteOrUpdateModuleChange.fromJSON(json));
    }
    if (AptosWriteTableChangeSetChange.isJSON(json)) {
      return new AptosUserTransactionChanges(AptosWriteTableChangeSetChange.fromJSON(json));
    }
    throw new Error(`Cannot resolve union for AptosUserTransactionChanges (keys: ${Object.keys(json).join(',') })`);
  }

  public constructor(public readonly value: AptosDeleteModuleChange | AptosDeleteResourceChange | AptosDeleteTableItemChange | AptosWriteOrUpdateModuleChange | AptosWriteTableChangeSetChange) {}

  public toJSON(): AptosUserTransactionChangesJSON {
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
