// $ref: #/components/schemas/erc20Transfer/properties/to_wallet_label
// typeName: erc20Transfer_to_wallet_label
// unionType: oneOf

export type EvmErc20TransferToWalletLabelJSON = string | null;
export type EvmErc20TransferToWalletLabelInput = string | null;
export type EvmErc20TransferToWalletLabelValue = string | null;

export abstract class EvmErc20TransferToWalletLabel {
  public static create(input: EvmErc20TransferToWalletLabelInput): EvmErc20TransferToWalletLabelValue {
    return input;
  }

  public static fromJSON(json: EvmErc20TransferToWalletLabelJSON): EvmErc20TransferToWalletLabelValue {
    return json;
  }

  public static toJSON(value: EvmErc20TransferToWalletLabelValue): EvmErc20TransferToWalletLabelJSON {
    return value;
  }
}
