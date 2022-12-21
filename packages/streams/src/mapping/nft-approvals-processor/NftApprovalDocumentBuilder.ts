import { Block, INFTApproval } from '@moralisweb3/streams-typings';
import { LogRelatedId } from '../common/LogRelatedId';
import { Document } from '../storage';

export interface NftApprovalDocument extends Document {
  id: string;

  transactionHash: string;
  contract: string;
  logIndex: string;

  operator: string;
  account: string;
  approvedAll: boolean;
  tokenId: string | null;

  tokenContractType: string;
  tokenName: string;
  tokenSymbol: string;

  blockHash: string;
  blockTimestamp: number;
  blockNumber: number;
  confirmed: boolean;
  chainId: number;
}

export class NftApprovalDocumentBuilder {
  public static build(approval: INFTApproval, block: Block, confirmed: boolean, chainId: string): NftApprovalDocument {
    const chain = Number(chainId);

    const document: NftApprovalDocument = {
      id: LogRelatedId.create(chain, approval.transactionHash, approval.logIndex),

      transactionHash: approval.transactionHash,
      contract: approval.contract,
      logIndex: approval.logIndex,

      operator: approval.operator,
      account: approval.account,
      approvedAll: approval.approvedAll,
      tokenId: approval.tokenId,

      tokenContractType: approval.tokenContractType,
      tokenName: approval.tokenName,
      tokenSymbol: approval.tokenSymbol,

      blockHash: block.hash,
      blockTimestamp: parseInt(block.timestamp, 10),
      blockNumber: parseInt(block.number, 10),
      confirmed,
      chainId: chain,
    };
    return document;
  }
}
