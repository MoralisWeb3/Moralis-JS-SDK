import { EvmAddress, EvmAddressInput, EvmAddressJSON } from '../../dataTypes';

// $ref: #/components/schemas/native_transfer
// type: native_transfer
// properties:
// - from_address_entity ($ref: #/components/schemas/native_transfer/properties/from_address_entity)
// - from_address_entity_logo ($ref: #/components/schemas/native_transfer/properties/from_address_entity_logo)
// - from_address ($ref: #/components/schemas/native_transfer/properties/from_address)
// - from_address_label ($ref: #/components/schemas/native_transfer/properties/from_address_label)
// - to_address_entity ($ref: #/components/schemas/native_transfer/properties/to_address_entity)
// - to_address_entity_logo ($ref: #/components/schemas/native_transfer/properties/to_address_entity_logo)
// - to_address ($ref: #/components/schemas/native_transfer/properties/to_address)
// - to_address_label ($ref: #/components/schemas/native_transfer/properties/to_address_label)
// - value ($ref: #/components/schemas/native_transfer/properties/value)
// - value_formatted ($ref: #/components/schemas/native_transfer/properties/value_formatted)
// - direction ($ref: #/components/schemas/native_transfer/properties/direction)
// - internal_transaction ($ref: #/components/schemas/native_transfer/properties/internal_transaction)
// - token_symbol ($ref: #/components/schemas/native_transfer/properties/token_symbol)
// - token_logo ($ref: #/components/schemas/native_transfer/properties/token_logo)

export interface EvmNativeTransferJSON {
  readonly from_address_entity?: string;
  readonly from_address_entity_logo?: string;
  readonly from_address: EvmAddressJSON;
  readonly from_address_label?: string;
  readonly to_address_entity?: string;
  readonly to_address_entity_logo?: string;
  readonly to_address?: EvmAddressJSON;
  readonly to_address_label?: string;
  readonly value: string;
  readonly value_formatted: string;
  readonly direction?: string;
  readonly internal_transaction: boolean;
  readonly token_symbol: string;
  readonly token_logo: string;
}

export interface EvmNativeTransferInput {
  readonly fromAddressEntity?: string;
  readonly fromAddressEntityLogo?: string;
  readonly fromAddress: EvmAddressInput | EvmAddress;
  readonly fromAddressLabel?: string;
  readonly toAddressEntity?: string;
  readonly toAddressEntityLogo?: string;
  readonly toAddress?: EvmAddressInput | EvmAddress;
  readonly toAddressLabel?: string;
  readonly value: string;
  readonly valueFormatted: string;
  readonly direction?: string;
  readonly internalTransaction: boolean;
  readonly tokenSymbol: string;
  readonly tokenLogo: string;
}

export class EvmNativeTransfer {
  public static create(input: EvmNativeTransferInput | EvmNativeTransfer): EvmNativeTransfer {
    if (input instanceof EvmNativeTransfer) {
      return input;
    }
    return new EvmNativeTransfer(input);
  }

  public static fromJSON(json: EvmNativeTransferJSON): EvmNativeTransfer {
    const input: EvmNativeTransferInput = {
      fromAddressEntity: json.from_address_entity,
      fromAddressEntityLogo: json.from_address_entity_logo,
      fromAddress: EvmAddress.fromJSON(json.from_address),
      fromAddressLabel: json.from_address_label,
      toAddressEntity: json.to_address_entity,
      toAddressEntityLogo: json.to_address_entity_logo,
      toAddress: json.to_address ? EvmAddress.fromJSON(json.to_address) : undefined,
      toAddressLabel: json.to_address_label,
      value: json.value,
      valueFormatted: json.value_formatted,
      direction: json.direction,
      internalTransaction: json.internal_transaction,
      tokenSymbol: json.token_symbol,
      tokenLogo: json.token_logo,
    };
    return EvmNativeTransfer.create(input);
  }

  /**
   * @description The from address entity
   */
  public readonly fromAddressEntity?: string;
  /**
   * @description The logo of the from address entity
   */
  public readonly fromAddressEntityLogo?: string;
  /**
   * @description The address that sent the NFT
   */
  public readonly fromAddress: EvmAddress;
  /**
   * @description The label of the from address
   */
  public readonly fromAddressLabel?: string;
  /**
   * @description The to address entity
   */
  public readonly toAddressEntity?: string;
  /**
   * @description The logo of the to address entity
   */
  public readonly toAddressEntityLogo?: string;
  /**
   * @description The address that received the NFT
   */
  public readonly toAddress?: EvmAddress;
  /**
   * @description The label of the to address
   */
  public readonly toAddressLabel?: string;
  /**
   * @description The value that was sent in the transaction (ETH/BNB/etc..)
   */
  public readonly value: string;
  /**
   * @description The value that was sent in the transaction (ETH/BNB/etc..) in decimal format
   */
  public readonly valueFormatted: string;
  /**
   * @description The direction of the transfer
   */
  public readonly direction?: string;
  /**
   * @description Indicates if the transaction is internal
   */
  public readonly internalTransaction: boolean;
  /**
   * @description The symbol of the token transferred
   */
  public readonly tokenSymbol: string;
  /**
   * @description The logo of the token transferred
   */
  public readonly tokenLogo: string;

  private constructor(input: EvmNativeTransferInput) {
    this.fromAddressEntity = input.fromAddressEntity;
    this.fromAddressEntityLogo = input.fromAddressEntityLogo;
    this.fromAddress = EvmAddress.create(input.fromAddress);
    this.fromAddressLabel = input.fromAddressLabel;
    this.toAddressEntity = input.toAddressEntity;
    this.toAddressEntityLogo = input.toAddressEntityLogo;
    this.toAddress = input.toAddress ? EvmAddress.create(input.toAddress) : undefined;
    this.toAddressLabel = input.toAddressLabel;
    this.value = input.value;
    this.valueFormatted = input.valueFormatted;
    this.direction = input.direction;
    this.internalTransaction = input.internalTransaction;
    this.tokenSymbol = input.tokenSymbol;
    this.tokenLogo = input.tokenLogo;
  }

  public toJSON(): EvmNativeTransferJSON {
    return {
      from_address_entity: this.fromAddressEntity,
      from_address_entity_logo: this.fromAddressEntityLogo,
      from_address: this.fromAddress.toJSON(),
      from_address_label: this.fromAddressLabel,
      to_address_entity: this.toAddressEntity,
      to_address_entity_logo: this.toAddressEntityLogo,
      to_address: this.toAddress ? this.toAddress.toJSON() : undefined,
      to_address_label: this.toAddressLabel,
      value: this.value,
      value_formatted: this.valueFormatted,
      direction: this.direction,
      internal_transaction: this.internalTransaction,
      token_symbol: this.tokenSymbol,
      token_logo: this.tokenLogo,
    }
  }
}
