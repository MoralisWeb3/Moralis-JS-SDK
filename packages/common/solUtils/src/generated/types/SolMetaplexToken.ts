// $ref: #/components/schemas/MetaplexToken
// type: MetaplexToken
// properties:
// - metadataUri ($ref: #/components/schemas/MetaplexToken/properties/metadataUri)
// - masterEdition ($ref: #/components/schemas/MetaplexToken/properties/masterEdition)
// - isMutable ($ref: #/components/schemas/MetaplexToken/properties/isMutable)
// - primarySaleHappened ($ref: #/components/schemas/MetaplexToken/properties/primarySaleHappened)
// - sellerFeeBasisPoints ($ref: #/components/schemas/MetaplexToken/properties/sellerFeeBasisPoints)
// - updateAuthority ($ref: #/components/schemas/MetaplexToken/properties/updateAuthority)

export interface SolMetaplexTokenJSON {
  readonly metadataUri: string;
  readonly masterEdition: boolean;
  readonly isMutable: boolean;
  readonly primarySaleHappened: number;
  readonly sellerFeeBasisPoints: number;
  readonly updateAuthority: string;
}

export interface SolMetaplexTokenInput {
  readonly metadataUri: string;
  readonly masterEdition: boolean;
  readonly isMutable: boolean;
  readonly primarySaleHappened: number;
  readonly sellerFeeBasisPoints: number;
  readonly updateAuthority: string;
}

export class SolMetaplexToken {
  public static create(input: SolMetaplexTokenInput | SolMetaplexToken): SolMetaplexToken {
    if (input instanceof SolMetaplexToken) {
      return input;
    }
    return new SolMetaplexToken(input);
  }

  public static fromJSON(json: SolMetaplexTokenJSON): SolMetaplexToken {
    const input: SolMetaplexTokenInput = {
      metadataUri: json.metadataUri,
      masterEdition: json.masterEdition,
      isMutable: json.isMutable,
      primarySaleHappened: json.primarySaleHappened,
      sellerFeeBasisPoints: json.sellerFeeBasisPoints,
      updateAuthority: json.updateAuthority,
    };
    return SolMetaplexToken.create(input);
  }

  public readonly metadataUri: string;
  public readonly masterEdition: boolean;
  public readonly isMutable: boolean;
  public readonly primarySaleHappened: number;
  public readonly sellerFeeBasisPoints: number;
  public readonly updateAuthority: string;

  private constructor(input: SolMetaplexTokenInput) {
    this.metadataUri = input.metadataUri;
    this.masterEdition = input.masterEdition;
    this.isMutable = input.isMutable;
    this.primarySaleHappened = input.primarySaleHappened;
    this.sellerFeeBasisPoints = input.sellerFeeBasisPoints;
    this.updateAuthority = input.updateAuthority;
  }

  public toJSON(): SolMetaplexTokenJSON {
    return {
      metadataUri: this.metadataUri,
      masterEdition: this.masterEdition,
      isMutable: this.isMutable,
      primarySaleHappened: this.primarySaleHappened,
      sellerFeeBasisPoints: this.sellerFeeBasisPoints,
      updateAuthority: this.updateAuthority,
    }
  }
}
