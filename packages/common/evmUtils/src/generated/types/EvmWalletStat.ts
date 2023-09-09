import { EvmWalletStatTransactions, EvmWalletStatTransactionsInput, EvmWalletStatTransactionsJSON } from '../types/EvmWalletStatTransactions';
import { EvmWalletStatNftTransfers, EvmWalletStatNftTransfersInput, EvmWalletStatNftTransfersJSON } from '../types/EvmWalletStatNftTransfers';
import { EvmWalletStatTokenTransfers, EvmWalletStatTokenTransfersInput, EvmWalletStatTokenTransfersJSON } from '../types/EvmWalletStatTokenTransfers';

// $ref: #/components/schemas/walletStat
// type: walletStat
// properties:
// - nfts ($ref: #/components/schemas/walletStat/properties/nfts)
// - collections ($ref: #/components/schemas/walletStat/properties/collections)
// - transactions ($ref: #/components/schemas/walletStat/properties/transactions)
// - nft_transfers ($ref: #/components/schemas/walletStat/properties/nft_transfers)
// - token_transfers ($ref: #/components/schemas/walletStat/properties/token_transfers)

export interface EvmWalletStatJSON {
  readonly nfts: string;
  readonly collections: string;
  readonly transactions: EvmWalletStatTransactionsJSON;
  readonly nft_transfers: EvmWalletStatNftTransfersJSON;
  readonly token_transfers: EvmWalletStatTokenTransfersJSON;
}

export interface EvmWalletStatInput {
  readonly nfts: string;
  readonly collections: string;
  readonly transactions: EvmWalletStatTransactionsInput | EvmWalletStatTransactions;
  readonly nftTransfers: EvmWalletStatNftTransfersInput | EvmWalletStatNftTransfers;
  readonly tokenTransfers: EvmWalletStatTokenTransfersInput | EvmWalletStatTokenTransfers;
}

export class EvmWalletStat {
  public static create(input: EvmWalletStatInput | EvmWalletStat): EvmWalletStat {
    if (input instanceof EvmWalletStat) {
      return input;
    }
    return new EvmWalletStat(input);
  }

  public static fromJSON(json: EvmWalletStatJSON): EvmWalletStat {
    const input: EvmWalletStatInput = {
      nfts: json.nfts,
      collections: json.collections,
      transactions: EvmWalletStatTransactions.fromJSON(json.transactions),
      nftTransfers: EvmWalletStatNftTransfers.fromJSON(json.nft_transfers),
      tokenTransfers: EvmWalletStatTokenTransfers.fromJSON(json.token_transfers),
    };
    return EvmWalletStat.create(input);
  }

  /**
   * @description The number of NFTs owned by a wallet
   */
  public readonly nfts: string;
  /**
   * @description The number of unique NFT collections owned by a wallet
   */
  public readonly collections: string;
  /**
   * @description Transaction stats
   */
  public readonly transactions: EvmWalletStatTransactions;
  /**
   * @description NFT transfer stats
   */
  public readonly nftTransfers: EvmWalletStatNftTransfers;
  /**
   * @description Token transfer stats
   */
  public readonly tokenTransfers: EvmWalletStatTokenTransfers;

  private constructor(input: EvmWalletStatInput) {
    this.nfts = input.nfts;
    this.collections = input.collections;
    this.transactions = EvmWalletStatTransactions.create(input.transactions);
    this.nftTransfers = EvmWalletStatNftTransfers.create(input.nftTransfers);
    this.tokenTransfers = EvmWalletStatTokenTransfers.create(input.tokenTransfers);
  }

  public toJSON(): EvmWalletStatJSON {
    return {
      nfts: this.nfts,
      collections: this.collections,
      transactions: this.transactions.toJSON(),
      nft_transfers: this.nftTransfers.toJSON(),
      token_transfers: this.tokenTransfers.toJSON(),
    }
  }
}
