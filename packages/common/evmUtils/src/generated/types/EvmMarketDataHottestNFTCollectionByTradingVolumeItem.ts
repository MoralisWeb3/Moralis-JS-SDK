// $ref: #/components/schemas/marketDataHottestNFTCollectionByTradingVolume/items
// type: marketDataHottestNFTCollectionByTradingVolume_Item
// properties:
// - rank ($ref: #/components/schemas/marketDataHottestNFTCollectionByTradingVolume/items/properties/rank)
// - collection_title ($ref: #/components/schemas/marketDataHottestNFTCollectionByTradingVolume/items/properties/collection_title)
// - collection_image ($ref: #/components/schemas/marketDataHottestNFTCollectionByTradingVolume/items/properties/collection_image)
// - floor_price_usd ($ref: #/components/schemas/marketDataHottestNFTCollectionByTradingVolume/items/properties/floor_price_usd)
// - floor_price_24hr_percent_change ($ref: #/components/schemas/marketDataHottestNFTCollectionByTradingVolume/items/properties/floor_price_24hr_percent_change)
// - volume_usd ($ref: #/components/schemas/marketDataHottestNFTCollectionByTradingVolume/items/properties/volume_usd)
// - volume_24hr_percent_change ($ref: #/components/schemas/marketDataHottestNFTCollectionByTradingVolume/items/properties/volume_24hr_percent_change)
// - average_price_usd ($ref: #/components/schemas/marketDataHottestNFTCollectionByTradingVolume/items/properties/average_price_usd)
// - collection_address ($ref: #/components/schemas/marketDataHottestNFTCollectionByTradingVolume/items/properties/collection_address)

export interface EvmMarketDataHottestNFTCollectionByTradingVolumeItemJSON {
  readonly rank: number;
  readonly collection_title: string;
  readonly collection_image: string;
  readonly floor_price_usd: string;
  readonly floor_price_24hr_percent_change: string;
  readonly volume_usd: string;
  readonly volume_24hr_percent_change: string;
  readonly average_price_usd?: string;
  readonly collection_address: string;
}

export interface EvmMarketDataHottestNFTCollectionByTradingVolumeItemInput {
  readonly rank: number;
  readonly collectionTitle: string;
  readonly collectionImage: string;
  readonly floorPriceUsd: string;
  readonly floorPrice24hrPercentChange: string;
  readonly volumeUsd: string;
  readonly volume24hrPercentChange: string;
  readonly averagePriceUsd?: string;
  readonly collectionAddress: string;
}

export class EvmMarketDataHottestNFTCollectionByTradingVolumeItem {
  public static create(input: EvmMarketDataHottestNFTCollectionByTradingVolumeItemInput | EvmMarketDataHottestNFTCollectionByTradingVolumeItem): EvmMarketDataHottestNFTCollectionByTradingVolumeItem {
    if (input instanceof EvmMarketDataHottestNFTCollectionByTradingVolumeItem) {
      return input;
    }
    return new EvmMarketDataHottestNFTCollectionByTradingVolumeItem(input);
  }

  public static fromJSON(json: EvmMarketDataHottestNFTCollectionByTradingVolumeItemJSON): EvmMarketDataHottestNFTCollectionByTradingVolumeItem {
    const input: EvmMarketDataHottestNFTCollectionByTradingVolumeItemInput = {
      rank: json.rank,
      collectionTitle: json.collection_title,
      collectionImage: json.collection_image,
      floorPriceUsd: json.floor_price_usd,
      floorPrice24hrPercentChange: json.floor_price_24hr_percent_change,
      volumeUsd: json.volume_usd,
      volume24hrPercentChange: json.volume_24hr_percent_change,
      averagePriceUsd: json.average_price_usd,
      collectionAddress: json.collection_address,
    };
    return EvmMarketDataHottestNFTCollectionByTradingVolumeItem.create(input);
  }

  /**
   * @description The rank
   */
  public readonly rank: number;
  /**
   * @description The collection title
   */
  public readonly collectionTitle: string;
  /**
   * @description The collection image
   */
  public readonly collectionImage: string;
  /**
   * @description The floor price in USD
   */
  public readonly floorPriceUsd: string;
  /**
   * @description The floor price 24hr percent change
   */
  public readonly floorPrice24hrPercentChange: string;
  /**
   * @description The volume in USD
   */
  public readonly volumeUsd: string;
  /**
   * @description The volume 24hr percent change
   */
  public readonly volume24hrPercentChange: string;
  /**
   * @description The average price in USD
   */
  public readonly averagePriceUsd?: string;
  /**
   * @description The collection address
   */
  public readonly collectionAddress: string;

  private constructor(input: EvmMarketDataHottestNFTCollectionByTradingVolumeItemInput) {
    this.rank = input.rank;
    this.collectionTitle = input.collectionTitle;
    this.collectionImage = input.collectionImage;
    this.floorPriceUsd = input.floorPriceUsd;
    this.floorPrice24hrPercentChange = input.floorPrice24hrPercentChange;
    this.volumeUsd = input.volumeUsd;
    this.volume24hrPercentChange = input.volume24hrPercentChange;
    this.averagePriceUsd = input.averagePriceUsd;
    this.collectionAddress = input.collectionAddress;
  }

  public toJSON(): EvmMarketDataHottestNFTCollectionByTradingVolumeItemJSON {
    return {
      rank: this.rank,
      collection_title: this.collectionTitle,
      collection_image: this.collectionImage,
      floor_price_usd: this.floorPriceUsd,
      floor_price_24hr_percent_change: this.floorPrice24hrPercentChange,
      volume_usd: this.volumeUsd,
      volume_24hr_percent_change: this.volume24hrPercentChange,
      average_price_usd: this.averagePriceUsd,
      collection_address: this.collectionAddress,
    }
  }
}
