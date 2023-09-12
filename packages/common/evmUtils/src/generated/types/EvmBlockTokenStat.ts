import { EvmBlockTokenStatTransactions, EvmBlockTokenStatTransactionsInput, EvmBlockTokenStatTransactionsJSON } from '../types/EvmBlockTokenStatTransactions';
import { EvmBlockTokenStatNftTransfers, EvmBlockTokenStatNftTransfersInput, EvmBlockTokenStatNftTransfersJSON } from '../types/EvmBlockTokenStatNftTransfers';

// $ref: #/components/schemas/blockTokenStat
// type: blockTokenStat
// properties:
// - transactions ($ref: #/components/schemas/blockTokenStat/properties/transactions)
// - nft_transfers ($ref: #/components/schemas/blockTokenStat/properties/nft_transfers)

export interface EvmBlockTokenStatJSON {
  readonly transactions: EvmBlockTokenStatTransactionsJSON;
  readonly nft_transfers: EvmBlockTokenStatNftTransfersJSON;
}

export interface EvmBlockTokenStatInput {
  readonly transactions: EvmBlockTokenStatTransactionsInput | EvmBlockTokenStatTransactions;
  readonly nftTransfers: EvmBlockTokenStatNftTransfersInput | EvmBlockTokenStatNftTransfers;
}

export class EvmBlockTokenStat {
  public static create(input: EvmBlockTokenStatInput | EvmBlockTokenStat): EvmBlockTokenStat {
    if (input instanceof EvmBlockTokenStat) {
      return input;
    }
    return new EvmBlockTokenStat(input);
  }

  public static fromJSON(json: EvmBlockTokenStatJSON): EvmBlockTokenStat {
    const input: EvmBlockTokenStatInput = {
      transactions: EvmBlockTokenStatTransactions.fromJSON(json.transactions),
      nftTransfers: EvmBlockTokenStatNftTransfers.fromJSON(json.nft_transfers),
    };
    return EvmBlockTokenStat.create(input);
  }

  /**
   * @description Transaction stats
   */
  public readonly transactions: EvmBlockTokenStatTransactions;
  /**
   * @description NFT transfer stats
   */
  public readonly nftTransfers: EvmBlockTokenStatNftTransfers;

  private constructor(input: EvmBlockTokenStatInput) {
    this.transactions = EvmBlockTokenStatTransactions.create(input.transactions);
    this.nftTransfers = EvmBlockTokenStatNftTransfers.create(input.nftTransfers);
  }

  public toJSON(): EvmBlockTokenStatJSON {
    return {
      transactions: this.transactions.toJSON(),
      nft_transfers: this.nftTransfers.toJSON(),
    }
  }
}
