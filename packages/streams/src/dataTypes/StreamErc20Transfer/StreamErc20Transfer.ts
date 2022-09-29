import { BigNumber, BigNumberish, maybe } from '@moralisweb3/core';
import { Erc20Transfer, Erc20TransferInput } from '@moralisweb3/evm-utils';

interface StreamDataInput {
  logindex: number;
  tag: string;
  tokenDecimals: string;
  tokenSymbol: string;
  valueWithDecimals?: null | BigNumberish;
}

interface StreamData {
  logindex: number;
  tag: string;
  tokenDecimals: string;
  tokenSymbol: string;
  valueWithDecimals?: BigNumber;
}

type StreamErc20TransferInput = Erc20TransferInput & StreamDataInput;

type StreamErc20Transferish = StreamErc20Transfer | StreamErc20TransferInput;

export class StreamErc20Transfer extends Erc20Transfer {
  private _streamData: StreamData;

  constructor({ tag, logindex, tokenDecimals, tokenSymbol, valueWithDecimals, ...data }: StreamErc20TransferInput) {
    super(data);
    this._streamData = {
      tag,
      logindex,
      tokenDecimals,
      tokenSymbol,
      valueWithDecimals: maybe(valueWithDecimals, BigNumber.create),
    };
  }

  static create(data: StreamErc20Transferish) {
    if (data instanceof StreamErc20Transfer) {
      return data;
    }
    return new StreamErc20Transfer(data);
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

  get logindex() {
    return this._streamData.logindex;
  }

  get tokenDecimals() {
    return this._streamData.tokenSymbol;
  }

  get valueWithDecimals() {
    return this._streamData.valueWithDecimals;
  }
}
