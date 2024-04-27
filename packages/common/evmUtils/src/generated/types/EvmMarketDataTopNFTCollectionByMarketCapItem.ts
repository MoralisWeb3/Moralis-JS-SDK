import { EvmAddress, EvmAddressInput, EvmAddressJSON } from '../../dataTypes';

// $ref: #/components/schemas/marketDataTopNFTCollectionByMarketCap/items
// type: marketDataTopNFTCollectionByMarketCap_Item
// properties:
// - rank ($ref: #/components/schemas/marketDataTopNFTCollectionByMarketCap/items/properties/rank)
// - collection_title ($ref: #/components/schemas/marketDataTopNFTCollectionByMarketCap/items/properties/collection_title)
// - collection_image ($ref: #/components/schemas/marketDataTopNFTCollectionByMarketCap/items/properties/collection_image)
// - floor_price_usd ($ref: #/components/schemas/marketDataTopNFTCollectionByMarketCap/items/properties/floor_price_usd)
// - floor_price_24hr_percent_change ($ref: #/components/schemas/marketDataTopNFTCollectionByMarketCap/items/properties/floor_price_24hr_percent_change)
// - market_cap_usd ($ref: #/components/schemas/marketDataTopNFTCollectionByMarketCap/items/properties/market_cap_usd)
// - market_cap_24hr_percent_change ($ref: #/components/schemas/marketDataTopNFTCollectionByMarketCap/items/properties/market_cap_24hr_percent_change)
// - volume_usd ($ref: #/components/schemas/marketDataTopNFTCollectionByMarketCap/items/properties/volume_usd)
// - volume_24hr_percent_change ($ref: #/components/schemas/marketDataTopNFTCollectionByMarketCap/items/properties/volume_24hr_percent_change)
// - collection_address ($ref: #/components/schemas/marketDataTopNFTCollectionByMarketCap/items/properties/collection_address)
// - floor_price ($ref: #/components/schemas/marketDataTopNFTCollectionByMarketCap/items/properties/floor_price)
// - floor_price_usd_24hr_percent_change ($ref: #/components/schemas/marketDataTopNFTCollectionByMarketCap/items/properties/floor_price_usd_24hr_percent_change)

export interface EvmMarketDataTopNFTCollectionByMarketCapItemJSON {
  readonly rank: number;
  readonly collection_title: string;
  readonly collection_image: string;
  readonly floor_price_usd: string;
  readonly floor_price_24hr_percent_change: string;
  readonly market_cap_usd: string;
  readonly market_cap_24hr_percent_change: string;
  readonly volume_usd: string;
  readonly volume_24hr_percent_change: string;
  readonly collection_address: EvmAddressJSON;
  readonly floor_price?: string;
  readonly floor_price_usd_24hr_percent_change?: string;
}

export interface EvmMarketDataTopNFTCollectionByMarketCapItemInput {
  readonly rank: number;
  readonly collectionTitle: string;
  readonly collectionImage: string;
  readonly floorPriceUsd: string;
  readonly floorPrice24hrPercentChange: string;
  readonly marketCapUsd: string;
  readonly marketCap24hrPercentChange: string;
  readonly volumeUsd: string;
  readonly volume24hrPercentChange: string;
  readonly collectionAddress: EvmAddressInput | EvmAddress;
  readonly floorPrice?: string;
  readonly floorPriceUsd24hrPercentChange?: string;
}

export class EvmMarketDataTopNFTCollectionByMarketCapItem {
  public static create(input: EvmMarketDataTopNFTCollectionByMarketCapItemInput | EvmMarketDataTopNFTCollectionByMarketCapItem): EvmMarketDataTopNFTCollectionByMarketCapItem {
    if (input instanceof EvmMarketDataTopNFTCollectionByMarketCapItem) {
      return input;
    }
    return new EvmMarketDataTopNFTCollectionByMarketCapItem(input);
  }

  public static fromJSON(json: EvmMarketDataTopNFTCollectionByMarketCapItemJSON): EvmMarketDataTopNFTCollectionByMarketCapItem {
    const input: EvmMarketDataTopNFTCollectionByMarketCapItemInput = {
      rank: json.rank,
      collectionTitle: json.collection_title,
      collectionImage: json.collection_image,
      floorPriceUsd: json.floor_price_usd,
      floorPrice24hrPercentChange: json.floor_price_24hr_percent_change,
      marketCapUsd: json.market_cap_usd,
      marketCap24hrPercentChange: json.market_cap_24hr_percent_change,
      volumeUsd: json.volume_usd,
      volume24hrPercentChange: json.volume_24hr_percent_change,
      collectionAddress: EvmAddress.fromJSON(json.collection_address),
      floorPrice: json.floor_price,
      floorPriceUsd24hrPercentChange: json.floor_price_usd_24hr_percent_change,
    };
    return EvmMarketDataTopNFTCollectionByMarketCapItem.create(input);
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
   * @description The market cap in USD
   */
  public readonly marketCapUsd: string;
  /**
   * @description The market cap 24hr percent change
   */
  public readonly marketCap24hrPercentChange: string;
  /**
   * @description The volume in USD
   */
  public readonly volumeUsd: string;
  /**
   * @description The volume 24hr percent change
   */
  public readonly volume24hrPercentChange: string;
  /**
   * @description The collection address
   */
  public readonly collectionAddress: EvmAddress;
  /**
   * @description The floor price
   */
  public readonly floorPrice?: string;
  /**
   * @description The floor price usd 24hr percent change
   */
  public readonly floorPriceUsd24hrPercentChange?: string;

  private constructor(input: EvmMarketDataTopNFTCollectionByMarketCapItemInput) {
    this.rank = input.rank;
    this.collectionTitle = input.collectionTitle;
    this.collectionImage = input.collectionImage;
    this.floorPriceUsd = input.floorPriceUsd;
    this.floorPrice24hrPercentChange = input.floorPrice24hrPercentChange;
    this.marketCapUsd = input.marketCapUsd;
    this.marketCap24hrPercentChange = input.marketCap24hrPercentChange;
    this.volumeUsd = input.volumeUsd;
    this.volume24hrPercentChange = input.volume24hrPercentChange;
    this.collectionAddress = EvmAddress.create(input.collectionAddress);
    this.floorPrice = input.floorPrice;
    this.floorPriceUsd24hrPercentChange = input.floorPriceUsd24hrPercentChange;
  }

  public toJSON(): EvmMarketDataTopNFTCollectionByMarketCapItemJSON {
    return {
      rank: this.rank,
      collection_title: this.collectionTitle,
      collection_image: this.collectionImage,
      floor_price_usd: this.floorPriceUsd,
      floor_price_24hr_percent_change: this.floorPrice24hrPercentChange,
      market_cap_usd: this.marketCapUsd,
      market_cap_24hr_percent_change: this.marketCap24hrPercentChange,
      volume_usd: this.volumeUsd,
      volume_24hr_percent_change: this.volume24hrPercentChange,
      collection_address: this.collectionAddress.toJSON(),
      floor_price: this.floorPrice,
      floor_price_usd_24hr_percent_change: this.floorPriceUsd24hrPercentChange,
    }
  }
}
