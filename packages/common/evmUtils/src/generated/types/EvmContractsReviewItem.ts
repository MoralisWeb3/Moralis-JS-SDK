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
  readonly contract_address?: EvmAddressJSON;
  readonly reason?: string;
  readonly report_type?: EvmContractsReviewItemReportTypeEnumJSON;
  readonly contract_type?: EvmContractsReviewItemContractTypeEnumJSON;
}

export interface EvmContractsReviewItemInput {
  readonly contractAddress?: EvmAddressInput | EvmAddress;
  readonly reason?: string;
  readonly reportType?: EvmContractsReviewItemReportTypeEnumInput | EvmContractsReviewItemReportTypeEnumValue;
  readonly contractType?: EvmContractsReviewItemContractTypeEnumInput | EvmContractsReviewItemContractTypeEnumValue;
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
      contractAddress: json.contract_address ? EvmAddress.fromJSON(json.contract_address) : undefined,
      reason: json.reason,
      reportType: json.report_type ? EvmContractsReviewItemReportTypeEnum.fromJSON(json.report_type) : undefined,
      contractType: json.contract_type ? EvmContractsReviewItemContractTypeEnum.fromJSON(json.contract_type) : undefined,
    };
    return EvmContractsReviewItem.create(input);
  }

  /**
   * @description The contract address
   */
  public readonly contractAddress?: EvmAddress;
  /**
   * @description The reason for the contract being spam
   */
  public readonly reason?: string;
  /**
   * @description This can be spam or not_spam
   */
  public readonly reportType?: EvmContractsReviewItemReportTypeEnumValue;
  /**
   * @description This can be ERC20, or NFT
   */
  public readonly contractType?: EvmContractsReviewItemContractTypeEnumValue;

  private constructor(input: EvmContractsReviewItemInput) {
    this.contractAddress = input.contractAddress ? EvmAddress.create(input.contractAddress) : undefined;
    this.reason = input.reason;
    this.reportType = input.reportType ? EvmContractsReviewItemReportTypeEnum.create(input.reportType) : undefined;
    this.contractType = input.contractType ? EvmContractsReviewItemContractTypeEnum.create(input.contractType) : undefined;
  }

  public toJSON(): EvmContractsReviewItemJSON {
    return {
      contract_address: this.contractAddress ? this.contractAddress.toJSON() : undefined,
      reason: this.reason,
      report_type: this.reportType ? this.reportType : undefined,
      contract_type: this.contractType ? this.contractType : undefined,
    }
  }
}
