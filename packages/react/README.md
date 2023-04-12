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

# 💥 Features

- 45+ hooks for easy and fast blockchain data accessing
- NFT, Balance, Events, DeFi, Token, Transaction, Block, Resolve and more react hooks
- [Cross-chain compatible](#supported-chains)
- Optimized, Lightweight, supports Cache persistence and Request duplication safe
- TypeScript support out-of-box
- Easy setup, but with a lot of [configuration options](#️-advanced-config)

...and more

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

Then wrap your app in a <MoralisProvider>, and pass the config as a prop to the `MoralisProvider`

```js
import React from "react";
import ReactDOM from "react-dom";
import { MoralisProvider, MoralisConfig } from "@moralisweb3/react";

const moralisConfig: MoralisConfig = {
  apiKey: "MORALIS_API_KEY",
};

ReactDOM.render(
  <MoralisProvider config={moralisConfig}>
    <App />
  </MoralisProvider>,
  document.getElementById("root"),
);
```

# ⭐️ Star us

If this `@moralisweb3/react` library helps you build your dapps faster - please star this project, every star makes us very happy!

# 🤝 Need help

If you need help with setting up the boilerplate or have other questions - don't hesitate to write in our community forum and we will check asap. [Forum link](https://forum.moralis.io). The best thing about this SDK is the super active community ready to help at any time! We help each other.

# 🧭 Table of Contents

- [💥 Features](#️-features)
- [🚀 Quick start](#-quick-start)
  - [1. Install Dependencies](#1-install-dependencies)
  - [2. Add MoralisProvider](#2-add-moralisprovider)
- [⭐️ Star us](#️-star-us)
- [🤝 Need help](#-need-help)
- [🧭 Table of Contents](#-table-of-contents)
- [✨ Hook Usage Examples](#️-hook-usage-examples)
  - [1. Provide params directly to the hook](#1-provide-params-directly-to-the-hook)
  - [2. Provide fetching options](#3-provide-fetching-options)
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
  - [useEvmResolveENSDomain](#useEvmResolveENSDomain)
  - [useEvmErc20Approvals](#useEvmErc20Approvals)
  - [useEvmErc20Burns](#useEvmErc20Burns)
  - [useEvmErc20Mints](#useEvmErc20Mints)
  - [useEvmErc20Transfers](#useEvmErc20Transfers)
  - [useEvmTokenAllowance](#useEvmTokenAllowance)
  - [useEvmTokenMetadataBySymbol](#useEvmTokenMetadataBySymbol)
  - [useEvmTokenMetadata](#useEvmTokenMetadata)
  - [useEvmTokenPrice](#useEvmTokenPrice)
  - [useEvmTokenTransfers](#useEvmTokenTransfers)
  - [useEvmWalletTokenBalances](#useEvmWalletTokenBalances)
  - [useEvmWalletTokenTransfers](#useEvmWalletTokenTransfers)
  - [useEvmInternalTransactions](#useEvmInternalTransactions)
  - [useEvmTransaction](#useEvmTransaction)
  - [useEvmTransactionVerbose](#useEvmTransactionVerbose)
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
- [Supported Chains](#supported-chains)
  - [EVM Chains](#evm-chains)
  - [Solana Chains](#solana-chains)
- [📦 Webpack v5 support](#️-webpack-v5-support)
  - [Configuring Webpack v5](#configuring-webpack-v5)
  - [create-react-app](#create-react-app)
- [🧙‍♂️ Community](#️-community)

# ✨ Hook Usage Examples

```jsx
import { useEvmWalletTokenBalances } from '@moralisweb3/react'

const App = () => {
  const {
    data: balance,
    error,
    fetchStatus,
    isError,
    isFetched,
    isFetchedAfterMount,
    isFetching,
    isLoading,
    isPreviousData,
    isRefetching,
    isSuccess,
    refetch,
    status,
  } = useEvmWalletTokenBalances({ address: '0x...' })

  if (isFetching) return <div>Fetching/Refreshing balance…</div>
  if (error) return <div>{JSON.stringify(error, null, 2)}</div>
  return (
    <>
      <button onClick={refetch}>Refetch Balance</button>
      <div>{JSON.stringify(balance, null, 2)}</div>
    </>
  )
}
```

Hooks will not run data fetching until required parameters were provided, although all types are set as `optional`.

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

## 2. Provide fetching options
It's possible to set fallbacks or change settings of data fetching per hook. These options will override `config` provided to `MoralisProvider`.

```jsx
import { useEvmNativeBalance } from '@moralisweb3/react'

const App = () => {
  const { refetch, data: ethBalance } = useEvmNativeBalance(
    {
      address: '0x...',
    },
    {
      onSuccess: (res) => console.log(res),
      refetchInterval: 3000,
      refetchOnWindowFocus: true,
      // data will be fetched only after refetch() called
      enabled: false,
    }
  );

  return (
    <div>
      <button onClick={()=> refetch()}>Fetch Ether Balance</button>
      <p>Ethereum Balance: {JSON.stringify(ethBalance)} Ether</p>
    </div>
  )
}
```
You can find more fetch data options in [Data fetching config](#️data-fetching-config) section.

# EvmApi Hooks

## `useEvmNativeBalance()` 

Get the native balance for a specific wallet address.
## `useEvmNativeBalancesForAddresses()` 

Get the native balances for a set of specific addresses
## `useEvmBlock()` 

Get the contents of a block given the block hash.
## `useEvmDateToBlock()` 

Get the closest block given the date.
## `useEvmPairAddress()` 


Fetch the pair data of the provided token0+token1 combination.
The token0 and token1 options are interchangable (ie. there is no different outcome in "token0=WETH and token1=USDT" or "token0=USDT and token1=WETH")
## `useEvmPairReserves()` 

Get the liquidity reserves for a given pair address. Only Uniswap V2 based exchanges supported at the moment.
## `useEvmContractEvents()` 

Get events for a contract ordered by block number in descending order.
## `useEvmContractLogs()` 

Get the logs for a contract.
## `useEvmUploadFolder()` 

Upload multiple files to IPFS and place them in a folder directory.
## `useEvmContractNFTs()` 


Get NFTs for a given contract address, including metadata for all NFTs (where available).
* Results are limited to 100 per page by default
* Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection.
## `useEvmMultipleNFTs()` 


Get NFTs for a given contract address, including metadata for all NFTs (where available).
* Results are limited to 100 per page by default
* Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection.
## `useEvmNFTContractMetadata()` 


Get the collection / contract level metadata for a given contract (name, symbol, base token uri).
* Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection
## `useEvmNFTContractTransfers()` 

Get transfers of NFTs for a given contract and other parameters.
## `useEvmNFTLowestPrice()` 

Get the lowest executed price for an NFT contract for the last x days (only trades paid in ETH).
## `useEvmNFTMetadata()` 


Get NFT data, including metadata (where available), for the given NFT token ID and contract address.
* Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection
## `useEvmNFTOwners()` 


Get owners of NFTs for a given contract.
* Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection.
## `useEvmNFTTokenIdOwners()` 


Get owners of a specific NFT given the contract address and token ID.
* Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection
## `useEvmNFTTrades()` 

Get trades of NFTs for a given contract and marketplace.
## `useEvmNFTTransfersByBlock()` 

Get transfers of NFTs given a block number or block hash.
## `useEvmNFTTransfersFromToBlock()` 

Get transfers of NFTs from a block number to a block number.
## `useEvmNFTTransfers()` 

Get transfers of an NFT given a contract address and token ID.
## `useEvmWalletNFTCollections()` 

Get NFT collections owned by a given wallet address.
## `useEvmWalletNFTs()` 


Get NFTs owned by a given address.
* The response will include status [SYNCED/SYNCING] based on the contracts being indexed.
* Use the token_address param to get results for a specific contract only
* Note results will include all indexed NFTs
* Any request which includes the token_address param will start the indexing process for that NFT collection the very first time it is requested.
## `useEvmWalletNFTTransfers()` 

Get transfers of NFTs given the wallet and other parameters.
## `useEvmReSyncMetadata()` 


ReSync the metadata for an NFT
* The metadata flag will request a the NFT's metadata from the already existing token_uri
* The uri(default) flag will fetch the latest token_uri from the given NFT address. In sync mode the metadata will also be fetched
* The sync mode will make the endpoint synchronous so it will wait for the task to be completed before responding
* The async mode(default) will make the endpoint asynchronous so we will wait for the task to be completed before responding
## `useEvmSearchNFTs()` 

Get NFTs that match a given metadata search query.
## `useEvmSyncNFTContract()` 

Initiates a sync of a previously non synced Contract.
## `useEvmResolveAddress()` 

Resolve an ETH address and find the ENS name.
## `useEvmResolveDomain()` 

Resolve an Unstoppable domain and get the address.
## `useEvmResolveENSDomain()` 

Resolve a specific ENS domain to its address.
## `useEvmErc20Approvals()` 

Get the amount which the spender is allowed to withdraw on behalf of the owner.
## `useEvmErc20Burns()` 

Get the amount which the spender is allowed to withdraw on behalf of the owner.
## `useEvmErc20Mints()` 

Get the amount which the spender is allowed to withdraw on behalf of the owner.
## `useEvmErc20Transfers()` 

Get the amount which the spender is allowed to withdraw on behalf of the owner.
## `useEvmTokenAllowance()` 

Get the amount which the spender is allowed to withdraw on behalf of the owner.
## `useEvmTokenMetadataBySymbol()` 

Get metadata for a list of token symbols (name, symbol, decimals, logo).
## `useEvmTokenMetadata()` 

Get the metadata for a given token contract address (name, symbol, decimals, logo).
## `useEvmTokenPrice()` 

Get the token price denominated in the blockchains native token and USD.
## `useEvmTokenTransfers()` 

Get ERC20 token transactions from a contract ordered by block number in descending order.
## `useEvmWalletTokenBalances()` 

Get token balances for a specific wallet address.
## `useEvmWalletTokenTransfers()` 

Get ERC20 token transactions ordered by block number in descending order.
## `useEvmInternalTransactions()` 

Get native transactions ordered by block number in descending order.
## `useEvmTransaction()` 

Get the contents of a transaction by the given transaction hash.
## `useEvmTransactionVerbose()` 

Get the contents of a transaction by the given transaction hash.
## `useEvmWalletTransactions()` 

Get native transactions ordered by block number in descending order.
## `useEvmWalletTransactionsVerbose()` 

Get native transactions ordered by block number in descending order.
## `useEvmEndpointWeights()` 

Get the endpoint price list for rate limits and cost.
## `useEvmRunContractFunction()` 

Run a given function of a contract ABI and retrieve readonly data.
## `useEvmWeb3ApiVersion()` 

Get the current version of the Moralis Web3 API.

# SolApi Hooks

## `useSolBalance()` 

Gets native balance owned by the given network and address
## `useSolNFTs()` 

Gets NFTs owned by the given network and address
## `useSolPortfolio()` 

Gets the portfolio of the given network and address
## `useSolSPL()` 

Gets token balances owned by the given network and address
## `useSolNFTMetadata()` 

Gets the contract level metadata (mint, standard, name, symbol, metaplex) for the given network and contract
## `useSolTokenPrice()` 

Gets the token price (usd and native) for a given contract address and network


# ⚙️ Advanced Config
The `config` property for `MoralisProvider` can be used not only to specify the API key, but also for additional Moralis instance settings and request fetching settings. Example:

```js
import React from "react";
import ReactDOM from "react-dom";
import { MoralisProvider, MoralisConfig } from "@moralisweb3/react";

const moralisConfig: MoralisConfig = { 
  apiKey: 'YOUR_API_KEY',
  formatEvmAddress: 'checksum',
  formatEvmChainId: 'decimal',
  logLevel: 'verbose',
  refetchInterval: 3000,
  refetchOnWindowFocus: true,
}

ReactDOM.render(
  <MoralisProvider config={moralisConfig}>
    <App />
  </MoralisProvider>,
  document.getElementById("root"),
);
```

Below, you can find the possible options for the `config`:

### Moralis instance config:

| Option             |  Description                                                          | Default     | Required |
| -------------------| ---------------------------------------------------------------------|-------------|-------------------|
| `apiKey`           |  Your Moralis ApiKey	                                                | `null`      |  yes  | 
| `formatEvmAddress` |  Format style for evm addresses. Possible values: `'lowercase'`, `'checksum'`|`'lowercase'`|  no  | 
| `formatEvmChainId` |  Format style for chains. Possible values: `'decimal'`, `'hex'`      |`'hex'`      |  no  | 
| `logLevel`         |  Level of detail for log messages. Possible values: `'verbose'`, `'debug'`, `'info'`, `'warning'`, `'error'`, `'off'`|`'info'`|  no  | 
| `defaultSolNetwork`|  Default network for Solana. Possible values: `SolNetworkish` type         |`'mainnet'`|  no  | 
| `defaultEvmApiChain`| Default chain for Evm. Possible values: `EvmChainish` type        |`'0x1'`      |  no  | 
| `defaultEvmApiChain`| Default chain for Evm. Possible values: `EvmChainish` type        |`'0x1'`      |  no  | 

### Data fetching config:

These options can be passed as `MoralisConfig` and be directly provided to any hook.

| Option             | Description                                                          | Default     | Required |
| -------------------| ---------------------------------------------------------------------|-------------|-------------------|
| `refetchInterval`| If set to a number, all queries will continuously refetch at this frequency in milliseconds. If set to a function, the function will be executed with the latest data and query to compute a frequency	       | `0`      |  no  |  
| `cacheTime`| The time in milliseconds that unused/inactive cache data remains in memory. When a query's cache becomes unused or inactive, that cache data will be garbage collected after this duration. When different cache times are specified, the longest one will be used. If set to Infinity, will disable garbage collection	       | 5 * 60 * 1000 (5 minutes) or Infinity during SSR      |  no  |  
| `enabled`| Set this to false to disable this query from automatically running.	       | `true`      |  no  |  
| `onError`| This function will fire if the query encounters an error and will be passed the error.	       | ``      |  no  |  
| `onSettled`| This function will fire any time the query is either successfully fetched or errors and be passed either the data or error. 	       | ``      |  no  |  
| `onSuccess`| This function will fire any time the query successfully fetches new data.	       | ``      |  no  |  
| `refetchOnWindowFocus` | 	If set to `true`, the query will refetch on window focus if the data is stale. If set to false, the query will not refetch on window focus. If set to "always", the query will always refetch on window focus. If set to a function, the function will be executed with the query to compute the value       | `false`      |  no  |  
| `staleTime`| The time in milliseconds after data is considered stale. This value only applies to the hook it is defined on. If set to Infinity, the data will never be considered stale	       | `0`      | no   |  
| `suspense`| Set this to `true` to enable suspense mode. When `true`, `useQuery` will suspend when `status === 'loading'` When `true`, `useQuery` will throw runtime errors when `status === 'error'`	       | `false`      | no  |  


The `@moralisweb3/react` hooks use [@tanstack/react-query](https://tanstack.com/query/v4/docs/react) for a better developer experience while using API calls.

# Supported Chains

Moralis continuously adding new chains and integrations. Our current supported chains include:

## EVM Chains

| Name                            | Chain id    | EvmChain                  | Type    |
| ------------------------------- | ----------- | ------------------------- | ------- |
| Ethereum Mainnet                | 1           | `EvmChain.ETHEREUM`       | Mainnet |
| Ethereum Ropsten _(deprecated)_ | 3           | `EvmChain.ROPSTEN`        | Testnet |
| Ethereum Rinkeby _(deprecated)_ | 4           | `EvmChain.RINKEBY`        | Testnet |
| Ethereum Görli                  | 5           | `EvmChain.GOERLI`         | Testnet |
| Ethereum Kovan _(deprecated)_   | 42          | `EvmChain.KOVAN`          | Testnet |
| Ethereum Sepolia                | 11155111    | `EvmChain.SEPOLIA`        | Testnet |
| Polygon Mainnet                 | 137         | `EvmChain.POLYGON`        | Mainnet |
| Polygon Mumbai                  | 80001       | `EvmChain.MUMBAI`         | Testnet |
| Binance Smart Chain Mainnet     | 56          | `EvmChain.BSC`            | Mainnet |
| Binance Smart Chain Testnet     | 97          | `EvmChain.BSC_TESTNET`    | Testnet |
| Avalanche C-Chain               | 43114       | `EvmChain.AVALANCHE`      | Mainnet |
| Avalanche Fuji Testnet          | 43113       | `EvmChain.FUJI`           | Testnet |
| Fantom                          | 250         | `EvmChain.FANTOM`         | Mainnet |
| Cronos Mainnet                  | 25          | `EvmChain.CRONOS`         | Mainnet |
| Cronos Testnet                  | 338         | `EvmChain.CRONOS_TESTNET` | Testnet |
| Palm                            | 11297108109 | `EvmChain.PALM`           | Mainnet |
| Arbitrum                        | 42161       | `EvmChain.ARBITRUM`       | Mainnet |

## Solana Chains

| Name           | SolNetwork           | Type    |
| -------------- | -------------------- | ------- |
| Solana mainnet | `SolNetwork.MAINNET` | Mainnet |
| Solana devnet  | `SolNetwork.DEVNET`  | Testnet  |

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