import MoralisCore, { MoralisCoreProvider } from '@moralisweb3/core';
import { EvmTransactionLog, EvmTransactionLogInput } from '@moralisweb3/evm-utils';
import { StreamData } from '../StreamData';

export type StreamEvmTransactionLogInput = EvmTransactionLogInput & StreamData;
type StreamEvmTransactionLogish = StreamEvmTransactionLog | StreamEvmTransactionLogInput;

export class StreamEvmTransactionLog extends EvmTransactionLog {
  private _streamData: StreamData;

  constructor({ tag, streamId, ...data }: StreamEvmTransactionLogInput, core: MoralisCore) {
    super(data, core);
    this._streamData = { tag, streamId };
  }

  static create(data: StreamEvmTransactionLogish, core?: MoralisCore) {
    if (data instanceof StreamEvmTransactionLog) {
      return data;
    }
    const finalCore = core ?? MoralisCoreProvider.getDefault();
    return new StreamEvmTransactionLog(data, finalCore);
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

  get streamId() {
    return this._streamData.streamId;
  }
}
