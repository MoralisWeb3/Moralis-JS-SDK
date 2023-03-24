import Core, {
  MoralisDataObject,
  MoralisDataObjectValue,
  CoreErrorCode,
  CoreError,
  maybe,
  BigNumber,
  dateInputToDate,
  CoreProvider,
} from '@moralisweb3/common-core';
import { EvmAddress } from '../EvmAddress';
import { EvmChain } from '../EvmChain';
import { EvmNftMedia } from '../EvmNftMedia';
import { EvmNftData, EvmNftInput } from './types';

/**
 * Valid input for a new EvmNft instance.
 * This can be an existing {@link EvmNft} or a valid {@link EvmNftInput} object
 */
export type EvmNftish = EvmNftInput | EvmNft;

/**
 * The EvmNft class is a MoralisData that references to a the NFT of the type; Erc721 or Erc1155
 *
 * @category DataType
 */
export class EvmNft implements MoralisDataObject {
  /**
   * Create a new instance of EvmNft from any valid address input
   *
   * @param data - the EvmNftish type
   * @param core - the Core instance
   * @example
   * ```ts
   * const nft = EvmNft.create(data);
   * ```
   * @returns an instance of EvmNft
   */
  static create(data: EvmNftish, core?: Core) {
    if (data instanceof EvmNft) {
      return data;
    }
    const finalCore = core ?? CoreProvider.getDefault();
    return new EvmNft(data, finalCore);
  }

  private _data: EvmNftData;

  constructor(data: EvmNftInput, core: Core) {
    this._data = EvmNft.parse(data, core);
  }

  static parse = (data: EvmNftInput, core: Core): EvmNftData => ({
    ...data,
    chain: EvmChain.create(data.chain, core),
    contractType: maybe(data.contractType),
    tokenAddress: EvmAddress.create(data.tokenAddress, core),
    metadata: maybe(data.metadata, this.validateMetadata),
    tokenUri: maybe(data.tokenUri),
    tokenHash: maybe(data.tokenHash),
    name: maybe(data.name),
    symbol: maybe(data.symbol),
    ownerOf: maybe(data.ownerOf, (ownerOf) => EvmAddress.create(ownerOf, core)),
    blockNumberMinted: maybe(data.blockNumberMinted, BigNumber.create),
    blockNumber: maybe(data.blockNumber, BigNumber.create),
    lastMetadataSync: maybe(data.lastMetadataSync, dateInputToDate),
    lastTokenUriSync: maybe(data.lastTokenUriSync, dateInputToDate),
    amount: maybe(data.amount, (value) => +value),
    media: maybe(data.media, (value) => EvmNftMedia.create(value, core)),
  });

  /**
   * This function confirms that the NFT metadata is a valid JSON string.
   *
   * @param value - the new value for the NFT metadata
   * @returns the parsed value of the JSON string
   * @throws {CoreError} if the value is not a valid JSON string
   */
  private static validateMetadata = (value: string): MoralisDataObjectValue => {
    try {
      return JSON.parse(value);
    } catch (error) {
      throw new CoreError({
        code: CoreErrorCode.INVALID_ARGUMENT,
        message: 'Invalid metadata provided, cannot parse the value to JSON',
      });
    }
  };

  // TODO: refactor to reduce complexity
  /**
   * Compares two EvmNftish data. verifies that the chain, tokenAddress and owner of values are equal.
   * @param valueA - the first EvmNftish data to compare
   * @param valueB - the second EvmNftish data to compare
   * @returns true if the values are equal, false otherwise
   * @example
   * ```ts
   *  EvmNft.equals(valueA, valueB);
   * ```
   */
  // eslint-disable-next-line complexity
  static equals(valueA: EvmNftish, valueB: EvmNftish) {
    const nftA = EvmNft.create(valueA);
    const nftB = EvmNft.create(valueB);

    if (!nftA._data.chain.equals(nftB._data.chain)) {
      return false;
    }

    if (!nftA._data.tokenAddress.equals(nftB._data.tokenAddress)) {
      return false;
    }

    // Owners are different between tokens
    if (nftA._data.ownerOf && nftB._data.ownerOf && !nftA._data.ownerOf.equals(nftB._data.ownerOf)) {
      return false;
    }

    // Owner is defined in only one token
    if ((nftA._data.ownerOf && !nftB._data.ownerOf) || (!nftA._data.ownerOf && nftB._data.ownerOf)) {
      return false;
    }

    return true;
  }

  /**
   * Compares an EvmNftish data to this EvmNft instance.
   * @param value - the value to compare
   * @returns true if the value is equal to the current instance, false otherwise
   * @example
   * ```ts
   * nft.equals(value);
   * ```
   */
  equals(value: EvmNftish): boolean {
    return EvmNft.equals(this, value);
  }

