// $ref: #/components/schemas/reservesCollection/properties/token0

export interface AptReservesCollectionToken0JSON {
  readonly address?: string;
  readonly name?: string;
  readonly symbol?: string;
  readonly decimals?: string;
  readonly logo?: string;
  readonly logo_hash?: string;
  readonly thumbnail?: string;
  readonly block_number?: string;
  readonly validated?: number;
  readonly created_at?: string;
}

export interface AptReservesCollectionToken0Input {
  readonly address?: string;
  readonly name?: string;
  readonly symbol?: string;
  readonly decimals?: string;
  readonly logo?: string;
  readonly logoHash?: string;
  readonly thumbnail?: string;
  readonly blockNumber?: string;
  readonly validated?: number;
  readonly createdAt?: string;
}

export class AptReservesCollectionToken0 {
  public static create(input: AptReservesCollectionToken0Input): AptReservesCollectionToken0 {
    return new AptReservesCollectionToken0(input);
  }

  public static fromJSON(json: AptReservesCollectionToken0JSON): AptReservesCollectionToken0 {
    const input: AptReservesCollectionToken0Input = {
      address: json.address,
      name: json.name,
      symbol: json.symbol,
      decimals: json.decimals,
      logo: json.logo,
      logoHash: json.logo_hash,
      thumbnail: json.thumbnail,
      blockNumber: json.block_number,
      validated: json.validated,
      createdAt: json.created_at,
    };
    return AptReservesCollectionToken0.create(input);
  }

  public readonly address?: string;
  public readonly name?: string;
  public readonly symbol?: string;
  public readonly decimals?: string;
  public readonly logo?: string;
  public readonly logoHash?: string;
  public readonly thumbnail?: string;
  public readonly blockNumber?: string;
  public readonly validated?: number;
  public readonly createdAt?: string;

  private constructor(input: AptReservesCollectionToken0Input) {
    this.address = input.address;
    this.name = input.name;
    this.symbol = input.symbol;
    this.decimals = input.decimals;
    this.logo = input.logo;
    this.logoHash = input.logoHash;
    this.thumbnail = input.thumbnail;
    this.blockNumber = input.blockNumber;
    this.validated = input.validated;
    this.createdAt = input.createdAt;
  }

  public toJSON(): AptReservesCollectionToken0JSON {
    return {
      address: this.address,
      name: this.name,
      symbol: this.symbol,
      decimals: this.decimals,
      logo: this.logo,
      logo_hash: this.logoHash,
      thumbnail: this.thumbnail,
      block_number: this.blockNumber,
      validated: this.validated,
      created_at: this.createdAt,
    };
  }
}
