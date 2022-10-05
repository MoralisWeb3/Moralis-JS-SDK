import MoralisCore, { MoralisCoreProvider } from '@moralisweb3/core';
import { EvmNftTransfer } from '@moralisweb3/evm-utils';
import { StreamEvmNftTransferInput, StreamEvmNftTransferStreamsData } from './types';

type StreamEvmNftTransferish = StreamEvmNftTransfer | StreamEvmNftTransferInput;
export class StreamEvmNftTransfer extends EvmNftTransfer {
  private _streamData: StreamEvmNftTransferStreamsData;

  constructor({ tag, tokenName, tokenSymbol, ...data }: StreamEvmNftTransferInput, core: MoralisCore) {
    super(data, core);
    this._streamData = { tag, tokenName, tokenSymbol };
  }

  static create(data: StreamEvmNftTransferish, core?: MoralisCore) {
    if (data instanceof StreamEvmNftTransfer) {
      return data;
    }
    const finalCore = core ?? MoralisCoreProvider.getDefault();
    return new StreamEvmNftTransfer(data, finalCore);
  }

  toJSON() {
    return {
      ...this._streamData,
      ...super.toJSON(),
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

  get tokenContractType() {
    return this._data.contractType;
  }

  get from() {
    // Always defined in Streams
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this._data.fromAddress!;
  }

  get to() {
    // Always defined in Streams
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this._data.toAddress!;
  }
}
