import { ethers } from 'ethers';

export class InternalTxDocumentId {
  public static create(chainId: number, transactionHash: string): string {
    const safeTransactionHash = transactionHash.toLowerCase();
    const rawId = ethers.utils.toUtf8Bytes(`${chainId};${safeTransactionHash}`);
    return ethers.utils.sha256(rawId);
  }
}
