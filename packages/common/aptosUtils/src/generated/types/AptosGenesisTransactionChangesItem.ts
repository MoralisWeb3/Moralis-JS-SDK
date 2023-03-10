import { AptosDeleteModuleChange, AptosDeleteModuleChangeJSON, AptosDeleteModuleChangeInput } from '../types/AptosDeleteModuleChange';
import { AptosDeleteResourceChange, AptosDeleteResourceChangeJSON, AptosDeleteResourceChangeInput } from '../types/AptosDeleteResourceChange';
import { AptosDeleteTableItemChange, AptosDeleteTableItemChangeJSON, AptosDeleteTableItemChangeInput } from '../types/AptosDeleteTableItemChange';
import { AptosWriteOrUpdateModuleChange, AptosWriteOrUpdateModuleChangeJSON, AptosWriteOrUpdateModuleChangeInput } from '../types/AptosWriteOrUpdateModuleChange';
import { AptosWriteResourceChange, AptosWriteResourceChangeJSON, AptosWriteResourceChangeInput } from '../types/AptosWriteResourceChange';
import { AptosWriteTableChangeSetChange, AptosWriteTableChangeSetChangeJSON, AptosWriteTableChangeSetChangeInput } from '../types/AptosWriteTableChangeSetChange';

// $ref: #/components/schemas/GenesisTransaction/properties/changes/items
// typeName: GenesisTransaction_changes_Item
// unionType: anyOf

export type AptosGenesisTransactionChangesItemJSON = AptosDeleteModuleChangeJSON | AptosDeleteResourceChangeJSON | AptosDeleteTableItemChangeJSON | AptosWriteOrUpdateModuleChangeJSON | AptosWriteResourceChangeJSON | AptosWriteTableChangeSetChangeJSON;
export type AptosGenesisTransactionChangesItemInput = AptosDeleteModuleChangeInput | AptosDeleteResourceChangeInput | AptosDeleteTableItemChangeInput | AptosWriteOrUpdateModuleChangeInput | AptosWriteResourceChangeInput | AptosWriteTableChangeSetChangeInput;
export type AptosGenesisTransactionChangesItemValue = AptosDeleteModuleChange | AptosDeleteResourceChange | AptosDeleteTableItemChange | AptosWriteOrUpdateModuleChange | AptosWriteResourceChange | AptosWriteTableChangeSetChange;

export abstract class AptosGenesisTransactionChangesItem {
  public static create(input: AptosGenesisTransactionChangesItemInput): AptosGenesisTransactionChangesItemValue {
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
    throw new Error('Cannot resolve union for input');
  }

  public static fromJSON(json: AptosGenesisTransactionChangesItemJSON): AptosGenesisTransactionChangesItemValue {
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
    throw new Error(`Cannot resolve union for AptosGenesisTransactionChangesItem (keys: ${keys}, type: ${type})`);
  }
}
