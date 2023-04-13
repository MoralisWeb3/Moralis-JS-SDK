import { AptosDeleteModuleChange, AptosDeleteModuleChangeJSON, AptosDeleteModuleChangeInput } from '../types/AptosDeleteModuleChange';
import { AptosDeleteResourceChange, AptosDeleteResourceChangeJSON, AptosDeleteResourceChangeInput } from '../types/AptosDeleteResourceChange';
import { AptosDeleteTableItemChange, AptosDeleteTableItemChangeJSON, AptosDeleteTableItemChangeInput } from '../types/AptosDeleteTableItemChange';
import { AptosWriteOrUpdateModuleChange, AptosWriteOrUpdateModuleChangeJSON, AptosWriteOrUpdateModuleChangeInput } from '../types/AptosWriteOrUpdateModuleChange';
import { AptosWriteResourceChange, AptosWriteResourceChangeJSON, AptosWriteResourceChangeInput } from '../types/AptosWriteResourceChange';
import { AptosWriteTableChangeSetChange, AptosWriteTableChangeSetChangeJSON, AptosWriteTableChangeSetChangeInput } from '../types/AptosWriteTableChangeSetChange';

// $ref: #/components/schemas/StateCheckpointTransaction/properties/changes/items
// typeName: StateCheckpointTransaction_changes_Item
// unionType: anyOf

export type AptosStateCheckpointTransactionChangesItemJSON = AptosDeleteModuleChangeJSON | AptosDeleteResourceChangeJSON | AptosDeleteTableItemChangeJSON | AptosWriteOrUpdateModuleChangeJSON | AptosWriteResourceChangeJSON | AptosWriteTableChangeSetChangeJSON;
export type AptosStateCheckpointTransactionChangesItemInput = AptosDeleteModuleChangeInput | AptosDeleteResourceChangeInput | AptosDeleteTableItemChangeInput | AptosWriteOrUpdateModuleChangeInput | AptosWriteResourceChangeInput | AptosWriteTableChangeSetChangeInput;
export type AptosStateCheckpointTransactionChangesItemValue = AptosDeleteModuleChange | AptosDeleteResourceChange | AptosDeleteTableItemChange | AptosWriteOrUpdateModuleChange | AptosWriteResourceChange | AptosWriteTableChangeSetChange;

export abstract class AptosStateCheckpointTransactionChangesItem {
  public static create(input: AptosStateCheckpointTransactionChangesItemInput): AptosStateCheckpointTransactionChangesItemValue {
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
    if (AptosWriteResourceChange.isInput(input)) {
      return AptosWriteResourceChange.create(input);
    }
    if (AptosWriteTableChangeSetChange.isInput(input)) {
      return AptosWriteTableChangeSetChange.create(input);
    }
    throw new Error('Cannot resolve union from AptosStateCheckpointTransactionChangesItemInput');
  }

  public static fromJSON(json: AptosStateCheckpointTransactionChangesItemJSON): AptosStateCheckpointTransactionChangesItemValue {
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
    if (AptosWriteResourceChange.isJSON(json)) {
      return AptosWriteResourceChange.fromJSON(json);
    }
    if (AptosWriteTableChangeSetChange.isJSON(json)) {
      return AptosWriteTableChangeSetChange.fromJSON(json);
    }
    const keys = Object.keys(json).join(', ');
    const type = (json as any).type;
    throw new Error(`Cannot resolve union from AptosStateCheckpointTransactionChangesItemJSON (keys: ${keys}, type: ${type})`);
  }

  public static toJSON(value: AptosStateCheckpointTransactionChangesItemValue): AptosStateCheckpointTransactionChangesItemJSON {
    if (value instanceof AptosDeleteModuleChange) {
      return value.toJSON();
    }
    if (value instanceof AptosDeleteResourceChange) {
      return value.toJSON();
    }
    if (value instanceof AptosDeleteTableItemChange) {
      return value.toJSON();
    }
    if (value instanceof AptosWriteOrUpdateModuleChange) {
      return value.toJSON();
    }
    if (value instanceof AptosWriteResourceChange) {
      return value.toJSON();
    }
    if (value instanceof AptosWriteTableChangeSetChange) {
      return value.toJSON();
    }
    throw new Error('Cannot resolve union from AptosStateCheckpointTransactionChangesItemValue');
  }
}
