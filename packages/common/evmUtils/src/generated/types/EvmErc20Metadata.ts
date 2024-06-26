import { EvmAddress, EvmAddressInput, EvmAddressJSON } from '../../dataTypes';
import { BigNumber, BigNumberInput, BigNumberJSON } from '@moralisweb3/common-core';
import { EvmErc20MetadataLinks, EvmErc20MetadataLinksValue, EvmErc20MetadataLinksInput, EvmErc20MetadataLinksJSON } from '../types/EvmErc20MetadataLinks';

// $ref: #/components/schemas/erc20Metadata
// type: erc20Metadata
// properties:
// - address ($ref: #/components/schemas/erc20Metadata/properties/address)
// - address_label ($ref: #/components/schemas/erc20Metadata/properties/address_label)
// - name ($ref: #/components/schemas/erc20Metadata/properties/name)
// - symbol ($ref: #/components/schemas/erc20Metadata/properties/symbol)
// - decimals ($ref: #/components/schemas/erc20Metadata/properties/decimals)
// - logo ($ref: #/components/schemas/erc20Metadata/properties/logo)
// - logo_hash ($ref: #/components/schemas/erc20Metadata/properties/logo_hash)
// - thumbnail ($ref: #/components/schemas/erc20Metadata/properties/thumbnail)
// - total_supply ($ref: #/components/schemas/erc20Metadata/properties/total_supply)
// - total_supply_formatted ($ref: #/components/schemas/erc20Metadata/properties/total_supply_formatted)
// - fully_diluted_valuation ($ref: #/components/schemas/erc20Metadata/properties/fully_diluted_valuation)
// - block_number ($ref: #/components/schemas/erc20Metadata/properties/block_number)
// - validated ($ref: #/components/schemas/erc20Metadata/properties/validated)
// - created_at ($ref: #/components/schemas/erc20Metadata/properties/created_at)
// - possible_spam ($ref: #/components/schemas/erc20Metadata/properties/possible_spam)
// - verified_contract ($ref: #/components/schemas/erc20Metadata/properties/verified_contract)
// - categories ($ref: #/components/schemas/erc20Metadata/properties/categories)
// - links ($ref: #/components/schemas/erc20Metadata/properties/links)

export interface EvmErc20MetadataJSON {
  readonly address: EvmAddressJSON;
  readonly address_label?: string;
  readonly name: string;
  readonly symbol: string;
  readonly decimals: string;
  readonly logo?: string;
  readonly logo_hash?: string;
  readonly thumbnail?: string;
  readonly total_supply?: string;
  readonly total_supply_formatted?: string;
  readonly fully_diluted_valuation?: string;
  readonly block_number?: BigNumberJSON;
  readonly validated?: number;
  readonly created_at: string;
  readonly possible_spam: boolean;
  readonly verified_contract?: boolean;
  readonly categories?: string[];
  readonly links?: EvmErc20MetadataLinksJSON;
}

export interface EvmErc20MetadataInput {
  readonly address: EvmAddressInput | EvmAddress;
  readonly addressLabel?: string;
  readonly name: string;
  readonly symbol: string;
  readonly decimals: number;
  readonly logo?: string;
  readonly logoHash?: string;
  readonly thumbnail?: string;
  readonly totalSupply?: string;
  readonly totalSupplyFormatted?: string;
  readonly fullyDilutedValuation?: string;
  readonly blockNumber?: BigNumberInput | BigNumber;
  readonly validated?: number;
  readonly createdAt: string;
  readonly possibleSpam: boolean;
  readonly verifiedContract?: boolean;
  readonly categories?: string[];
  readonly links?: EvmErc20MetadataLinksInput | EvmErc20MetadataLinksValue;
}

export class EvmErc20Metadata {
  public static create(input: EvmErc20MetadataInput | EvmErc20Metadata): EvmErc20Metadata {
    if (input instanceof EvmErc20Metadata) {
      return input;
    }
    return new EvmErc20Metadata(input);
  }

