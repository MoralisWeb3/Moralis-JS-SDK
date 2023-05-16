import { EvmContractsReviewItem, EvmContractsReviewItemInput, EvmContractsReviewItemJSON } from '../types/EvmContractsReviewItem';

// $ref: #/components/schemas/ContractsReviewDto
// type: ContractsReviewDto
// properties:
// - contracts ($ref: #/components/schemas/contractsReviewItem)

export interface EvmContractsReviewDtoJSON {
  readonly contracts: EvmContractsReviewItemJSON[];
}

export interface EvmContractsReviewDtoInput {
  readonly contracts: EvmContractsReviewItemInput[] | EvmContractsReviewItem[];
}

export class EvmContractsReviewDto {
  public static create(input: EvmContractsReviewDtoInput | EvmContractsReviewDto): EvmContractsReviewDto {
    if (input instanceof EvmContractsReviewDto) {
      return input;
    }
    return new EvmContractsReviewDto(input);
  }

  public static fromJSON(json: EvmContractsReviewDtoJSON): EvmContractsReviewDto {
    const input: EvmContractsReviewDtoInput = {
      contracts: json.contracts.map((item) => EvmContractsReviewItem.fromJSON(item)),
    };
    return EvmContractsReviewDto.create(input);
  }

  /**
   * @description The contracts to be reported
   */
  public readonly contracts: EvmContractsReviewItem[];

  private constructor(input: EvmContractsReviewDtoInput) {
    this.contracts = input.contracts.map((item) => EvmContractsReviewItem.create(item));
  }

  public toJSON(): EvmContractsReviewDtoJSON {
    return {
      contracts: this.contracts.map((item) => item.toJSON()),
    }
  }
}
