// $ref: #/components/schemas/contractsReviewItem/properties/contract_type
// typeName: contractsReviewItem_contract_type_Enum

export type EvmContractsReviewItemContractTypeEnumJSON = "ERC20" | "NFT";
export type EvmContractsReviewItemContractTypeEnumInput = "ERC20" | "NFT";
export type EvmContractsReviewItemContractTypeEnumValue = "ERC20" | "NFT";

export abstract class EvmContractsReviewItemContractTypeEnum {
  public static create(input: EvmContractsReviewItemContractTypeEnumInput | EvmContractsReviewItemContractTypeEnumValue): EvmContractsReviewItemContractTypeEnumValue {
    return input;
  }

  public static fromJSON(json: EvmContractsReviewItemContractTypeEnumJSON): EvmContractsReviewItemContractTypeEnumValue {
    return json;
  }
}
