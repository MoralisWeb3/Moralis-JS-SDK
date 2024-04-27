// $ref: #/components/schemas/ETransactionCategory
// typeName: ETransactionCategory

export type EvmETransactionCategoryJSON = "send" | "receive" | "token send" | "token receive" | "nft send" | "nft receive" | "token swap" | "deposit" | "withdraw" | "nft purchase" | "nft sale" | "airdrop" | "mint" | "burn" | "borrow" | "contract interaction";
export type EvmETransactionCategoryInput = "send" | "receive" | "token send" | "token receive" | "nft send" | "nft receive" | "token swap" | "deposit" | "withdraw" | "nft purchase" | "nft sale" | "airdrop" | "mint" | "burn" | "borrow" | "contract interaction";
export type EvmETransactionCategoryValue = "send" | "receive" | "token send" | "token receive" | "nft send" | "nft receive" | "token swap" | "deposit" | "withdraw" | "nft purchase" | "nft sale" | "airdrop" | "mint" | "burn" | "borrow" | "contract interaction";

export abstract class EvmETransactionCategory {
  public static create(input: EvmETransactionCategoryInput | EvmETransactionCategoryValue): EvmETransactionCategoryValue {
    return input;
  }

  public static fromJSON(json: EvmETransactionCategoryJSON): EvmETransactionCategoryValue {
    return json;
  }
}
