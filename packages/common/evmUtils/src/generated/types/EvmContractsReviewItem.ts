import { EvmAddress, EvmAddressInput, EvmAddressJSON } from '../../dataTypes';
import { EvmContractsReviewItemReportTypeEnum, EvmContractsReviewItemReportTypeEnumValue, EvmContractsReviewItemReportTypeEnumInput, EvmContractsReviewItemReportTypeEnumJSON } from '../types/EvmContractsReviewItemReportTypeEnum';
import { EvmContractsReviewItemContractTypeEnum, EvmContractsReviewItemContractTypeEnumValue, EvmContractsReviewItemContractTypeEnumInput, EvmContractsReviewItemContractTypeEnumJSON } from '../types/EvmContractsReviewItemContractTypeEnum';

// $ref: #/components/schemas/contractsReviewItem
// type: contractsReviewItem
// properties:
// - contract_address ($ref: #/components/schemas/contractsReviewItem/properties/contract_address)
// - reason ($ref: #/components/schemas/contractsReviewItem/properties/reason)
// - report_type ($ref: #/components/schemas/contractsReviewItem/properties/report_type)
// - contract_type ($ref: #/components/schemas/contractsReviewItem/properties/contract_type)

export interface EvmContractsReviewItemJSON {
  readonly contract_address: EvmAddressJSON;
  readonly reason: string;
  readonly report_type: EvmContractsReviewItemReportTypeEnumJSON;
  readonly contract_type: EvmContractsReviewItemContractTypeEnumJSON;
}

export interface EvmContractsReviewItemInput {
  readonly contractAddress: EvmAddressInput | EvmAddress;
  readonly reason: string;
  readonly reportType: EvmContractsReviewItemReportTypeEnumInput | EvmContractsReviewItemReportTypeEnumValue;
  readonly contractType: EvmContractsReviewItemContractTypeEnumInput | EvmContractsReviewItemContractTypeEnumValue;
}

export class EvmContractsReviewItem {
  public static create(input: EvmContractsReviewItemInput | EvmContractsReviewItem): EvmContractsReviewItem {
    if (input instanceof EvmContractsReviewItem) {
      return input;
    }
    return new EvmContractsReviewItem(input);
  }

  public static fromJSON(json: EvmContractsReviewItemJSON): EvmContractsReviewItem {
    const input: EvmContractsReviewItemInput = {
      contractAddress: EvmAddress.fromJSON(json.contract_address),
      reason: json.reason,
      reportType: EvmContractsReviewItemReportTypeEnum.fromJSON(json.report_type),
      contractType: EvmContractsReviewItemContractTypeEnum.fromJSON(json.contract_type),
    };
    return EvmContractsReviewItem.create(input);
  }

  /**
   * @description The contract address
   */
  public readonly contractAddress: EvmAddress;
  /**
   * @description The reason for the contract being spam
   */
  public readonly reason: string;
  /**
   * @description This can be spam or not_spam
   */
  public readonly reportType: EvmContractsReviewItemReportTypeEnumValue;
  /**
   * @description This can be ERC20, or NFT
   */
  public readonly contractType: EvmContractsReviewItemContractTypeEnumValue;

  private constructor(input: EvmContractsReviewItemInput) {
    this.contractAddress = EvmAddress.create(input.contractAddress);
    this.reason = input.reason;
    this.reportType = EvmContractsReviewItemReportTypeEnum.create(input.reportType);
    this.contractType = EvmContractsReviewItemContractTypeEnum.create(input.contractType);
  }

  public toJSON(): EvmContractsReviewItemJSON {
    return {
      contract_address: this.contractAddress.toJSON(),
      reason: this.reason,
      report_type: this.reportType,
      contract_type: this.contractType,
    }
  }
}
