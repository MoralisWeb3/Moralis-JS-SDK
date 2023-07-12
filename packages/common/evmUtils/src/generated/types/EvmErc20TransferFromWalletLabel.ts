// $ref: #/components/schemas/erc20Transfer/properties/from_wallet_label
// typeName: erc20Transfer_from_wallet_label
// unionType: oneOf

export type EvmErc20TransferFromWalletLabelJSON = string | null;
export type EvmErc20TransferFromWalletLabelInput = string | null;
export type EvmErc20TransferFromWalletLabelValue = string | null;

export abstract class EvmErc20TransferFromWalletLabel {
  public static create(input: EvmErc20TransferFromWalletLabelInput): EvmErc20TransferFromWalletLabelValue {
    return input;
  }

  public static fromJSON(json: EvmErc20TransferFromWalletLabelJSON): EvmErc20TransferFromWalletLabelValue {
    return json;
  }

  public static toJSON(value: EvmErc20TransferFromWalletLabelValue): EvmErc20TransferFromWalletLabelJSON {
    return value;
  }
}
