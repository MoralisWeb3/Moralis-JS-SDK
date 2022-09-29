import { EvmNftTransfer, EvmNftTransferInput } from '@moralisweb3/evm-utils';

interface StreamData {
  tag: string;
  tokenName: string;
  tokenSymbol: string;
}

type StreamEvmNftTransferInput = EvmNftTransferInput & StreamData;
type StreamEvmNftTransferish = StreamEvmNftTransfer | StreamEvmNftTransferInput;

export class StreamEvmNftTransfer extends EvmNftTransfer {
  private _streamData: StreamData;

  constructor({ tag, tokenName, tokenSymbol, ...data }: StreamEvmNftTransferInput) {
    super(data);
    this._streamData = { tag, tokenName, tokenSymbol };
  }

  static create(data: StreamEvmNftTransferish) {
    if (data instanceof StreamEvmNftTransfer) {
      return data;
    }
    return new StreamEvmNftTransfer(data);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      ...this._streamData,
    };
  }

  get tag() {
    return this._streamData.tag;
  }

  get tokenName() {
    return this._streamData.tokenName;
  }

  get tokenSymbol() {
    return this._streamData.tokenSymbol;
  }
}
