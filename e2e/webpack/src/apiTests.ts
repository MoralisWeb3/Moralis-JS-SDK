import Moralis from 'moralis';
import { getConfig } from './config';

export type MoralisType = typeof Moralis;

declare global {
  interface Window {
    evmGetBlockTest: Function;
    aptosGetBlockByHeightTest: Function;
    solGetNFTMetadataTest: Function;
  }
}

export function equals<T>(a: T, b: T) {
  if (a !== b) {
    throw new Error(`Expected ${a} to equal ${b}`);
  }
  return true;
}

export const mount = (moralis: MoralisType) => {
  moralis.start({
    apiKey: getConfig().apiKey,
  });

  window.evmGetBlockTest = async () => {
    const block = await moralis.EvmApi.block.getBlock({
      blockNumberOrHash: '10000000',
    });

    return (
      equals(block?.result.hash, '0xaa20f7bde5be60603f11a45fc4923aab7552be775403fc00c2e6b805e6297dbe') &&
      equals(block?.result.number.toString(), '10000000')
    );
  };

  window.aptosGetBlockByHeightTest = async () => {
    const block = await moralis.AptosApi.blocks.getBlockByHeight({
      blockHeight: 100000,
      withTransactions: false,
    });

    return equals(block?.blockHeight, '100000') && equals(block?.blockTimestamp, '1665659435345264');
  };

  window.solGetNFTMetadataTest = async () => {
    const metadata = await moralis.SolApi.nft.getNFTMetadata({
      address: '9MwGzSyuQRqmBHqmYwE6wbP3vzRBj4WWiYxWns3rkR7A',
    });

    return equals(metadata.result.symbol, 'DAPE') && equals(metadata.result.standard, 'metaplex');
  };
};
