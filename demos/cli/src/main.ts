/* eslint-disable no-console */

import Moralis from 'moralis';
import dotenv from 'dotenv';

function readEnv(): { [key: string]: string } {
  return dotenv.config().parsed as { [key: string]: string };
}

async function main() {
  const env = readEnv();
  console.info('🔥 CLI demo');

  Moralis.start({
    apiKey: env['MORALIS_API_KEY'],
  });

  const block = await Moralis.EvmApi.block.getBlock({
    blockNumberOrHash: '15305775',
    chain: '0x1',
  });
  console.log(block);

  const blockStats = await Moralis.EvmApi.block.getBlockStats({
    blockNumberOrHash: '18091265',
  });
  console.log('blockStats', blockStats.result.toJSON());

  const nftCollectionStats = await Moralis.EvmApi.nft.getNFTCollectionStats({
    address: '0x60e4d786628fea6478f785a6d7e704777c86a7c6',
  });
  console.log('nftCollectionStats', nftCollectionStats.result.toJSON());

  const nftTokenStats = await Moralis.EvmApi.nft.getNFTTokenStats({
    address: '0x60e4d786628fea6478f785a6d7e704777c86a7c6',
    tokenId: '1',
  });
  console.log('nftTokenStats', nftTokenStats.result.toJSON());

  const walletStats = await Moralis.EvmApi.wallets.getWalletStats({
    address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
  });
  console.log('walletStats', walletStats.result.toJSON());

  const tokenStats = await Moralis.EvmApi.token.getTokenStats({
    address: '0x4a220e6096b25eadb88358cb44068a3248254675',
  });
  console.log('tokenStats', tokenStats.result.toJSON());

  const defiSummary = await Moralis.EvmApi.wallets.getDefiSummary({
    address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
  });
  console.log('defiSummary', defiSummary.result.toJSON());

  const defiPositions = await Moralis.EvmApi.wallets.getDefiPositionsSummary({
    address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
  });
  console.log('defiPositions', defiPositions);

  const defiProtocolPositions = await Moralis.EvmApi.wallets.getDefiPositionsByProtocol({
    address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    protocol: 'uniswap-v2',
  });
  console.log('defiProtocolPositions', defiProtocolPositions.result.toJSON().positions);

  const walletProfitabilitySummary = await Moralis.EvmApi.wallets.getWalletProfitabilitySummary({
    address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    days: 'all',
    chain: '0x1',
  });
  console.log('walletProfitabilitySummary', walletProfitabilitySummary.result.toJSON());

  const walletProfitability = await Moralis.EvmApi.wallets.getWalletProfitability({
    address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    days: 'all',
    chain: '0x1',
  });
  console.log('walletProfitability', walletProfitability.result.toJSON());

  const topProfitableWalletPerToken = await Moralis.EvmApi.token.getTopProfitableWalletPerToken({
    address: '0x4a220e6096b25eadb88358cb44068a3248254675',
    days: 'all',
    chain: '0x1',
  });
  console.log('topProfitableWalletPerToken', topProfitableWalletPerToken.result.toJSON());
}

main();
