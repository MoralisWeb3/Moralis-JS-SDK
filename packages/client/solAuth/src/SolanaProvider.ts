export interface SolanaProvider {
  connect(): Promise<void>;
  publicKey: {
    toBase58(): string;
  };
  signMessage(message: Uint8Array): Promise<{ signature: Uint8Array }>;
}
