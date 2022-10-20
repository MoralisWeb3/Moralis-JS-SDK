import { SolNetworkName } from '@moralisweb3/sol-utils';
import Moralis from 'moralis';
import { smokeTest } from './Tester';

export function testSolanaAccount(): Promise<unknown> {
  const groupName = 'Solana/account';
  const network: SolNetworkName | undefined = 'mainnet';
  const address = '5xoBq7f7CDgZwqHrDBdRWM84ExRetg4gZq93dyJtoSwp';

  return Promise.all([
    smokeTest(groupName, 'getBalance', () => {
      return Moralis.SolApi.account.getBalance({
        network,
        address,
      });
    }),
    smokeTest(groupName, 'getNFTs', () => {
      return Moralis.SolApi.account.getNFTs({
        network,
        address,
      });
    }),
    smokeTest(groupName, 'getSPL', () => {
      return Moralis.SolApi.account.getSPL({
        network,
        address,
      });
    }),
    smokeTest(groupName, 'getPortfolio', () => {
      return Moralis.SolApi.account.getPortfolio({
        network,
        address,
      });
    }),
  ]);
}

export async function testSolanaNft(): Promise<unknown> {
  const groupName = 'Solana/nft';

  return Promise.all([
    smokeTest(groupName, 'getNFTMetadata', () => {
      return Moralis.SolApi.nft.getNFTMetadata({
        network: 'mainnet',
        address: 'A8rFZ2Y3Kcr2A84A23f3z3rw47BTNp5haxYCUwUE8bCU',
      });
    }),
  ]);
}
