import { RequestController } from '@moralisweb3/core';

export const getIPFS = async (hash: string) => {
  const url = `https://gateway.moralisipfs.com/ipfs/${hash}`;
  const result = await RequestController.get(url);
  return result;
};
