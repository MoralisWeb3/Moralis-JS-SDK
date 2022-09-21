import { Web3Provider } from '@ethersproject/providers';

export async function connectToMetamask() {
  // eslint-disable-next-line no-undef, @typescript-eslint/no-explicit-any
  const provider = new Web3Provider((window as any)['ethereum'], 'any');

  const [accounts, chainId] = await Promise.all([
    provider.send('eth_requestAccounts', []),
    provider.send('eth_chainId', []),
  ]);

  const signer = provider.getSigner();
  return { signer, chain: chainId as number, address: accounts[0] as string };
}

export async function connectToPhantom(): Promise<{
  signer: {
    signMessage(message: Uint8Array): Promise<{ signature: Uint8Array }>;
  };
  address: string;
}> {
  // eslint-disable-next-line no-undef, @typescript-eslint/no-explicit-any
  const provider = (window as any)['solana'];
  if (!provider.isPhantom) {
    throw new Error('Solana provider not found');
  }

  await provider.connect();
  const address = provider.publicKey.toBase58();
  return { signer: provider, address };
}
