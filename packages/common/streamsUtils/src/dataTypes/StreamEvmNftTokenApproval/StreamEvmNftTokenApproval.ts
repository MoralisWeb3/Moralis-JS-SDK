import {
  Core,
  CoreProvider,
  MoralisDataFormatted,
  MoralisDataObject,
  MoralisDataObjectValue,
} from '@moralisweb3/common-core';
import { StreamEvmNftTokenApprovalData, StreamEvmNftTokenApprovalish } from './types';
import { EvmChain } from '@moralisweb3/common-evm-utils';

/**
 * The `StreamEvmNftTokenApproval` class is a representation of the NFT approval data.
 *
 * @category DataType
 */
export class StreamEvmNftTokenApproval implements StreamEvmNftTokenApprovalData, MoralisDataObject {
  public static create(data: StreamEvmNftTokenApprovalish, core?: Core): StreamEvmNftTokenApproval {
    const finalCore = core ?? CoreProvider.getDefault();
    const chain = EvmChain.create(data.chain, finalCore);
    return new StreamEvmNftTokenApproval({
      ...data,
      chain,
    });
  }

  private constructor(private readonly data: StreamEvmNftTokenApprovalData) {}

  public get chain(): EvmChain {
    return this.data.chain;
  }

  public get contract(): string {
    return this.data.contract;
  }

  public get account(): string {
    return this.data.account;
  }

  public get operator(): string {
    return this.data.operator;
  }
  public get approvedAll(): boolean {
    return this.data.approvedAll;
  }

  public get tokenId(): string | null {
    return this.data.tokenId;
  }

  public get transactionHash(): string {
    return this.data.transactionHash;
  }

  public get logIndex(): string {
    return this.data.logIndex;
  }

  public get tokenContractType(): string {
    return this.data.tokenContractType;
  }

  public get tokenName(): string {
    return this.data.tokenName;
  }

  public get tokenSymbol(): string {
    return this.data.tokenSymbol;
  }

  public toJSON(): MoralisDataObjectValue {
    return {
      chain: this.chain.format(),
      contract: this.contract,
      account: this.account,
      operator: this.operator,
      approvedAll: this.approvedAll,
      tokenId: this.tokenId,
      transactionHash: this.transactionHash,
      logIndex: this.logIndex,
      tokenContractType: this.tokenContractType,
      tokenName: this.tokenName,
      tokenSymbol: this.tokenSymbol,
    };
  }

  public format(): MoralisDataFormatted {
    return this.toJSON();
  }

  public equals(value: this): boolean {
    return (
      this.contract === value.contract &&
      this.account === value.account &&
      this.operator === value.operator &&
      this.approvedAll === value.approvedAll &&
      this.tokenId === value.tokenId &&
      this.transactionHash === value.transactionHash &&
      this.logIndex === value.logIndex &&
      this.tokenContractType === value.tokenContractType &&
      this.tokenName === value.tokenName &&
      this.tokenSymbol === value.tokenSymbol
    );
  }
}
