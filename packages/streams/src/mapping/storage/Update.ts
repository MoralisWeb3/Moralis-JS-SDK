export interface Update<Doc = Document> {
  collectionName: string;
  document: Doc;
}

export interface Document {
  id: string;
  confirmed: boolean;
}
