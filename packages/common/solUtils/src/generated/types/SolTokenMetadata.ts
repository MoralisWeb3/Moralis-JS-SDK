import { SolMetaplexToken, SolMetaplexTokenInput, SolMetaplexTokenJSON } from '../types/SolMetaplexToken';

// $ref: #/components/schemas/TokenMetadata
// type: TokenMetadata
// properties:
// - mint ($ref: #/components/schemas/TokenMetadata/properties/mint)
// - standard ($ref: #/components/schemas/TokenMetadata/properties/standard)
// - name ($ref: #/components/schemas/TokenMetadata/properties/name)
// - symbol ($ref: #/components/schemas/TokenMetadata/properties/symbol)
// - metaplex ($ref: #/components/schemas/MetaplexToken)

export interface SolTokenMetadataJSON {
  readonly mint: string;
  readonly standard: string;
  readonly name: string;
  readonly symbol: string;
  readonly metaplex: SolMetaplexTokenJSON;
}

export interface SolTokenMetadataInput {
  readonly mint: string;
  readonly standard: string;
  readonly name: string;
  readonly symbol: string;
  readonly metaplex: SolMetaplexTokenInput | SolMetaplexToken;
}

export class SolTokenMetadata {
  public static create(input: SolTokenMetadataInput | SolTokenMetadata): SolTokenMetadata {
    if (input instanceof SolTokenMetadata) {
      return input;
    }
    return new SolTokenMetadata(input);
  }

  public static fromJSON(json: SolTokenMetadataJSON): SolTokenMetadata {
    const input: SolTokenMetadataInput = {
      mint: json.mint,
      standard: json.standard,
      name: json.name,
      symbol: json.symbol,
      metaplex: SolMetaplexToken.fromJSON(json.metaplex),
    };
    return SolTokenMetadata.create(input);
  }

  public readonly mint: string;
  public readonly standard: string;
  public readonly name: string;
  public readonly symbol: string;
  public readonly metaplex: SolMetaplexToken;

  private constructor(input: SolTokenMetadataInput) {
    this.mint = input.mint;
    this.standard = input.standard;
    this.name = input.name;
    this.symbol = input.symbol;
    this.metaplex = SolMetaplexToken.create(input.metaplex);
  }

  public toJSON(): SolTokenMetadataJSON {
    return {
      mint: this.mint,
      standard: this.standard,
      name: this.name,
      symbol: this.symbol,
      metaplex: this.metaplex.toJSON(),
    }
  }
}
