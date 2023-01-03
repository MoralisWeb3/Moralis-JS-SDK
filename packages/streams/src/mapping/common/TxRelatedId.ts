import { Sha256 } from './Sha256';

export class TxRelatedId {
  public static create(chainId: number, transactionHash: string): string {
    const safeTransactionHash = transactionHash.toLowerCase();
    return Sha256.hash(`${chainId};${safeTransactionHash}`);
  }
}
