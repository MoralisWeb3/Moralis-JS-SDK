export interface Update<Doc = Document> {
  collectionName: string;
  document: Doc;
}

export interface Document {
  id: string;
  confirmed: boolean;
}

export interface TriggerItem {
  name: string;
  value: TriggerItemValue;
}

export type TriggerItemValue = string | number | boolean | TriggerItemValue[];
