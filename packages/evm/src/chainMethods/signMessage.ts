import { ethers } from 'ethers';
import { assertProvider } from '../assert/assertProvider';

export const makeSignMessage = (_provider: ethers.providers.JsonRpcSigner | null) => async (message: string) => {
  const provider = assertProvider(_provider);
  const signature = await provider.signMessage(message);

  return signature;
};
