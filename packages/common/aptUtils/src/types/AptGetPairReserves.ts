// $ref: #/paths/~1{pair_address}~1reserves/get/responses/200/content/application~1json/schema

export interface AptGetPairReservesJSON {
  readonly reserve0?: string;
  readonly reserve1?: string;
}

export interface AptGetPairReservesInput {
  readonly reserve0?: string;
  readonly reserve1?: string;
}

export class AptGetPairReserves {
  public static create(input: AptGetPairReservesInput): AptGetPairReserves {
    return new AptGetPairReserves(input);
  }

  public static fromJSON(json: AptGetPairReservesJSON): AptGetPairReserves {
    const input: AptGetPairReservesInput = {
      reserve0: json.reserve0,
      reserve1: json.reserve1,
    };
    return AptGetPairReserves.create(input);
  }

  public readonly reserve0?: string;
  public readonly reserve1?: string;

  private constructor(input: AptGetPairReservesInput) {
    this.reserve0 = input.reserve0;
    this.reserve1 = input.reserve1;
  }

  public toJSON(): AptGetPairReservesJSON {
    return {
      reserve0: this.reserve0,
      reserve1: this.reserve1,
    };
  }
}
