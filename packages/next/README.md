<div align="center">
    <p align="center">
      <img src="https://raw.githubusercontent.com/MoralisWeb3/Moralis-JS-SDK/main/packages/next/.readme/MoralisLogo.png" alt="Moralis NextJS" />
    </p>
</div>

<div align="center">

![npm](https://img.shields.io/npm/v/@moralisweb3/next)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@moralisweb3/next)
![npm type definitions](https://img.shields.io/npm/types/@moralisweb3/next)

</div>

# `@moralisweb3/next`

> Moralis Hooks for your NextJS project

This project is a thin NextJS wrapper around [Moralis](https://moralis.io/), to easily call functionalities and display data. It  serves as a proxy, to allow users to access Moralis APIs in client-side.

Please check the [official documentation of Moralis](https://docs.moralis.io/) for all the functionalities of Moralis.

# 🚀 Quick start

### 1. Install Dependencies

Make sure to have `next`, `next-auth`, `react` and `react-dom` installed as dependencies, then install `@moralisweb3/next`

In short:

```sh
npm install @moralisweb3/next next next-auth react react-dom
```

or

```sh
yarn add @moralisweb3/next next next-auth react react-dom
```

### 2. Create environment variables file

Add a new file `.env.local` in project's root and provide a new variable with [Moralis API key](https://docs.moralis.io/docs/nextjs-dapp#add-moralis-to-your-nextjs-dapp):

```sh
MORALIS_API_KEY= ***
```

### 3. Create API route
To use Moralis APIs in your NextJs project create a file `pages/api/moralis/[...moralis].ts` with following code:

```js
import { MoralisNextApi } from "@moralisweb3/next";

export default MoralisNextApi({ apiKey: process.env.MORALIS_API_KEY });
```

You can provide a configuration object to the `MoralisNextApi`.

# ⭐️ Star us

If this "@moralisweb3/next" library helps you build your dapps faster - please star this project, every star makes us very happy!

# 🤝 Need help

If you need help with setting up the boilerplate or have other questions - don't hesitate to write in our community forum and we will check asap. [Forum link](https://forum.moralis.io). The best thing about this SDK is the super active community ready to help at any time! We help each other.

# 🧭 Table of Contents

- [🚀 Quick start](#-quick-start)
  - [1. Install Dependencies](#1-install-dependencies)
  - [2. Create environment variables file](#2-create-environment-variables-file)
  - [3. Create API route](#2-create-api-route)
- [⭐️ Star us](#️-star-us)
- [🤝 Need help](#-need-help)
- [🧭 Table of Contents](#-table-of-contents)
- [🔐 Authentication and Session Management with NextAuth](#️-authentication-and-session-management-with-nextauth)
- [✨ Hook Usage Examples](#️-hook-usage-examples)
  - [1. Provide params directly to the hook](#1-provide-params-directly-to-the-hook)
  - [2. Provide params to the fetch()](#2-provide-params-to-the-fetch)
  - [3. Disable Auto Data Fetching](#3-disable-auto-data-fetching)
- [⚙️ Hook Advanced Config](#️-hook-advanced-config)
- [Authentication Api Hooks](#authentication-api-hooks)
  - [useAuthRequestChallengeSolana](#️useAuthRequestChallengeSolana)
  - [useAuthRequestChallengeEvm](#useAuthRequestChallengeEvm)
- [Evm Api Hooks](#evm-api-hooks)
  - [useEvmWeb3ApiVersion](#️useEvmWeb3ApiVersion)
  - [useEvmRunContractFunction](#️useEvmRunContractFunction)
  - [useEvmEndpointWeights](#️useEvmEndpointWeights)
  - [useEvmWalletTransactions](#️useEvmWalletTransactions)
  - [useEvmTransaction](#️useEvmTransaction)
  - [useEvmWalletTokenTransfers](#️useEvmWalletTokenTransfers)
  - [useEvmWalletTokenBalances](#️useEvmWalletTokenBalances)
  - [useEvmTokenTransfers](#️useEvmTokenTransfers)
  - [useEvmTokenPrice](#️useEvmTokenPrice)
  - [useEvmTokenMetadata](#️useEvmTokenMetadata)
  - [useEvmTokenMetadataBySymbol](#️useEvmTokenMetadataBySymbol)
  - [useEvmTokenAllowance](#️useEvmTokenAllowance)
  - [useEvmResolveDomain](#️useEvmResolveDomain)
  - [useEvmResolveAddress](#️useEvmResolveAddress)
  - [useEvmSyncNFTContract](#️useEvmSyncNFTContract)
  - [useEvmSearchNFTs](#️useEvmSearchNFTs)
  - [useEvmReSyncMetadata](#️useEvmReSyncMetadata)
  - [useEvmWalletNFTs](#️useEvmWalletNFTs)
  - [useEvmWalletNFTTransfers](#️useEvmWalletNFTTransfers)
  - [useEvmWalletNFTCollections](#️useEvmWalletNFTCollections)
  - [useEvmNFTTransfers](#️useEvmNFTTransfers)
  - [useEvmNFTTransfersFromToBlock](#️useEvmNFTTransfersFromToBlock)
  - [useEvmNFTTransfersByBlock](#️useEvmNFTTransfersByBlock)
  - [useEvmNFTTrades](#️useEvmNFTTrades)
  - [useEvmNFTTokenIdOwners](#️useEvmNFTTokenIdOwners)
  - [useEvmNFTOwners](#️useEvmNFTOwners)
  - [useEvmNFTMetadata](#️useEvmNFTMetadata)
  - [useEvmNFTLowestPrice](#️useEvmNFTLowestPrice)
  - [useEvmNFTContractTransfers](#️useEvmNFTContractTransfers)
  - [useEvmNFTContractMetadata](#️useEvmNFTContractMetadata)
  - [useEvmContractNFTs](#️useEvmContractNFTs)
  - [useEvmUploadFolder](#️useEvmUploadFolder)
  - [useEvmContractLogs](#️useEvmContractLogs)
  - [useEvmContractEvents](#️useEvmContractEvents)
  - [useEvmPairReserves](#️useEvmPairReserves)
  - [useEvmPairAddress](#️useEvmPairAddress)
  - [useEvmDateToBlock](#️useEvmDateToBlock)
  - [useEvmBlock](#️useEvmBlock)
  - [useEvmNativeBalance](#️useEvmNativeBalance)
- [Solana Api Hooks](#solana-api-hooks)
  - [useSolTokenPrice](#️useSolTokenPrice)
  - [useSolNFTMetadata](#️useSolNFTMetadata)
  - [useSolSPL](#️useSolSPL)
  - [useSolPortfolio](#️useSolPortfolio)
  - [useSolNFTs](#️useSolNFTs)
  - [useSolBalance](#️useSolBalance)
- [🧙‍♂️ Community](#️-community)

# 🔐 Authentication and Session Management with NextAuth

The `@moralisweb3/next` library provides first class tools for web3 authentication. Using the [NextAuth.js](https://next-auth.js.org/) and our custom `MoralisNextAuthProvider()` you can implement web3 authentication you can create web3 authentication for any web3 wallet.

Please follow [Sign In with MetaMask](https://docs.moralis.io/docs/sign-in-with-metamask) Tutorial for NextJS.

# ✨ Hook Usage Examples

```jsx
import { useEvmWalletTokenBalances } from '@moralisweb3/next'

const App = () => {
  const { data: balance, error, fetch, isFetching } = useEvmWalletTokenBalances({ address: '0x...' })

  if (isFetching) return <div>Fetching/Refreshing balance…</div>
  if (error) return <div>{JSON.stringify(error, null, 2)}</div>
  return (
    <>
      <button onClick={fetch}>Refetch Balance</button>
      <div>{JSON.stringify(balance, null, 2)}</div>
    </>
  )
}
```

Basically, there are three options how to fetch data with `@moralisweb3/next` hooks:

## 1. Provide params directly to the hook
In case all required params for the hook are defined you can provide them directly to the hook params. Data fetching in this case will be triggered automatically:
```jsx
import { useEvmWalletTokenBalances } from '@moralisweb3/next'

const App = () => {
  const { data: balance } = useEvmWalletTokenBalances({ address: '0x...' })

  return (
      <div>{JSON.stringify(balance, null, 2)}</div>
  )
}
```

## 2. Provide params to the fetch()
Sometimes you need to fetch data somewhere in your code or even fetch it twice with different variables. You can provide params to the `fetch()` function:
```jsx
import { useState } from 'react';
import { useEvmNativeBalance } from '@moralisweb3/next'
import { EvmChain } from 'moralis/common-evm-utils';

const App = () => {
  const { fetch } = useEvmNativeBalance();
  const [ethBalance, setEthBalance] = useState('');
  const [bnbBalance, setBnbBalance] = useState('');

  const fetchBalanceForEthereum = async () => {
    const response = await fetch({ address: '0x...', chain: EvmChain.ETHEREUM });
    if (response?.balance) {
      setEthBalance(response.balance.ether);
    }
  };

  const fetchBalanceForBsc = async () => {
    const response = await fetch({ address: '0x...', chain: EvmChain.BSC });
    if (response?.balance) {
      setBnbBalance(response.balance.ether);
    }
  };

  return (
    <div>
      <button onClick={fetchBalanceForEthereum}>Fetch Balance For Ethereum</button>
      <button onClick={fetchBalanceForBsc}>Fetch Balance For BSC</button>
      <p>Ethereum Balance: {ethBalance} Ether</p>
      <p>Binance Balance: {bnbBalance} BNB</p>
    </div>
  )
}
```
## 3. Disable Auto Data Fetching
To disable auto data fetching after your component has been mounted you can set `revalidateOnMount = false`. Example:

```jsx
import { useEvmWalletTokenBalances } from '@moralisweb3/next'

const App = () => {
  const { data: balance, fetch } = useEvmWalletTokenBalances({ address: '0x...' }, { revalidateOnMount: false })

  return (
    <>
      <button onClick={fetch}>Fetch Balance Manually</button>
      <div>{JSON.stringify(balance, null, 2)}</div>
    </>
  )
}
```

# ⚙️ Hook Advanced Config

The `@moralisweb3/next` hooks use [SWR](https://swr.vercel.app/) for a better developer experience. You can provide [config object](https://swr.vercel.app/docs/options#options) to the hooks as it's shown bellow:

```jsx
const { data } = useEvmWalletTokenBalances({ address: '0x...' }, { revalidateOnFocus: true })
```

# Authentication Api Hooks

## `useAuthRequestChallengeSolana()` 

The back channel challenge containing the id to store on the api and the message to be signed by the user

### Params:
```ts
{
  address: SolAddressish;
  network: SolNetworkish;
  expirationTime?: DateInput;
  notBefore?: DateInput;
}; 
```

### Response:
```ts
{ id: string; message: string; profileId: string }; 
```

## `useAuthRequestChallengeEvm()` 

The back channel challenge containing the id to store on the api and the message to be signed by the user

### Params:
```ts
{
  address: EvmAddressish;
  chainId: EvmChainish;
  expirationTime?: DateInput;
  notBefore?: DateInput;
}; 
```

### Response:
```ts
{ id: string; message: string; profileId: string }; 
```

# Evm Api Hooks
## `useEvmWeb3ApiVersion()` 

Get the current version of the Moralis Web3 API.


### Response:
```ts
{ version: string }; 
```

## `useEvmRunContractFunction()` 

Run a given function of a contract ABI and retrieve readonly data.

### Params:
```ts
{ chain?: EvmChainish; address: EvmAddressish; abi: unknown }; 
```

### Response:
```ts
string
```

## `useEvmEndpointWeights()` 

Get the endpoint price list for rate limits and cost.


### Response:
```ts
{
  endpoint: string;
  path: string;
  rateLimitWeight: string;
  price: string;
}[]; 
```

## `useEvmWalletTransactions()` 

Get native transactions ordered by block number in descending order.

### Params:
```ts
{
  chain?: EvmChainish;
  address: EvmAddressish;
  fromDate?: DateInput;
  toDate?: DateInput;
}; 
```

### Response:
```ts
EvmTransaction[]
```

## `useEvmTransaction()` 

Get the contents of a transaction by the given transaction hash.

### Params:
```ts
{ chain?: EvmChainish }; 
```

### Response:
```ts
EvmTransaction
```

## `useEvmWalletTokenTransfers()` 

Get ERC20 token transactions ordered by block number in descending order.

### Params:
```ts
{
  chain?: EvmChainish;
  address: EvmAddressish;
  fromDate?: DateInput;
  toDate?: DateInput;
}; 
```

### Response:
```ts
Erc20Transfer[]
```

## `useEvmWalletTokenBalances()` 

Get token balances for a specific wallet address.

### Params:
```ts
{
  chain?: EvmChainish;
  tokenAddresses?: EvmAddressish[];
  address: EvmAddressish;
}; 
```

### Response:
```ts
Erc20Value[]
```

## `useEvmTokenTransfers()` 

Get ERC20 token transactions from a contract ordered by block number in descending order.

### Params:
```ts
{
  chain?: EvmChainish;
  address: EvmAddressish;
  fromDate?: DateInput;
  toDate?: DateInput;
}; 
```

### Response:
```ts
Erc20Transfer[]
```

## `useEvmTokenPrice()` 

Get the token price denominated in the blockchains native token and USD.

### Params:
```ts
{ chain?: EvmChainish; address: EvmAddressish }; 
```

### Response:
```ts
{
  nativePrice: EvmNative | null;
  exchangeAddress: EvmAddress | null;
  usdPrice: number;
  exchangeName?: string | undefined;
}; 
```

## `useEvmTokenMetadata()` 

Get the metadata for a given token contract address (name, symbol, decimals, logo).

### Params:
```ts
{ chain?: EvmChainish; addresses: EvmAddressish[] }; 
```

### Response:
```ts
{
  token: Erc20Token;
  blockNumber: string | undefined;
  validated: string | undefined;
}[]; 
```

## `useEvmTokenMetadataBySymbol()` 

Get metadata for a list of token symbols (name, symbol, decimals, logo).

### Params:
```ts
{ chain?: EvmChainish }; 
```

### Response:
```ts
{
  token: Erc20Token;
  blockNumber: string || undefined;
}[]; 
```

## `useEvmTokenAllowance()` 

Get the amount which the spender is allowed to withdraw on behalf of the owner.

### Params:
```ts
{
  chain?: EvmChainish;
  ownerAddress: EvmAddressish;
  spenderAddress: EvmAddressish;
  address: EvmAddressish;
}; 
```

### Response:
```ts
{ allowance: BigNumber }; 
```

## `useEvmResolveDomain()` 

Resolve an Unstoppable domain and get the address.


### Response:
```ts
{ address: EvmAddress }; 
```

## `useEvmResolveAddress()` 

Resolve an ETH address and find the ENS name.

### Params:
```ts
{ address?: EvmAddressish }; 
```

### Response:
```ts
{ name: string }; 
```

## `useEvmSyncNFTContract()` 

Initiates a sync of a previously non synced Contract.

### Params:
```ts
{ chain?: EvmChainish; address: EvmAddressish }; 
```

### Response:
```ts
{ success: boolean }; 
```

## `useEvmSearchNFTs()` 

Get NFTs that match a given metadata search query.

### Params:
```ts
{
  chain?: EvmChainish;
  addresses?: EvmAddressish[];
  fromDate?: DateInput;
  toDate?: DateInput;
}; 
```

### Response:
```ts
{
  token: EvmNft;
  tokenHash: string;
  blockNumberMinted: string;
  lastMetadataSync: Date | undefined;
  lastTokenUriSync: Date | undefined;
  batchId: string;
  frozen: number;
  frozenLogIndex: { [key: string]: unknown } | undefined;
  imported: { [key: string]: unknown } | undefined;
  isValid: number;
  openseaLookup: { [key: string]: unknown } | undefined;
  resyncing: number;
  syncing: number;
  updatedAt: Date;
}[]; 
```

## `useEvmReSyncMetadata()` 


ReSync the metadata for an NFT
* The metadata flag will request a the NFT's metadata from the already existing token_uri
* The uri(default) flag will fetch the latest token_uri from the given NFT address. In sync mode the metadata will also be fetched
* The sync mode will make the endpoint synchronous so it will wait for the task to be completed before responding
* The async mode(default) will make the endpoint asynchronous so we will wait for the task to be completed before responding

### Params:
```ts
{ chain?: EvmChainish; address: EvmAddressish }; 
```

### Response:
```ts
{ status: string }; 
```

## `useEvmWalletNFTs()` 


Get NFTs owned by a given address.
* The response will include status [SYNCED/SYNCING] based on the contracts being indexed.
* Use the token_address param to get results for a specific contract only
* Note results will include all indexed NFTs
* Any request which includes the token_address param will start the indexing process for that NFT collection the very first time it is requested.

### Params:
```ts
{
  chain?: EvmChainish;
  tokenAddresses?: EvmAddressish[];
  address: EvmAddressish;
}; 
```

### Response:
```ts
EvmNft[]
```

## `useEvmWalletNFTTransfers()` 

Get transfers of NFTs given the wallet and other parameters.

### Params:
```ts
{ chain?: EvmChainish; address: EvmAddressish }; 
```

### Response:
```ts
EvmNftTransfer[]
```

## `useEvmWalletNFTCollections()` 

Get NFT collections owned by a given wallet address.

### Params:
```ts
{ chain?: EvmChainish; address: EvmAddressish }; 
```

### Response:
```ts
EvmNftCollection[]
```

## `useEvmNFTTransfers()` 

Get transfers of an NFT given a contract address and token ID.

### Params:
```ts
{ chain?: EvmChainish; address: EvmAddressish }; 
```

### Response:
```ts
EvmNftTransfer[]
```

## `useEvmNFTTransfersFromToBlock()` 

Get transfers of NFTs from a block number to a block number.

### Params:
```ts
{ chain?: EvmChainish; fromDate?: DateInput; toDate?: DateInput }; 
```

### Response:
```ts
EvmNftTransfer[]
```

## `useEvmNFTTransfersByBlock()` 

Get transfers of NFTs given a block number or block hash.

### Params:
```ts
{ chain?: EvmChainish }; 
```

### Response:
```ts
EvmNftTransfer[]
```

## `useEvmNFTTrades()` 

Get trades of NFTs for a given contract and marketplace.

### Params:
```ts
{
  chain?: EvmChainish;
  address: EvmAddressish;
  fromDate?: DateInput;
  toDate?: DateInput;
}; 
```

### Response:
```ts
EvmNftTrade[]
```

## `useEvmNFTTokenIdOwners()` 


Get owners of a specific NFT given the contract address and token ID.
* Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection

### Params:
```ts
{ chain?: EvmChainish; address: EvmAddressish }; 
```

### Response:
```ts
EvmNft[]
```

## `useEvmNFTOwners()` 


Get owners of NFTs for a given contract.
* Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection.

### Params:
```ts
{ chain?: EvmChainish; address: EvmAddressish }; 
```

### Response:
```ts
EvmNft[]
```

## `useEvmNFTMetadata()` 


Get NFT data, including metadata (where available), for the given NFT token ID and contract address.
* Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection

### Params:
```ts
{ chain?: EvmChainish; address: EvmAddressish }; 
```

### Response:
```ts
EvmNft
```

## `useEvmNFTLowestPrice()` 

Get the lowest executed price for an NFT contract for the last x days (only trades paid in ETH).

### Params:
```ts
{ chain?: EvmChainish; address: EvmAddressish }; 
```

### Response:
```ts
EvmNftTrade
```

## `useEvmNFTContractTransfers()` 

Get transfers of NFTs for a given contract and other parameters.

### Params:
```ts
{ chain?: EvmChainish; address: EvmAddressish }; 
```

### Response:
```ts
EvmNftTransfer[]
```

## `useEvmNFTContractMetadata()` 


Get the collection / contract level metadata for a given contract (name, symbol, base token uri).
* Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection

### Params:
```ts
{ chain?: EvmChainish; address: EvmAddressish }; 
```

### Response:
```ts
EvmNftMetadata
```

## `useEvmContractNFTs()` 


Get NFTs for a given contract address, including metadata for all NFTs (where available).
* Results are limited to 100 per page by default
* Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection.

### Params:
```ts
{ chain?: EvmChainish; address: EvmAddressish }; 
```

### Response:
```ts
EvmNft[]
```

## `useEvmUploadFolder()` 

Upload multiple files to IPFS and place them in a folder directory.

### Params:
```ts
{
  abi: {
    path: string;
    content: string;
  }[];
}; 
```

### Response:
```ts
{ path: string }[]; 
```

## `useEvmContractLogs()` 

Get the logs for a contract.

### Params:
```ts
{
  chain?: EvmChainish;
  address: EvmAddressish;
  fromDate?: DateInput;
  toDate?: DateInput;
}; 
```

### Response:
```ts
EvmTransactionLog[]
```

## `useEvmContractEvents()` 

Get events for a contract ordered by block number in descending order.

### Params:
```ts
{
  chain?: EvmChainish;
  address: EvmAddressish;
  abi: unknown;
  fromDate?: DateInput;
  toDate?: DateInput;
}; 
```

### Response:
```ts
EvmEvent[]
```

## `useEvmPairReserves()` 

Get the liquidity reserves for a given pair address. Only Uniswap V2 based exchanges supported at the moment.

### Params:
```ts
{
  chain?: EvmChainish;
  pairAddress: EvmAddressish;
  toDate?: DateInput;
}; 
```

### Response:
```ts
{ reserve0?: string | undefined; reserve1?: string | undefined }; 
```

## `useEvmPairAddress()` 


Fetch the pair data of the provided token0+token1 combination.
The token0 and token1 options are interchangable (ie. there is no different outcome in "token0=WETH and token1=USDT" or "token0=USDT and token1=WETH")

### Params:
```ts
{
  chain?: EvmChainish;
  token0Address: EvmAddressish;
  token1Address: EvmAddressish;
  toDate?: DateInput;
}; 
```

### Response:
```ts
{
  token0: {
    token: Erc20Token;
    blockNumber: string | undefined;
    validated: number | undefined;
    createdAt: Date | undefined;
  };
  token1: {
    token: Erc20Token;
    blockNumber: string | undefined;
    validated: number | undefined;
    createdAt: Date | undefined;
  };
  pairAddress: EvmAddress | undefined;
};
```
## `useEvmDateToBlock()` 

Get the closest block given the date.

### Params:
```ts
{ chain?: EvmChainish; date: DateInput }; 
```

### Response:
```ts
{ date: Date; block: number; timestamp: number }; 
```

## `useEvmBlock()` 

Get the contents of a block given the block hash.

### Params:
```ts
{ chain?: EvmChainish }; 
```

### Response:
```ts
EvmBlock
```

## `useEvmNativeBalance()` 

Get the native balance for a specific wallet address.

### Params:
```ts
{ chain?: EvmChainish; address: EvmAddressish }; 
```

### Response:
```ts
{ balance: EvmNative }; 
```


# Solana Api Hooks
## `useSolTokenPrice()` 

Gets the token price (usd and native) for a given contract address and network

### Params:
```ts
{ network?: SolNetworkish; address: SolAddressish }; 
```

### Response:
```ts
{
  nativePrice: {
    value: SolNative;
    decimals: number;
    name: string;
    symbol: string;
  };
  usdPrice: number;
  exchangeAddress: SolAddress;
  exchangeName: string;
}; 
```

## `useSolNFTMetadata()` 

Gets the contract level metadata (mint, standard, name, symbol, metaplex) for the given network and contract

### Params:
```ts
{ network?: SolNetworkish; address: SolAddressish }; 
```

### Response:
```ts
{
  mint: SolAddress;
  standard: string;
  name: string;
  symbol: string;
  metaplex: {
    metadataUri: string;
    updateAuthority: SolAddress;
    sellerFeeBasisPoints: number;
    primarySaleHappened: boolean;
    isMutable: boolean;
    masterEdition: boolean;
  };
}; 
```

## `useSolSPL()` 

Gets token balances owned by the given network and address

### Params:
```ts
{ network?: SolNetworkish; address: SolAddressish }; 
```

### Response:
```ts
{
  associatedTokenAddress: SolAddress;
  mint: SolAddress;
  amount: SolNative;
}[]; 
```

## `useSolPortfolio()` 

Gets the portfolio of the given network and address

### Params:
```ts
{ network?: SolNetworkish; address: SolAddressish }; 
```

### Response:
```ts
{
  nativeBalance: SolNative;
  nfts: { associatedTokenAddress: SolAddress; mint: SolAddress }[];
  tokens: {
    associatedTokenAddress: SolAddress;
    mint: SolAddress;
    amount: SolNative;
  }[];
}; 
```

## `useSolNFTs()` 

Gets NFTs owned by the given network and address

### Params:
```ts
{ network?: SolNetworkish; address: SolAddressish }; 
```

### Response:
```ts
{ associatedTokenAddress: SolAddress; mint: SolAddress }[]; 
```

## `useSolBalance()` 

Gets native balance owned by the given network and address

### Params:
```ts
{ network?: SolNetworkish; address: SolAddressish }; 
```

### Response:
```ts
SolNative
```


# 🧙‍♂️ Community

- [Discord](https://discord.gg/moralis)
- [Forum](https://forum.moralis.io)