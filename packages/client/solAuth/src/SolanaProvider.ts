export interface SolanaProvider {
  isPhantom?: boolean;
  connect(): Promise<void>;
  publicKey: {
    toBase58(): string;
  };
  signMessage(message: Uint8Array): Promise<{ signature: Uint8Array }>;
  request(args: {
    method: string;
    params: unknown[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }): Promise<any>;
}