  /**
   * Converts the EvmNft instance to a JSON object.
   * @returns JSON object of the EvmNft instance
   * @example `nft.toJSON()`
   */
  toJSON() {
    const data = this._data;
    return {
      ...data,
      tokenAddress: data.tokenAddress.format(),
      chain: data.chain.format(),
      ownerOf: data.ownerOf?.format(),
      blockNumberMinted: data.blockNumberMinted?.toString(),
      blockNumber: data.blockNumber?.toString(),
      media: data.media?.format(),
    };
  }

  /**
   * Converts the EvmNft instance to a JSON object.
   * @returns JSON object of the EvmNft instance
   * @example `nft.format()`
   */
  format() {
    return this.toJSON();
  }

  get result(): EvmNftData {
    return this._data;
  }

  /**
   * @returns the NFT chain
   * @example
   * ```
   * nft.chain // EvmChain
   * ```
   */
  get chain() {
    return this._data.chain;
  }

  /**
   * @returns the NFT contract type
   * @example
   * ```
   * nft.contractType // "ERC721" | "ERC1155"
   * ```
   */
  get contractType() {
    return this._data.contractType;
  }

  /**
   * @returns the NFT token address
   * @example
   * ```
   * nft.tokenAddress // EvmAddress
   * ```
   */
  get tokenAddress() {
    return this._data.tokenAddress;
  }

  /**
   * @returns the NFT metadata
   * @example
   * ```ts
   * nft.metadata
   * // {
   * // name: 'Pancake',
   * // description: 'The dessert series 1',
   * // image: 'ipfs://QmNQFXCZ6LGzvpMW9Q5PWbCrEnLknQrPwr2r8pbQAgzQ9A/4863BD6B-6C92-4B96-BF80-8020B2F7C3A5.jpeg',
   * // }
   * ```
   */
  get metadata() {
    return this._data.metadata;
  }

  /**
   * @returns the NFT token URI
   * @example
   * ```
   * nft.tokenUri // "https://gateway.moralisipfs.com/ipfs/QmajSqgxY3cWBgBeRm38vasJAcTit1kp5EwqVHxszJYgUC/728.json"
   * ```
   */
  get tokenUri() {
    return this._data.tokenUri;
  }

  /**
   * @returns the NFT token hash
   * @example
   * ```
   * nft.tokenHash // "QmajSqgxY3cWBgBeRm38vasJAcTit1kp5EwqVHxszJYgUC"
   * ```
   */
  get tokenHash() {
    return this._data.tokenHash;
  }

  /**
   * @returns the NFT name
   * @example
   * ```
   * nft.name // "Tether USD"
   * ```
   */
  get name() {
    return this._data.name;
  }

  /**
   * @returns the NFT symbol
   * @example
   * ```
   * nft.symbol // "USDT"
   * ```
   */
  get symbol() {
    return this._data.symbol;
  }

  /**
   * @returns the NFT owner of address
   * @example
   * ```
   * nft.ownerOf // EvmAddress
   * ```
   */
  get ownerOf() {
    return this._data.ownerOf;
  }

  /**
   * @returns the NFT block number minted from
   * @example
   * ```
   * nft.blockNumberMinted // BigNumber
   * ```
   */
  get blockNumberMinted() {
    return this._data.blockNumberMinted;
  }

  /**
   * @returns the NFT block number
   * @example
   * ```
   * nft.blockNumber // BigNumber
   * ```
   */
  get blockNumber() {
    return this._data.blockNumber;
  }

  /**
   * @returns the NFT latest metadata sync date
   * @example
   * ```
   * nft.latestMetadataSync // Date
   * ```
   */
  get lastMetadataSync() {
    return this._data.lastMetadataSync;
  }

  /**
   * @returns the NFT latest token URI sync date
   * @example
   * ```
   * nft.latestTokenUriSync // Date
   * ```
   */
  get lastTokenUriSync() {
    return this._data.lastTokenUriSync;
  }

  /**
   * @returns the NFT amount
   * @example
   * ```
   * nft.amount // 2
   * ```
   */
  get amount() {
    return this._data.amount;
  }

  /**
   * @returns the token id
   * @example
   * ```
   * nft.tokenId // '1234'
   * ```
   */
  get tokenId() {
    return this._data.tokenId;
  }

  /**
   * @returns the processed media of the NFT
   * @example
   * ```
   * nft.media // EvmNftMedia
   * ```
   */
  get media() {
    return this._data.media;
  }

  /**
   * @returns possibility of the token being a spam token
   * @example transfer.possibleSpam // true
   */
  get possibleSpam() {
    return this._data.possibleSpam;
  }
}
