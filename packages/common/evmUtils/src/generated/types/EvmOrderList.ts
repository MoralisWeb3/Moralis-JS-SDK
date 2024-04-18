// $ref: #/components/schemas/orderList
// typeName: orderList

export type EvmOrderListJSON = "ASC" | "DESC";
export type EvmOrderListInput = "ASC" | "DESC";
export type EvmOrderListValue = "ASC" | "DESC";

export abstract class EvmOrderList {
  public static create(input: EvmOrderListInput | EvmOrderListValue): EvmOrderListValue {
    return input;
  }

  public static fromJSON(json: EvmOrderListJSON): EvmOrderListValue {
    return json;
  }
}
