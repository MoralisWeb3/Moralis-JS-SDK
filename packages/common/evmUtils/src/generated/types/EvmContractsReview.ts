// $ref: #/paths/~1contracts-review/post/responses/200/content/application~1json/schema
// typeName: contractsReview

export type EvmContractsReviewJSON = object;
export type EvmContractsReviewInput = object;
export type EvmContractsReviewValue = object;

export abstract class EvmContractsReview {
  public static create(input: EvmContractsReviewInput | EvmContractsReviewValue): EvmContractsReviewValue {
    return input;
  }

  public static fromJSON(json: EvmContractsReviewJSON): EvmContractsReviewValue {
    return json;
  }
}
