import { AptosDeleteModuleChange, AptosDeleteModuleChangeJSON, AptosDeleteModuleChangeInput } from '../types/AptosDeleteModuleChange';
import { AptosDeleteResourceChange, AptosDeleteResourceChangeJSON, AptosDeleteResourceChangeInput } from '../types/AptosDeleteResourceChange';
import { AptosDeleteTableItemChange, AptosDeleteTableItemChangeJSON, AptosDeleteTableItemChangeInput } from '../types/AptosDeleteTableItemChange';
import { AptosWriteOrUpdateModuleChange, AptosWriteOrUpdateModuleChangeJSON, AptosWriteOrUpdateModuleChangeInput } from '../types/AptosWriteOrUpdateModuleChange';
import { AptosWriteTableChangeSetChange, AptosWriteTableChangeSetChangeJSON, AptosWriteTableChangeSetChangeInput } from '../types/AptosWriteTableChangeSetChange';

// $ref: #/components/schemas/GenesisTransaction/properties/changes
// typeName: GenesisTransaction_changes
// unionType: oneOf

export type AptosGenesisTransactionChangesJSON = AptosDeleteModuleChangeJSON | AptosDeleteResourceChangeJSON | AptosDeleteTableItemChangeJSON | AptosWriteOrUpdateModuleChangeJSON | AptosWriteTableChangeSetChangeJSON;
export type AptosGenesisTransactionChangesInput = AptosDeleteModuleChangeInput | AptosDeleteResourceChangeInput | AptosDeleteTableItemChangeInput | AptosWriteOrUpdateModuleChangeInput | AptosWriteTableChangeSetChangeInput;

export class AptosGenesisTransactionChanges {
  public static create(input: AptosGenesisTransactionChangesInput | AptosGenesisTransactionChanges): AptosGenesisTransactionChanges {
    if (input instanceof AptosGenesisTransactionChanges) {
      return input;
    }
    if (AptosDeleteModuleChange.isInput(input)) {
      return new AptosGenesisTransactionChanges(AptosDeleteModuleChange.create(input));
    }
    if (AptosDeleteResourceChange.isInput(input)) {
      return new AptosGenesisTransactionChanges(AptosDeleteResourceChange.create(input));
    }
    if (AptosDeleteTableItemChange.isInput(input)) {
      return new AptosGenesisTransactionChanges(AptosDeleteTableItemChange.create(input));
    }
    if (AptosWriteOrUpdateModuleChange.isInput(input)) {
      return new AptosGenesisTransactionChanges(AptosWriteOrUpdateModuleChange.create(input));
    }
    if (AptosWriteTableChangeSetChange.isInput(input)) {
      return new AptosGenesisTransactionChanges(AptosWriteTableChangeSetChange.create(input));
    }
    throw new Error('Invalid input');
  }

  public static fromJSON(json: AptosGenesisTransactionChangesJSON): AptosGenesisTransactionChanges {
    if (AptosDeleteModuleChange.isJSON(json)) {
      return new AptosGenesisTransactionChanges(AptosDeleteModuleChange.fromJSON(json));
    }
    if (AptosDeleteResourceChange.isJSON(json)) {
      return new AptosGenesisTransactionChanges(AptosDeleteResourceChange.fromJSON(json));
    }
    if (AptosDeleteTableItemChange.isJSON(json)) {
      return new AptosGenesisTransactionChanges(AptosDeleteTableItemChange.fromJSON(json));
    }
    if (AptosWriteOrUpdateModuleChange.isJSON(json)) {
      return new AptosGenesisTransactionChanges(AptosWriteOrUpdateModuleChange.fromJSON(json));
    }
    if (AptosWriteTableChangeSetChange.isJSON(json)) {
      return new AptosGenesisTransactionChanges(AptosWriteTableChangeSetChange.fromJSON(json));
    }
    throw new Error(`Cannot resolve union for AptosGenesisTransactionChanges (keys: ${Object.keys(json).join(',') })`);
  }

  public constructor(public readonly value: AptosDeleteModuleChange | AptosDeleteResourceChange | AptosDeleteTableItemChange | AptosWriteOrUpdateModuleChange | AptosWriteTableChangeSetChange) {}

  public toJSON(): AptosGenesisTransactionChangesJSON {
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
