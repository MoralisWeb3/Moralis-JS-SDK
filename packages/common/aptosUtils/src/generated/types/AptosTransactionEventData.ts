// $ref: #/components/schemas/TransactionEvent/properties/data
// typeName: TransactionEvent_data

export type AptosTransactionEventDataJSON = object;
export type AptosTransactionEventDataInput = object;
export type AptosTransactionEventDataValue = object;

export abstract class AptosTransactionEventData {
  public static create(input: AptosTransactionEventDataInput | AptosTransactionEventDataValue): AptosTransactionEventDataValue {
    return input;
  }

  public static fromJSON(json: AptosTransactionEventDataJSON): AptosTransactionEventDataValue {
    return json;
  }
}
