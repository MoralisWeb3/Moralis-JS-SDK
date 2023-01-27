import { AptReservesCollectionToken0, AptReservesCollectionToken0JSON } from '../types/AptReservesCollectionToken0';
import { AptReservesCollectionToken1, AptReservesCollectionToken1JSON } from '../types/AptReservesCollectionToken1';

// $ref: #/components/schemas/reservesCollection

export interface AptReservesCollectionJSON {
  readonly token0?: AptReservesCollectionToken0JSON;
  readonly token1?: AptReservesCollectionToken1JSON;
  readonly pairAddress?: string;
}

export interface AptReservesCollectionInput {
  readonly token0?: AptReservesCollectionToken0;
  readonly token1?: AptReservesCollectionToken1;
  readonly pairAddress?: string;
}

export class AptReservesCollection {
  public static create(input: AptReservesCollectionInput): AptReservesCollection {
    return new AptReservesCollection(input);
  }

  public static fromJSON(json: AptReservesCollectionJSON): AptReservesCollection {
    const input: AptReservesCollectionInput = {
      token0: json.token0 ? AptReservesCollectionToken0.fromJSON(json.token0) : undefined,
      token1: json.token1 ? AptReservesCollectionToken1.fromJSON(json.token1) : undefined,
      pairAddress: json.pairAddress,
    };
    return AptReservesCollection.create(input);
  }

  public readonly token0?: AptReservesCollectionToken0;
  public readonly token1?: AptReservesCollectionToken1;
  public readonly pairAddress?: string;

  private constructor(input: AptReservesCollectionInput) {
    this.token0 = input.token0;
    this.token1 = input.token1;
    this.pairAddress = input.pairAddress;
  }

  public toJSON(): AptReservesCollectionJSON {
    return {
      token0: this.token0 ? this.token0.toJSON() : undefined,
      token1: this.token1 ? this.token1.toJSON() : undefined,
      pairAddress: this.pairAddress,
    };
  }
}
