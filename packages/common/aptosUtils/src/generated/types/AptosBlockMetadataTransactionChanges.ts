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
export type AptosBlockMetadataTransactionChangesValue = AptosDeleteModuleChange | AptosDeleteResourceChange | AptosDeleteTableItemChange | AptosWriteOrUpdateModuleChange | AptosWriteTableChangeSetChange;

export abstract class AptosBlockMetadataTransactionChanges {
  public static create(input: AptosBlockMetadataTransactionChangesInput): AptosBlockMetadataTransactionChangesValue {
    if (AptosDeleteModuleChange.isInput(input)) {
      return AptosDeleteModuleChange.create(input);
    }
    if (AptosDeleteResourceChange.isInput(input)) {
      return AptosDeleteResourceChange.create(input);
    }
    if (AptosDeleteTableItemChange.isInput(input)) {
      return AptosDeleteTableItemChange.create(input);
    }
    if (AptosWriteOrUpdateModuleChange.isInput(input)) {
      return AptosWriteOrUpdateModuleChange.create(input);
    }
    if (AptosWriteTableChangeSetChange.isInput(input)) {
      return AptosWriteTableChangeSetChange.create(input);
    }
    throw new Error('Invalid input');
  }

  public static fromJSON(json: AptosBlockMetadataTransactionChangesJSON): AptosBlockMetadataTransactionChangesValue {
    if (AptosDeleteModuleChange.isJSON(json)) {
      return AptosDeleteModuleChange.fromJSON(json);
    }
    if (AptosDeleteResourceChange.isJSON(json)) {
      return AptosDeleteResourceChange.fromJSON(json);
    }
    if (AptosDeleteTableItemChange.isJSON(json)) {
      return AptosDeleteTableItemChange.fromJSON(json);
    }
    if (AptosWriteOrUpdateModuleChange.isJSON(json)) {
      return AptosWriteOrUpdateModuleChange.fromJSON(json);
    }
    if (AptosWriteTableChangeSetChange.isJSON(json)) {
      return AptosWriteTableChangeSetChange.fromJSON(json);
    }
    throw new Error(`Cannot resolve union for AptosBlockMetadataTransactionChanges (keys: ${Object.keys(json).join(',') })`);
  }
}
