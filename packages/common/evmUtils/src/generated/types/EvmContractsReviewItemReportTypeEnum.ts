// $ref: #/components/schemas/contractsReviewItem/properties/report_type
// typeName: contractsReviewItem_report_type_Enum

export type EvmContractsReviewItemReportTypeEnumJSON = "spam" | "not_spam";
export type EvmContractsReviewItemReportTypeEnumInput = "spam" | "not_spam";
export type EvmContractsReviewItemReportTypeEnumValue = "spam" | "not_spam";

export abstract class EvmContractsReviewItemReportTypeEnum {
  public static create(input: EvmContractsReviewItemReportTypeEnumInput | EvmContractsReviewItemReportTypeEnumValue): EvmContractsReviewItemReportTypeEnumValue {
    return input;
  }

  public static fromJSON(json: EvmContractsReviewItemReportTypeEnumJSON): EvmContractsReviewItemReportTypeEnumValue {
    return json;
  }
}
