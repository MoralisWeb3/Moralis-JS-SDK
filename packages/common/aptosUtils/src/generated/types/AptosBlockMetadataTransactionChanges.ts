import { AptosDeleteModuleChange, AptosDeleteModuleChangeJSON, AptosDeleteModuleChangeInput } from '../types/AptosDeleteModuleChange';
import { AptosDeleteResourceChange, AptosDeleteResourceChangeJSON, AptosDeleteResourceChangeInput } from '../types/AptosDeleteResourceChange';
import { AptosDeleteTableItemChange, AptosDeleteTableItemChangeJSON, AptosDeleteTableItemChangeInput } from '../types/AptosDeleteTableItemChange';
import { AptosWriteOrUpdateModuleChange, AptosWriteOrUpdateModuleChangeJSON, AptosWriteOrUpdateModuleChangeInput } from '../types/AptosWriteOrUpdateModuleChange';
import { AptosWriteTableChangeSetChange, AptosWriteTableChangeSetChangeJSON, AptosWriteTableChangeSetChangeInput } from '../types/AptosWriteTableChangeSetChange';

// $ref: #/components/schemas/BlockMetadataTransaction/properties/changes
// typeName: BlockMetadataTransaction_changes
// unionType: oneOf

export type AptosBlockMetadataTransactionChangesJSON = AptosDeleteModuleChangeJSON | AptosDeleteResourceChangeJSON | AptosDeleteTableItemChangeJSON | AptosWriteOrUpdateModuleChangeJSON | AptosWriteTableChangeSetChangeJSON;
export type AptosBlockMetadataTransactionChangesInput = AptosDeleteModuleChangeInput | AptosDeleteResourceChangeInput | AptosDeleteTableItemChangeInput | AptosWriteOrUpdateModuleChangeInput | AptosWriteTableChangeSetChangeInput;

export class AptosBlockMetadataTransactionChanges {
  public static create(input: AptosBlockMetadataTransactionChangesInput | AptosBlockMetadataTransactionChanges): AptosBlockMetadataTransactionChanges {
    if (input instanceof AptosBlockMetadataTransactionChanges) {
      return input;
    }
    if (AptosDeleteModuleChange.isInput(input)) {
      return new AptosBlockMetadataTransactionChanges(AptosDeleteModuleChange.create(input));
    }
    if (AptosDeleteResourceChange.isInput(input)) {
      return new AptosBlockMetadataTransactionChanges(AptosDeleteResourceChange.create(input));
    }
    if (AptosDeleteTableItemChange.isInput(input)) {
      return new AptosBlockMetadataTransactionChanges(AptosDeleteTableItemChange.create(input));
    }
    if (AptosWriteOrUpdateModuleChange.isInput(input)) {
      return new AptosBlockMetadataTransactionChanges(AptosWriteOrUpdateModuleChange.create(input));
    }
    if (AptosWriteTableChangeSetChange.isInput(input)) {
      return new AptosBlockMetadataTransactionChanges(AptosWriteTableChangeSetChange.create(input));
    }
    throw new Error('Invalid input');
  }

  public static fromJSON(json: AptosBlockMetadataTransactionChangesJSON): AptosBlockMetadataTransactionChanges {
    if (AptosDeleteModuleChange.isJSON(json)) {
      return new AptosBlockMetadataTransactionChanges(AptosDeleteModuleChange.fromJSON(json));
    }
    if (AptosDeleteResourceChange.isJSON(json)) {
      return new AptosBlockMetadataTransactionChanges(AptosDeleteResourceChange.fromJSON(json));
    }
    if (AptosDeleteTableItemChange.isJSON(json)) {
      return new AptosBlockMetadataTransactionChanges(AptosDeleteTableItemChange.fromJSON(json));
    }
    if (AptosWriteOrUpdateModuleChange.isJSON(json)) {
      return new AptosBlockMetadataTransactionChanges(AptosWriteOrUpdateModuleChange.fromJSON(json));
    }
    if (AptosWriteTableChangeSetChange.isJSON(json)) {
      return new AptosBlockMetadataTransactionChanges(AptosWriteTableChangeSetChange.fromJSON(json));
    }
    throw new Error(`Cannot resolve union for AptosBlockMetadataTransactionChanges (keys: ${Object.keys(json).join(',') })`);
  }

  public constructor(public readonly value: AptosDeleteModuleChange | AptosDeleteResourceChange | AptosDeleteTableItemChange | AptosWriteOrUpdateModuleChange | AptosWriteTableChangeSetChange) {}

  public toJSON(): AptosBlockMetadataTransactionChangesJSON {
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
