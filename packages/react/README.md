<div align="center">
    <p align="center">
      <img src="https://raw.githubusercontent.com/MoralisWeb3/Moralis-JS-SDK/main/packages/react/.readme/MoralisLogo.png" alt="Moralis React" />
    </p>
</div>

<div align="center">

![npm](https://img.shields.io/npm/v/@moralisweb3/react)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@moralisweb3/react)
![npm type definitions](https://img.shields.io/npm/types/@moralisweb3/react)

</div>

# `@moralisweb3/react`

> Moralis Hooks for your React project

This project is a thin React wrapper around [Moralis](https://moralis.io/), to easily call functionalities and display data. It  serves as a proxy, to allow users to access Moralis APIs in client-side.

Please check the [official documentation of Moralis](https://docs.moralis.io/) for all the functionalities of Moralis.

# 🚀 Quick start

### 1. Install Dependencies

Make sure to have `react` and `react-dom` installed as dependencies, then install `@moralisweb3/react`

In short:

```sh
npm install @moralisweb3/react react react-dom
```

or

```sh
yarn add  @moralisweb3/react react react-dom
```

### 2. Add MoralisProvider

Then wrap your app in a <MoralisProvider>, and prepare a config object with your apiKey using `createMoralisConfig`. Pass the config as a prop to the `MoralisProvider`

```js
import React from "react";
import ReactDOM from "react-dom";
import { MoralisProvider, createMoralisConfig } from "@moralisweb3/react";

const moralisConfig = createMoralisConfig({
  apiKey: "MORALIS_API_KEY",
});

ReactDOM.render(
  <MoralisProvider config={moralisConfig}>
    <App />
  </MoralisProvider>,
  document.getElementById("root"),
);
```

# ⭐️ Star us

If this "@moralisweb3/react" library helps you build your dapps faster - please star this project, every star makes us very happy!

# 🤝 Need help

If you need help with setting up the boilerplate or have other questions - don't hesitate to write in our community forum and we will check asap. [Forum link](https://forum.moralis.io). The best thing about this SDK is the super active community ready to help at any time! We help each other.

# 🧭 Table of Contents

- [🚀 Quick start](#-quick-start)
  - [1. Install Dependencies](#1-install-dependencies)
  - [2. Add MoralisProvider](#2-add-moralisprovider)
- [⭐️ Star us](#️-star-us)
- [🤝 Need help](#-need-help)
- [🧭 Table of Contents](#-table-of-contents)
- [✨ Hook Usage Examples](#️-hook-usage-examples)
  - [1. Provide params directly to the hook](#1-provide-params-directly-to-the-hook)
  - [2. Provide params to the fetch()](#2-provide-params-to-the-fetch)
  - [3. Provide fetching options](#3-provide-fetching-options)
- [EvmApi Hooks](#EvmApi-hooks)
  - [useEvmNativeBalance](#useEvmNativeBalance)
  - [useEvmNativeBalancesForAddresses](#useEvmNativeBalancesForAddresses)
  - [useEvmBlock](#useEvmBlock)
  - [useEvmDateToBlock](#useEvmDateToBlock)
  - [useEvmPairAddress](#useEvmPairAddress)
  - [useEvmPairReserves](#useEvmPairReserves)
  - [useEvmContractEvents](#useEvmContractEvents)
  - [useEvmContractLogs](#useEvmContractLogs)
  - [useEvmUploadFolder](#useEvmUploadFolder)
  - [useEvmContractNFTs](#useEvmContractNFTs)
  - [useEvmMultipleNFTs](#useEvmMultipleNFTs)
  - [useEvmNFTContractMetadata](#useEvmNFTContractMetadata)
  - [useEvmNFTContractTransfers](#useEvmNFTContractTransfers)
  - [useEvmNFTLowestPrice](#useEvmNFTLowestPrice)
  - [useEvmNFTMetadata](#useEvmNFTMetadata)
  - [useEvmNFTOwners](#useEvmNFTOwners)
  - [useEvmNFTTokenIdOwners](#useEvmNFTTokenIdOwners)
  - [useEvmNFTTrades](#useEvmNFTTrades)
  - [useEvmNFTTransfersByBlock](#useEvmNFTTransfersByBlock)
  - [useEvmNFTTransfersFromToBlock](#useEvmNFTTransfersFromToBlock)
  - [useEvmNFTTransfers](#useEvmNFTTransfers)
  - [useEvmWalletNFTCollections](#useEvmWalletNFTCollections)
  - [useEvmWalletNFTs](#useEvmWalletNFTs)
  - [useEvmWalletNFTTransfers](#useEvmWalletNFTTransfers)
  - [useEvmReSyncMetadata](#useEvmReSyncMetadata)
  - [useEvmSearchNFTs](#useEvmSearchNFTs)
  - [useEvmSyncNFTContract](#useEvmSyncNFTContract)
  - [useEvmResolveAddress](#useEvmResolveAddress)
  - [useEvmResolveDomain](#useEvmResolveDomain)
  - [useEvmTokenAllowance](#useEvmTokenAllowance)
  - [useEvmTokenMetadataBySymbol](#useEvmTokenMetadataBySymbol)
  - [useEvmTokenMetadata](#useEvmTokenMetadata)
  - [useEvmTokenPrice](#useEvmTokenPrice)
  - [useEvmTokenTransfers](#useEvmTokenTransfers)
  - [useEvmWalletTokenBalances](#useEvmWalletTokenBalances)
  - [useEvmWalletTokenTransfers](#useEvmWalletTokenTransfers)
  - [useEvmTransaction](#useEvmTransaction)
  - [useEvmWalletTransactions](#useEvmWalletTransactions)
  - [useEvmWalletTransactionsVerbose](#useEvmWalletTransactionsVerbose)
  - [useEvmEndpointWeights](#useEvmEndpointWeights)
  - [useEvmRunContractFunction](#useEvmRunContractFunction)
  - [useEvmWeb3ApiVersion](#useEvmWeb3ApiVersion)
- [SolApi Hooks](#SolApi-hooks)
  - [useSolBalance](#useSolBalance)
  - [useSolNFTs](#useSolNFTs)
  - [useSolPortfolio](#useSolPortfolio)
  - [useSolSPL](#useSolSPL)
  - [useSolNFTMetadata](#useSolNFTMetadata)
  - [useSolTokenPrice](#useSolTokenPrice)
- [⚙️ Advanced Config](#️-advanced-config)
  - [Moralis instance config](#moralis-instance-config)
  - [Data fetching config](#data-fetching-config)
- [📦 Webpack v5 support](#️-webpack-v5-support)
  - [Configuring Webpack v5](#configuring-webpack-v5)
  - [create-react-app](#create-react-app)
- [🧙‍♂️ Community](#️-community)

# ✨ Hook Usage Examples

```jsx
import { useEvmWalletTokenBalances } from '@moralisweb3/react'

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

Basically, there are three options how to fetch data with `@moralisweb3/react` hooks:

## 1. Provide params directly to the hook
In case all required params for the hook are defined you can provide them directly to the hook params. Data fetching in this case will be triggered automatically:
```jsx
import { useEvmWalletTokenBalances } from '@moralisweb3/react'

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
import { useEvmNativeBalance } from '@moralisweb3/react'
import { EvmChain } from 'moralis/common-evm-utils';

const App = () => {
  const { fetch } = useEvmNativeBalance();
  const [ethBalance, setEthBalance] = useState('');
  const [bnbBalance, setBnbBalance] = useState('');

  const fetchBalanceForEthereum = async () => {
    const response = await fetch({ address: '0x...', chain: EvmChain.ETHEREUM.hex });
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

## 3. Provide fetching options
It's possible to set fallbacks or change settings of data fetching per hook. These options will override `config` provided to `MoralisProvider`.

```jsx
import { useEvmNativeBalance } from '@moralisweb3/react'
import { EvmChain } from 'moralis/common-evm-utils';

const App = () => {
  const { fetch, ethBalance } = useEvmNativeBalance(
    {
      address: '0x...',
    },
    {
      onSuccess: (res) => console.log(res),
      refreshInterval: 3000,
    },
  );

  return (
    <div>
      <p>Ethereum Balance: {ethBalance} Ether</p>
    </div>
  )
}
```
You can find more fetch data options in [Data fetching config](#️data-fetching-config) section.

# EvmApi Hooks

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

## `useEvmNativeBalancesForAddresses()` 

Get the native balances for a set of specific addresses

### Params:
```ts
{ chain?: EvmChainish; walletAddresses: EvmAddressish[] }; 
```

### Response:
```ts
{
  chain: import(&quot;E:/Work/Moralis/Moralis-JS-SDK/packages/common/evmUtils/src/dataTypes/index&quot;).EvmChain;
  blockNumber: string;
  blockTimestamp: string;
  totalBalance: EvmNative;
  walletBalances: { address: EvmAddress; balance: EvmNative }[];
}[]; 
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

## `useEvmDateToBlock()` 

Get the closest block given the date.

### Params:
```ts
{ chain?: EvmChainish; date: DateInput }; 
```

### Response:
```ts
EvmBlockDate
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

## `useEvmContractEvents()` 

Get events for a contract ordered by block number in descending order.

### Params:
```ts
{
  chain?: EvmChainish;
  address: EvmAddressish;
  abi: EvmAbiItem;
  fromDate?: DateInput;
  toDate?: DateInput;
}; 
```

### Response:
```ts
EvmEvent[]
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

## `useEvmMultipleNFTs()` 


Get NFTs for a given contract address, including metadata for all NFTs (where available).
* Results are limited to 100 per page by default
* Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection.

### Params:
```ts
{
  chain?: EvmChainish;
  tokens: {
    tokenAddress: EvmAddressish;
    tokenId: string;
  }[];
}; 
```

### Response:
```ts
(EvmNft | null)[]
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

## `useEvmNFTContractTransfers()` 

Get transfers of NFTs for a given contract and other parameters.

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
EvmNftTransfer[]
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

## `useEvmResolveDomain()` 

Resolve an Unstoppable domain and get the address.


### Response:
```ts
{ address: EvmAddress }; 
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
  blockNumber: string | undefined;
  validated: string | undefined;
}[]; 
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

## `useEvmWalletTransactionsVerbose()` 

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

## `useEvmEndpointWeights()` 

Get the endpoint price list for rate limits and cost.


### Response:
```ts
{
  endpoint: string;
  path: string;
  rateLimitCost: string;
  price: string;
}[]; 
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

## `useEvmWeb3ApiVersion()` 

Get the current version of the Moralis Web3 API.


### Response:
```ts
{ version: string }; 
```


# SolApi Hooks

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



# ⚙️ Advanced Config
The `config` property for `MoralisProvider` can be used not only to specify the API key, but also for additional Moralis instance settings and request fetching settings. Example:

```js
import React from "react";
import ReactDOM from "react-dom";
import { MoralisProvider, createMoralisConfig } from "@moralisweb3/react";

const moralisConfig = createMoralisConfig({ 
  apiKey: 'YOUR_API_KEY',
  formatEvmAddress: 'checksum',
  formatEvmChainId: 'decimal',
  logLevel: 'verbose',
  refreshInterval: 3000,
  revalidateOnFocus: true,
})

ReactDOM.render(
  <MoralisProvider config={moralisConfig}>
    <App />
  </MoralisProvider>,
  document.getElementById("root"),
);
```

Below, you can find the possible options for the `config`:

### Moralis instance config:

| Option             | Description                                                          | Default     | Required |
| -------------------| ---------------------------------------------------------------------|-------------|-------------------|
| `apiKey`           | Your Moralis ApiKey	                                                | `null`      |  yes  | 
| `formatEvmAddress` | Format style for evm addresses. Possible values: `'lowercase'`, `'checksum'`|`'lowercase'`|  no  | 
| `formatEvmChainId` | 	Format style for chains. Possible values: `'decimal'`, `'hex'`      |`'hex'`      |  no  | 
| `logLevel`         | 	Level of detail for log messages. Possible values: `'verbose'`, `'debug'`, `'info'`, `'warning'`, `'error'`, `'off'`|`'info'`|  no  | 
| `defaultSolNetwork`| 	Default network for Solana. Possible values: `SolNetworkish` type         |`'mainnet'`|  no  | 
| `defaultEvmApiChain`| 	Default chain for Evm. Possible values: `EvmChainish` type        |`'0x1'`      |  no  | 

### Data fetching config:

| Option             | Description                                                          | Default     | Required |
| -------------------| ---------------------------------------------------------------------|-------------|-------------------|
| `onSuccess(data, key, config)`| Callback function when a request finishes successfully	       | `null`      |  no  | 
| `onError(err, key, config)`| 	Callback function when a request returns an error       | `null`      |  no  | 
| `onErrorRetry(err, key, config, revalidate, revalidateOps)`| Handler for error retry	       | `null`      |  no  | 
| `onDiscarded(key)`|  Callback function when a request is ignored due to race conditions	       | `null`      |  no  | 
| `revalidateIfStale`| 	Automatically revalidate even if there is stale data       | `true`      |  no  | 
| `revalidateOnMount`| 	Enable or disable automatic revalidation when component is mounted       | `null`      |  no  | 
| `revalidateOnFocus `| Automatically revalidate when window gets focused	       | `false`      |  no  | 
| `revalidateOnReconnect`| Automatically revalidate when the browser regains a network connection	       | `true`      |  no  | 
| `refreshInterval`| 	Disabled by default: refreshInterval = 0. If set to a number, polling interval in milliseconds. If set to a function, the function will receive the latest data and should return the interval in milliseconds       | `0`      |  no  | 
| `refreshWhenHidden`| 	Polling when the window is invisible (if refreshInterval is enabled)       | `false`      |  no  | 
| `refreshWhenOffline`| Polling when the browser is offline	       | `false`      |  no  | 
| `shouldRetryOnError`| Retry when fetcher has an error	       | `true`      |  no  | 
| `dedupingInterval`| Dedupe requests with the same key in this time span in milliseconds	       | `2000`      |  no  | 
| `focusThrottleInterval `| Only revalidate once during a time span in milliseconds	       | `5000`      |  no  | 
| `loadingTimeout `| 	Timeout to trigger the onLoadingSlow event in milliseconds       | `3000`      |  no  | 
| `errorRetryInterval `|  Error retry interval in milliseconds	       | `5000`      |  no  | 
| `errorRetryCount`| 	Mxx error retry count       | `null`      |  no  | 
| `fallback`|  A key-value object of multiple fallback data	       | `null`      |  no  | 
| `fallbackData`| Initial data to be returned (note: This is per-hook)	       | `null`      |  no  | 
| `keepPreviousData`| Return the previous key's data until the new data has been loaded	       | `false`      |  no  | 


The `@moralisweb3/react` hooks use [SWR](https://swr.vercel.app/) for a better developer experience while using API calls.

# 📦 Webpack v5 support

You may see the following error in your project:

```js
BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
This is no longer the case. Verify if you need this module and configure a polyfill for it.
```

There are a lot of breaking changes in Webpack v5. Set up your project to work with `react-moralis`:

## Configuring Webpack v5

```js
module.exports = {
    resolve: {
        fallback: {
            assert: require.resolve('assert'),
            crypto: require.resolve('crypto-browserify'),
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            os: require.resolve('os-browserify/browser'),
            stream: require.resolve('stream-browserify'),
        },
    },
};
```

## create-react-app

To be able to work with react-moralis on the create-react-app project you need to override default webpack config by using libraries like [react-app-rewired](https://www.npmjs.com/package/react-app-rewired).

Create `config-overrides.js` file at your root with  following content:
```js
const webpack = require('webpack');
module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    assert: require.resolve('assert'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    os: require.resolve('os-browserify'),
    url: require.resolve('url'),
    zlib: require.resolve('browserify-zlib'),
  });
  config.resolve.fallback = fallback;
  config.module.rules = config.module.rules.map((rule) => {
    if (rule.oneOf instanceof Array) {
      rule.oneOf[rule.oneOf.length - 1].exclude = [/\.(js|mjs|jsx|cjs|ts|tsx)$/, /\.html$/, /\.json$/];
    }
    return rule;
  });
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
      Buffer: ['buffer', 'Buffer'],
    }),
  ]);
  return config;
};
```

# 🧙‍♂️ Community

- [Discord](https://discord.gg/moralis)
- [Forum](https://forum.moralis.io)