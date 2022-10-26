import { ethers } from 'ethers';

export class LogDocumentId {
  public static create(chainId: number, transactionHash: string, logIndex: string): string {
    const safeTransactionHash = transactionHash.toLowerCase();
    const rawId = ethers.utils.toUtf8Bytes(`${chainId};${safeTransactionHash};${logIndex}`);
    return ethers.utils.sha256(rawId);
  }
}
