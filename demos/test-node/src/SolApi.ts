import Moralis from "moralis";
import { smoketest } from "./Smoketest";

export async function testSolanaAccount() {
  const network = 'mainnet';
  const address = '5xoBq7f7CDgZwqHrDBdRWM84ExRetg4gZq93dyJtoSwp';

  await smoketest('(Solana) getBalance', () => {
    return Moralis.SolApi.account.getBalance({
      network,
      address,
    });
  });

  await smoketest('(Solana) getNFTs', () => {
    return Moralis.SolApi.account.getNFTs({
      network,
      address,
    });
  });

  await smoketest('(Solana) getNFTs', () => {
    return Moralis.SolApi.account.getSPL({
      network,
      address,
    });
  });

  await smoketest('(Solana) getNFTs', () => {
    return Moralis.SolApi.account.getPortfolio({
      network,
      address,
    });
  });
}

export async function testSolanaNft() {
  await smoketest('(Solana) getNFTMetadata', () => {
    return Moralis.SolApi.nft.getNFTMetadata({
      network: 'devnet',
      address: '6XU36wCxWobLx5Rtsb58kmgAJKVYmMVqy4SHXxENAyAe'
    });
  });
}
