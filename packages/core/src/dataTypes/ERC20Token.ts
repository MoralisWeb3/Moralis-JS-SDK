import { BigNumberish, BigNumber } from '@ethersproject/bignumber';
import { formatUnits } from '@ethersproject/units';
import { EvmAddress } from '..';
import { MoralisObjectDataType, MoralisObjectValue } from './MoralisObjectDataType';

export interface Erc20TokenInput {
  balance: BigNumberish;
  decimals: number | string;
  name: string;
  symbol: string;
  // TODO: make addressish? To allow for string input or EvmAddress input
  tokenAddress: string;
  logo?: string | null;
  thumbnail?: string | null;
}

export interface Erc20TokenJSON extends MoralisObjectValue {
  balance: string;
  decimals: number;
  name: string;
  symbol: string;
  tokenAddress: string;
  logo: string | null;
  thumbnail: string | null;
}

// TODO: add Chains to core/datatypes or separate package, and use it here to have an etherscan getter
export class ERC20Token implements MoralisObjectDataType {
  balance: BigNumber;
  decimals: number;
  name: string;
  symbol: string;
  tokenAddress: EvmAddress;
  logo: string | null;
  thumbnail: string | null;

  // TODO: split up in parse and validate function
  constructor({ balance, decimals, name, symbol, tokenAddress, logo, thumbnail }: Erc20TokenInput) {
    this.balance = BigNumber.from(balance);
    this.decimals = +decimals;
    this.name = name;
    this.symbol = symbol;
    this.tokenAddress = new EvmAddress(tokenAddress);
    this.logo = logo ?? null;
    this.thumbnail = thumbnail ?? null;
  }

  // TODO: configurable significant numbers, or number behind decimals
  // TODO: make format function globally and locally overwritable
  format() {
    const value = formatUnits(this.balance, this.decimals);

    // Remove trailing zero, this is implemented by EthersJs by design but unwanted in this case
    // See: https://github.com/ethers-io/ethers.js/issues/1291
    const splitResult = value.split('.');
    if (splitResult[1] === '0') {
      return splitResult[0];
    }
    return value;
  }

  toJSON(): Erc20TokenJSON {
    return {
      balance: this.balance.toString(),
      decimals: this.decimals,
      name: this.name,
      symbol: this.symbol,
      tokenAddress: this.tokenAddress.format(),
      logo: this.logo,
      thumbnail: this.thumbnail,
    };
  }
  get display() {
    return `${this.balance} ${this.symbol}`;
  }
}
