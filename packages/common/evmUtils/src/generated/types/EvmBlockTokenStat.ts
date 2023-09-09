import { EvmBlockTokenStatTransactions, EvmBlockTokenStatTransactionsInput, EvmBlockTokenStatTransactionsJSON } from '../types/EvmBlockTokenStatTransactions';
import { EvmBlockTokenStatNftTransfers, EvmBlockTokenStatNftTransfersInput, EvmBlockTokenStatNftTransfersJSON } from '../types/EvmBlockTokenStatNftTransfers';
import { EvmBlockTokenStatTokenTransfers, EvmBlockTokenStatTokenTransfersInput, EvmBlockTokenStatTokenTransfersJSON } from '../types/EvmBlockTokenStatTokenTransfers';

// $ref: #/components/schemas/blockTokenStat
// type: blockTokenStat
// properties:
// - transactions ($ref: #/components/schemas/blockTokenStat/properties/transactions)
// - nft_transfers ($ref: #/components/schemas/blockTokenStat/properties/nft_transfers)
// - token_transfers ($ref: #/components/schemas/blockTokenStat/properties/token_transfers)

export interface EvmBlockTokenStatJSON {
  readonly transactions: EvmBlockTokenStatTransactionsJSON;
  readonly nft_transfers: EvmBlockTokenStatNftTransfersJSON;
  readonly token_transfers: EvmBlockTokenStatTokenTransfersJSON;
}

export interface EvmBlockTokenStatInput {
  readonly transactions: EvmBlockTokenStatTransactionsInput | EvmBlockTokenStatTransactions;
  readonly nftTransfers: EvmBlockTokenStatNftTransfersInput | EvmBlockTokenStatNftTransfers;
  readonly tokenTransfers: EvmBlockTokenStatTokenTransfersInput | EvmBlockTokenStatTokenTransfers;
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
      tokenTransfers: EvmBlockTokenStatTokenTransfers.fromJSON(json.token_transfers),
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
  /**
   * @description Token transfer stats
   */
  public readonly tokenTransfers: EvmBlockTokenStatTokenTransfers;

  private constructor(input: EvmBlockTokenStatInput) {
    this.transactions = EvmBlockTokenStatTransactions.create(input.transactions);
    this.nftTransfers = EvmBlockTokenStatNftTransfers.create(input.nftTransfers);
    this.tokenTransfers = EvmBlockTokenStatTokenTransfers.create(input.tokenTransfers);
  }

  public toJSON(): EvmBlockTokenStatJSON {
    return {
      transactions: this.transactions.toJSON(),
      nft_transfers: this.nftTransfers.toJSON(),
      token_transfers: this.tokenTransfers.toJSON(),
    }
  }
}
