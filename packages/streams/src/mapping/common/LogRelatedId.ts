import { Sha256 } from './Sha256';

export class LogRelatedId {
  public static create(chainId: number, transactionHash: string, logIndex: string): string {
    const safeTransactionHash = transactionHash.toLowerCase();
    return Sha256.hash(`${chainId};${safeTransactionHash};${logIndex}`);
  }
}
