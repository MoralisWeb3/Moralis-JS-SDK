// $ref: #/paths/~1contracts-review/post/responses/200/content/application~1json/schema
// type: reviewContracts
// properties:
// - message ($ref: #/paths/~1contracts-review/post/responses/200/content/application~1json/schema/properties/message)

export interface EvmReviewContractsJSON {
  readonly message?: string;
}

export interface EvmReviewContractsInput {
  readonly message?: string;
}

export class EvmReviewContracts {
  public static create(input: EvmReviewContractsInput | EvmReviewContracts): EvmReviewContracts {
    if (input instanceof EvmReviewContracts) {
      return input;
    }
    return new EvmReviewContracts(input);
  }

  public static fromJSON(json: EvmReviewContractsJSON): EvmReviewContracts {
    const input: EvmReviewContractsInput = {
      message: json.message,
    };
    return EvmReviewContracts.create(input);
  }

  public readonly message?: string;

  private constructor(input: EvmReviewContractsInput) {
    this.message = input.message;
  }

  public toJSON(): EvmReviewContractsJSON {
    return {
      message: this.message,
    }
  }
}
