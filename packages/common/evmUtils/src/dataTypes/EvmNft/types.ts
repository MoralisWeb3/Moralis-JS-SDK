import { BigNumber, BigNumberish, DateInput, MoralisDataObjectValue } from '@moralisweb3/common-core';
import { EvmAddressish, EvmAddress } from '../EvmAddress';
import { EvmChain, EvmChainish } from '../EvmChain';
import { EvmNftMedia, EvmNftMediaInput } from '../EvmNftMedia';

/**
 * This can be any object with valid transaction data.
 * @example
 * ```ts
 * const nftInput = {
          chain: 1,
          contractType: "ERC721",
          tokenAddress: "0x057Ec652A4F150f7FF94f089A38008f49a0DF88e",
          tokenId: "15",
          tokenUri: "string",
          metadata: "string",
          name: "CryptoKitties",
          symbol: "RARI",
          amount: "1",
          blockNumberMinted: "88256",
          blockNumber: "88256",
          ownerOf: "0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359",
          tokenHash: nft.token_hash,
          lastMetadataSync: "date_string",
          lastTokenUriSync: "date_string",
          possibleSpam: false
        }
 * ```
 */
export interface EvmNftInput {
  tokenId: number | string;
  contractType: string;
  chain: EvmChainish;
  tokenUri?: null | string;
  tokenAddress: EvmAddressish;
  tokenHash?: null | string;
  metadata?: null | string;
  name?: null | string;
  symbol?: null | string;

  ownerOf?: null | EvmAddressish;
  blockNumberMinted?: null | BigNumberish;
  blockNumber?: null | BigNumberish;
  lastMetadataSync?: null | DateInput;
  lastTokenUriSync?: null | DateInput;

  amount?: null | number | string;

  media?: EvmNftMedia | EvmNftMediaInput;
  possibleSpam: boolean;
}

/**
 * This is the return type of the processed EVM NFT
 */
export interface EvmNftData {
  tokenId: number | string;
  contractType?: string;
  chain: EvmChain;
  tokenUri?: string;
  tokenAddress: EvmAddress;
  tokenHash?: string;
  metadata?: MoralisDataObjectValue;
  name?: string;
  symbol?: string;

  ownerOf?: EvmAddress;
  blockNumberMinted?: BigNumber;
  blockNumber?: BigNumber;
  lastMetadataSync?: Date;
  lastTokenUriSync?: Date;

  amount?: number;

  media?: EvmNftMedia;
  possibleSpam: boolean;
}