  public static fromJSON(json: EvmErc20MetadataJSON): EvmErc20Metadata {
    const input: EvmErc20MetadataInput = {
      address: EvmAddress.fromJSON(json.address),
      addressLabel: json.address_label,
      name: json.name,
      symbol: json.symbol,
      decimals: Number(json.decimals),
      logo: json.logo,
      logoHash: json.logo_hash,
      thumbnail: json.thumbnail,
      totalSupply: json.total_supply,
      totalSupplyFormatted: json.total_supply_formatted,
      fullyDilutedValuation: json.fully_diluted_valuation,
      blockNumber: json.block_number ? BigNumber.fromJSON(json.block_number) : undefined,
      validated: json.validated,
      createdAt: json.created_at,
      possibleSpam: json.possible_spam,
      verifiedContract: json.verified_contract,
      categories: json.categories,
      links: json.links ? EvmErc20MetadataLinks.fromJSON(json.links) : undefined,
    };
    return EvmErc20Metadata.create(input);
  }

  /**
   * @description The address of the token contract
   */
  public readonly address: EvmAddress;
  /**
   * @description The label of the address
   */
  public readonly addressLabel?: string;
  /**
   * @description The name of the token contract
   */
  public readonly name: string;
  /**
   * @description The symbol of the NFT contract
   */
  public readonly symbol: string;
  /**
   * @description The number of decimals on the token
   */
  public readonly decimals: number;
  /**
   * @description The logo of the token
   */
  public readonly logo?: string;
  /**
   * @description The logo hash
   */
  public readonly logoHash?: string;
  /**
   * @description The thumbnail of the logo
   */
  public readonly thumbnail?: string;
  /**
   * @description Total tokens created minus any that have been burned
   */
  public readonly totalSupply?: string;
  /**
   * @description Total tokens created minus any that have been burned (decimal formatted)
   */
  public readonly totalSupplyFormatted?: string;
  /**
   * @description Fully Diluted Valuation (FDV), this represents the token's Current Price x Total Supply
   */
  public readonly fullyDilutedValuation?: string;
  public readonly blockNumber?: BigNumber;
  public readonly validated?: number;
  /**
   * @description The timestamp of when the erc20 token was created
   */
  public readonly createdAt: string;
  /**
   * @description Indicates if a contract is possibly a spam contract
   */
  public readonly possibleSpam: boolean;
  /**
   * @description Indicates if a contract is verified
   */
  public readonly verifiedContract?: boolean;
  /**
   * @description Categories of the token
   */
  public readonly categories?: string[];
  /**
   * @description Social links of the token
   */
  public readonly links?: EvmErc20MetadataLinksValue;

  private constructor(input: EvmErc20MetadataInput) {
    this.address = EvmAddress.create(input.address);
    this.addressLabel = input.addressLabel;
    this.name = input.name;
    this.symbol = input.symbol;
    this.decimals = input.decimals;
    this.logo = input.logo;
    this.logoHash = input.logoHash;
    this.thumbnail = input.thumbnail;
    this.totalSupply = input.totalSupply;
    this.totalSupplyFormatted = input.totalSupplyFormatted;
    this.fullyDilutedValuation = input.fullyDilutedValuation;
    this.blockNumber = input.blockNumber ? BigNumber.create(input.blockNumber) : undefined;
    this.validated = input.validated;
    this.createdAt = input.createdAt;
    this.possibleSpam = input.possibleSpam;
    this.verifiedContract = input.verifiedContract;
    this.categories = input.categories;
    this.links = input.links ? EvmErc20MetadataLinks.create(input.links) : undefined;
  }

  public toJSON(): EvmErc20MetadataJSON {
    return {
      address: this.address.toJSON(),
      address_label: this.addressLabel,
      name: this.name,
      symbol: this.symbol,
      decimals: String(this.decimals),
      logo: this.logo,
      logo_hash: this.logoHash,
      thumbnail: this.thumbnail,
      total_supply: this.totalSupply,
      total_supply_formatted: this.totalSupplyFormatted,
      fully_diluted_valuation: this.fullyDilutedValuation,
      block_number: this.blockNumber ? this.blockNumber.toJSON() : undefined,
      validated: this.validated,
      created_at: this.createdAt,
      possible_spam: this.possibleSpam,
      verified_contract: this.verifiedContract,
      categories: this.categories,
      links: this.links ? this.links : undefined,
    }
  }
}
