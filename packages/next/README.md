<div align="center">
    <p align="center">
      <img src="./.readme/MoralisLogo.png" alt="Moralis NextJS" />
    </p>
</div>

<div align="center">

![npm](https://img.shields.io/npm/v/@moralisweb3/next)
![node-current](https://img.shields.io/node/v/@moralisweb3/next)
![GitHub last commit](https://img.shields.io/github/last-commit/MoralisWeb3/@moralisweb3/next)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@moralisweb3/next)
![npm type definitions](https://img.shields.io/npm/types/@moralisweb3/next)

</div>

# `@moralisweb3/next`

> Moralis Hooks for your NextJS project

This project is a thin NextJS wrapper around [Moralis](https://moralis.io/), to easily call functionalities and display data.

Please check the [official documentation of Moralis](https://docs.moralis.io/) for all the functionalities of Moralis.

# ⚙️ Quick start

Make sure to have `next`, `react`, `react-dom` and `moralis` installed as dependencies, then install `@moralisweb3/next`

In short:

```sh
npm install moralis @moralisweb3/next
```

or

```sh
yarn add moralis @moralisweb3/next
```

> Make sure to also  `moralis` to the latest version, when you update `@moralisweb3/next`.

# Hooks

## `useSolNFTMetadata()` 

Description will be added later 👀

### Params:

```json
- `network :SolNetworkish
- `address :SolAddressish
```

### Example:
```jsx
import { useSolNFTMetadata } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useSolNFTMetadata();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain: "0x1" } })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => { mint: string; standard: string; name: string; symbol: string; metaplex: { metadataUri: string; updateAuthority: string; sellerFeeBasisPoints: number; primarySaleHappened: boolean; isMutable: boolean; masterEdition: boolean; }; }"
```

## `useSolSPL()` 

Description will be added later 👀

### Params:

```json
- `network :SolNetworkish
- `address :SolAddressish
```

### Example:
```jsx
import { useSolSPL } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useSolSPL();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain: "0x1" } })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => { associatedTokenAddress: string; mint: string; amount: string; }[]"
```

## `useSolPortfolio()` 

Description will be added later 👀

### Params:

```json
- `network :SolNetworkish
- `address :SolAddressish
```

### Example:
```jsx
import { useSolPortfolio } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useSolPortfolio();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain: "0x1" } })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => { nativeBalance: string; nfts: { associatedTokenAddress: string; mint: string; }[]; tokens: { associatedTokenAddress: string; mint: string; amount: string; }[]; }"
```

## `useSolNFTs()` 

Description will be added later 👀

### Params:

```json
- `network :SolNetworkish
- `address :SolAddressish
```

### Example:
```jsx
import { useSolNFTs } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useSolNFTs();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain: "0x1" } })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => { associatedTokenAddress: string; mint: string; }[]"
```

## `useSolBalance()` 

Description will be added later 👀

### Params:

```json
- `network :SolNetworkish
- `address :SolAddressish
```

### Example:
```jsx
import { useSolBalance } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useSolBalance();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain: "0x1" } })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => string"
```

## `useEvmRunContractFunction()` 

Run a given function of a contract abi and retrieve readonly data.

### Params:

```json
- `chain :EvmChainish
- `subdomain :string
- `providerUrl :string
- `functionName :string
- `address :EvmAddressish
- `abi :unknown
- `params :{ [key: string]: unknown; }
```

### Example:
```jsx
import { useEvmRunContractFunction } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useEvmRunContractFunction();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain: "0x1" } })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => string"
```

## `useEvmUploadFolder()` 

Upload multiple files to IPFS and place them in a folder directory.

### Params:

```json
- `abi :{ path: string; content: string; }[]
```

### Example:
```jsx
import { useEvmUploadFolder } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useEvmUploadFolder();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain: "0x1" } })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => { path: string; }[]"
```

## `useEvmDomain()` 

Resolve an Unstoppable domain and get the address.

### Params:

```json
- `currency :"eth" | "0x1"
- `domain :string
```

### Example:
```jsx
import { useEvmDomain } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useEvmDomain();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain: "0x1" } })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => { address: string; }"
```

## `useEvmAddress()` 

Resolve an ETH address and find the ENS name.

### Params:

```json
- `address :EvmAddressish
```

### Example:
```jsx
import { useEvmAddress } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useEvmAddress();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain: "0x1" } })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => { name: string; }"
```

## `useEvmDateToBlock()` 

Get the closest block of the provided date.

### Params:

```json
- `chain :EvmChainish
- `date :string
- `providerUrl :any
```

### Example:
```jsx
import { useEvmDateToBlock } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useEvmDateToBlock();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain: "0x1" } })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => { date: Date; block: number; timestamp: number; }"
```

## `useEvmBlock()` 

Get the contents of a block by block hash.

### Params:

```json
- `chain :EvmChainish
- `subdomain :any
- `blockNumberOrHash :any
```

### Example:
```jsx
import { useEvmBlock } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useEvmBlock();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain: "0x1" } })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => { number: string; difficulty: string; totalDifficulty: string; size: string; gasLimit: string; gasUsed: string; chain: string | number; miner: string; transactions: { to: string; from: string; nonce: string; gas: string; gasPrice: string; gasUsed: string; cumulativeGasUsed: string; blockNumber: string; value: string; chain: string | number; contractAddress: string; logs: { address: string; logIndex?: number; transactionHash: string; transactionIndex?: number; data: string; topics: string[]; blockHash: string; blockNumber: number; blockTimestamp?: string; }[]; blockTimestamp: string; data?: string; hash: string; type?: number; index: number; blockHash: string; receiptRoot?: string; receiptStatus?: number; }[]; timestamp: Date; hash: string; parentHash: string; nonce: string; sha3Uncles: string; logsBloom: string; transactionsRoot: string; stateRoot: string; receiptsRoot: string; extraData: string; transactionCount: number; }"
```

## `useEvmNativeBalance()` 

Get native balance for a specific address.

### Params:

```json
- `chain :EvmChainish
- `address :EvmAddressish
- `toBlock :any
- `providerUrl :any
```

### Example:
```jsx
import { useEvmNativeBalance } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useEvmNativeBalance();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain: "0x1" } })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => { balance: string; }"
```

## `useEvmWalletTransactions()` 

Get native transactions ordered by block number in descending order.

### Params:

```json
- `chain :EvmChainish
- `address :EvmAddressish
- `subdomain :any
- `limit :any
- `fromBlock :any
- `toBlock :any
- `fromDate :any
- `toDate :any
- `offset :number
- `cursor :string
```

### Example:
```jsx
import { useEvmWalletTransactions } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useEvmWalletTransactions();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain: "0x1" } })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => { to: string; from: string; nonce: string; gas: string; gasPrice: string; gasUsed: string; cumulativeGasUsed: string; blockNumber: string; value: string; chain: string | number; contractAddress: string; logs: { address: string; logIndex?: number; transactionHash: string; transactionIndex?: number; data: string; topics: string[]; blockHash: string; blockNumber: number; blockTimestamp?: string; }[]; blockTimestamp: string; data?: string; hash: string; type?: number; index: number; blockHash: string; receiptRoot?: string; receiptStatus?: number; }[]"
```

## `useEvmTransaction()` 

Get the contents of a transaction by transaction hash.

### Params:

```json
- `chain :EvmChainish
- `subdomain :any
- `transactionHash :any
```

### Example:
```jsx
import { useEvmTransaction } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useEvmTransaction();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain: "0x1" } })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => { to: string; from: string; nonce: string; gas: string; gasPrice: string; gasUsed: string; cumulativeGasUsed: string; blockNumber: string; value: string; chain: string | number; contractAddress: string; logs: { address: string; logIndex?: number; transactionHash: string; transactionIndex?: number; data: string; topics: string[]; blockHash: string; blockNumber: number; blockTimestamp?: string; }[]; blockTimestamp: string; data?: string; hash: string; type?: number; index: number; blockHash: string; receiptRoot?: string; receiptStatus?: number; }"
```

## `useEvmContractLogs()` 

Get the logs for an address.

### Params:

```json
- `chain :EvmChainish
- `address :EvmAddressish
- `subdomain :any
- `limit :any
- `cursor :any
- `blockNumber :any
- `fromBlock :any
- `toBlock :any
- `fromDate :any
- `toDate :any
- `topic0 :any
- `topic1 :any
- `topic2 :any
- `topic3 :any
- `offset :number
```

### Example:
```jsx
import { useEvmContractLogs } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useEvmContractLogs();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain: "0x1" } })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => { address: string; logIndex?: number; transactionHash: string; transactionIndex?: number; data: string; topics: string[]; blockHash: string; blockNumber: number; blockTimestamp?: string; }[]"
```

## `useEvmContractEvents()` 

Get events for a specific contract ordered by block number in descending order.

### Params:

```json
- `chain :EvmChainish
- `address :EvmAddressish
- `abi :unknown
- `subdomain :any
- `limit :any
- `offset :any
- `fromBlock :any
- `toBlock :any
- `fromDate :any
- `toDate :any
- `providerUrl :any
- `topic :any
- `cursor :string
```

### Example:
```jsx
import { useEvmContractEvents } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useEvmContractEvents();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain: "0x1" } })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => EvmEvent[]"
```

## `useEvmPairReserves()` 

Get the liquidity reserves for a given pair address. Only Uniswap V2 based exchanges supported at the moment.

### Params:

```json
- `chain :EvmChainish
- `pairAddress :EvmAddressish
- `toBlock :any
- `toDate :any
- `providerUrl :any
```

### Example:
```jsx
import { useEvmPairReserves } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useEvmPairReserves();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain: "0x1" } })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => { reserve0?: string; reserve1?: string; }"
```

## `useEvmPairAddress()` 

Fetch the pair data of the provided token0+token1 combination.
The token0 and token1 options are interchangable (ie. there is no different outcome in "token0=WETH and token1=USDT" or "token0=USDT and token1=WETH")

### Params:

```json
- `chain :EvmChainish
- `token0Address :EvmAddressish
- `token1Address :EvmAddressish
- `toBlock :any
- `toDate :any
- `exchange :any
```

### Example:
```jsx
import { useEvmPairAddress } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useEvmPairAddress();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain: "0x1" } })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => { token0: { token: { contractAddress: string; chain: string | number; decimals: number; name: string; symbol: string; logo?: string; logoHash?: string; thumbnail?: string; }; blockNumber: string; validated: number; createdAt: Date; }; token1: { token: { contractAddress: string; chain: string | number; decimals: number; name: string; symbol: string; logo?: string; logoHash?: string; thumbnail?: string; }; blockNumber: string; validated: number; createdAt: Date; }; pairAddress: string; }"
```

## `useEvmTokenAllowance()` 

Get the amount which the spender is allowed to withdraw on behalf of the owner.

### Params:

```json
- `chain :EvmChainish
- `address :EvmAddressish
- `ownerAddress :EvmAddressish
- `spenderAddress :EvmAddressish
- `providerUrl :any
```

### Example:
```jsx
import { useEvmTokenAllowance } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useEvmTokenAllowance();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain: "0x1" } })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => { allowance: string; }"
```

## `useEvmTokenTransfers()` 

Get ERC20 token transactions ordered by block number in descending order.

### Params:

```json
- `chain :EvmChainish
- `address :EvmAddressish
- `subdomain :any
- `limit :any
- `offset :any
- `fromBlock :any
- `toBlock :any
- `fromDate :any
- `toDate :any
- `cursor :string
```

### Example:
```jsx
import { useEvmTokenTransfers } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useEvmTokenTransfers();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain: "0x1" } })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => { chain: string | number; address: string; blockNumber: string; toAddress: string; fromAddress: string; value: string; transactionHash: string; blockTimestamp: Date; blockHash: string; }[]"
```

## `useEvmTokenPrice()` 

Get the token price denominated in the blockchains native token and USD.

### Params:

```json
- `chain :"eth" | "0x1" | "ropsten" | "0x3" | "rinkeby" | "0x4" | "goerli" | "0x5" | "kovan" | "0x2a" | "polygon" | "0x89" | "mumbai" | "0x13881" | "bsc" | "0x38" | "bsc testnet" | "0x61" | "avalanche" | "0xa86a" | "avalanche testnet" | "0xa869" | "fantom" | "0xfa" | "cronos" | "0x19" | "cronos testnet" | "0x152"
- `providerUrl :string
- `exchange :string
- `toBlock :number
- `address :string
```

### Example:
```jsx
import { useEvmTokenPrice } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useEvmTokenPrice();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain: "0x1" } })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => { exchangeAddress: string; nativePrice: string; usdPrice: number; exchangeName?: string; symbol: Camelize<unknown>; }"
```

## `useEvmTokenMetadataBySymbol()` 

Get metadata (name, symbol, decimals, logo) for a list of token symbols.

### Params:

```json
- `chain :EvmChainish
- `subdomain :any
- `symbols :any
```

### Example:
```jsx
import { useEvmTokenMetadataBySymbol } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useEvmTokenMetadataBySymbol();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain:} })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => { token: { contractAddress: string; chain: string | number; decimals: number; name: string; symbol: string; logo?: string; logoHash?: string; thumbnail?: string; }; blockNumber: string; validated: string; }[]"
```

## `useEvmTokenMetadata()` 

Returns metadata (name, symbol, decimals, logo) for a given token contract address.

### Params:

```json
- `chain :EvmChainish
- `addresses :EvmAddressish[]
- `subdomain :any
- `providerUrl :any
```

### Example:
```jsx
import { useEvmTokenMetadata } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useEvmTokenMetadata();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain:} })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => { token: { contractAddress: string; chain: string | number; decimals: number; name: string; symbol: string; logo?: string; logoHash?: string; thumbnail?: string; }; blockNumber: string; validated: string; }[]"
```

## `useEvmWalletTokenTransfers()` 

Get ERC20 token transactions ordered by block number in descending order.

### Params:

```json
- `chain :EvmChainish
- `address :EvmAddressish
- `subdomain :any
- `limit :any
- `cursor :any
- `fromBlock :any
- `toBlock :any
- `fromDate :any
- `toDate :any
- `offset :number
```

### Example:
```jsx
import { useEvmWalletTokenTransfers } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useEvmWalletTokenTransfers();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain:} })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => { chain: string | number; address: string; blockNumber: string; toAddress: string; fromAddress: string; value: string; transactionHash: string; blockTimestamp: Date; blockHash: string; }[]"
```

## `useEvmWalletTokenBalances()` 

Get token balances for a specific address.

### Params:

```json
- `chain :EvmChainish
- `address :EvmAddressish
- `subdomain :any
- `tokenAddresses :any
- `toBlock :any
```

### Example:
```jsx
import { useEvmWalletTokenBalances } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useEvmWalletTokenBalances();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain:} })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => ({ value: string; token: { contractAddress: string; chain: string | number; decimals: number; name: string; symbol: string; logo?: string; logoHash?: string; thumbnail?: string; }; } | { value: string; token?: undefined; })[]"
```

## `useEvmWalletNFTCollections()` 

Get the nft collections owned by an user

### Params:

```json
- `chain :EvmChainish
- `address :EvmAddressish
- `limit :any
- `cursor :any
- `offset :number
```

### Example:
```jsx
import { useEvmWalletNFTCollections } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useEvmWalletNFTCollections();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain:} })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => { chain: string | number; tokenAddress: string; contractType: EvmNftContractType; name: string; symbol: string; }[]"
```

## `useEvmNFTContractTransfers()` 

Get the transfers of the tokens matching the given parameters.

### Params:

```json
- `chain :EvmChainish
- `address :EvmAddressish
- `limit :any
- `cursor :any
- `format :any
- `offset :number
```

### Example:
```jsx
import { useEvmNFTContractTransfers } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useEvmNFTContractTransfers();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain:} })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => { chain: string | number; blockNumber: string; fromAddress: string; toAddress: string; tokenAddress: string; value: string; operator: string; amount?: number; blockHash: string; blockTimestamp: Date; contractType: string; logIndex: number; tokenId: string; transactionHash: string; transactionIndex?: number; transactionType?: string; }[]"
```

## `useEvmSyncNFTContract()` 

Initiates a metadata refresh for an entire NFT collection.

### Params:

```json
- `chain :EvmChainish
- `address :EvmAddressish
```

### Example:
```jsx
import { useEvmSyncNFTContract } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useEvmSyncNFTContract();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain:} })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => { success: boolean; }"
```

## `useEvmNFTTransfers()` 

Get the transfers of an NFT given a conttract address and token ID.

### Params:

```json
- `chain :EvmChainish
- `address :EvmAddressish
- `limit :any
- `cursor :any
- `format :any
- `tokenId :any
- `order :any
- `offset :number
```

### Example:
```jsx
import { useEvmNFTTransfers } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useEvmNFTTransfers();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain:} })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => { chain: string | number; blockNumber: string; fromAddress: string; toAddress: string; tokenAddress: string; value: string; operator: string; amount?: number; blockHash: string; blockTimestamp: Date; contractType: string; logIndex: number; tokenId: string; transactionHash: string; transactionIndex?: number; transactionType?: string; }[]"
```

## `useEvmNFTTokenIdOwners()` 

Get all owners of a specific NFT given the contract address and token ID.
* Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection

### Params:

```json
- `chain :EvmChainish
- `address :EvmAddressish
- `limit :any
- `cursor :any
- `format :any
- `tokenId :any
- `offset :number
```

### Example:
```jsx
import { useEvmNFTTokenIdOwners } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useEvmNFTTokenIdOwners();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain:} })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => { tokenAddress: string; chain: string | number; ownerOf: string; blockNumberMinted: string; blockNumber: string; tokenId: string | number; contractType: EvmNftContractType; tokenUri?: string; tokenHash?: string; metadata?: MoralisDataObjectValue; name?: string; symbol?: string; lastMetadataSync?: Date; lastTokenUriSync?: Date; amount?: number; }[]"
```

## `useEvmNFTMetadata()` 

Get NFT data, including metadata (where available), for the given NFT token id of the given contract address.
* Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection

### Params:

```json
- `chain :EvmChainish
- `address :EvmAddressish
- `format :any
- `tokenId :any
```

### Example:
```jsx
import { useEvmNFTMetadata } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useEvmNFTMetadata();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain:} })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => { tokenAddress: string; chain: string || number; contractType: EvmNftContractType; tokenUri?: string; tokenHash?: string; metadata?: MoralisDataObjectValue; name?: string; symbol?: string; lastMetadataSync?: Date; lastTokenUriSync?: Date; amount?: number; }"
```

## `useEvmReSyncMetadata()` 

ReSync the metadata for an NFT
* The metadata flag will request a the NFT's metadata from the already existing token_uri
* The uri(default) flag will fetch the latest token_uri from the given NFT address. In sync mode the metadata will also be fetched
* The sync mode will make the endpoint synchronous so it will wait for the task to be completed before responding
* The async mode(default) will make the endpoint asynchronous so we will wait for the task to be completed before responding

### Params:

```json
- `chain :EvmChainish
- `address :EvmAddressish
- `tokenId :any
- `flag :any
- `mode :any
```

### Example:
```jsx
import { useEvmReSyncMetadata } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useEvmReSyncMetadata();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain:} })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => { status: string; }"
```

## `useEvmNFTContractMetadata()` 

Get the contract level metadata (name, symbol, base token uri) for the given contract
* Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection

### Params:

```json
- `chain :EvmChainish
- `address :EvmAddressish
```

### Example:
```jsx
import { useEvmNFTContractMetadata } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useEvmNFTContractMetadata();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain:} })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => { chain: string | number; tokenAddress: string; name: string; symbol: string; contractType: EvmNftContractType; syncedAt?: Date; }"
```

## `useEvmNFTOwners()` 

Get all owners of NFTs within a given contract.
* Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection.

### Params:

```json
- `chain :EvmChainish
- `address :EvmAddressish
- `limit :any
- `cursor :any
- `format :any
- `offset :number
```

### Example:
```jsx
import { useEvmNFTOwners } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useEvmNFTOwners();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain:} })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => { tokenAddress: string; chain: string || number; contractType: EvmNftContractType; tokenUri?: string; tokenHash?: string; metadata?: MoralisDataObjectValue; name?: string; symbol?: string; lastMetadataSync?: Date; lastTokenUriSync?: Date; amount?: number; }[]"
```

## `useEvmContractNFTs()` 

Get all NFTs, including metadata (where available), for all NFTs for the given contract address.
* Results are limited to 100 per page by default
* Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection.

### Params:

```json
- `chain :EvmChainish
- `address :EvmAddressish
- `limit :any
- `cursor :any
- `format :any
- `totalRanges :any
- `range :any
- `offset :number
```

### Example:
```jsx
import { useEvmContractNFTs } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useEvmContractNFTs();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain:} })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => { tokenAddress: string; chain: string || number; contractType: EvmNftContractType; tokenUri?: string; tokenHash?: string; metadata?: MoralisDataObjectValue; name?: string; symbol?: string; lastMetadataSync?: Date; lastTokenUriSync?: Date; amount?: number; }[]"
```

## `useEvmNFTTransfersFromToBlock()` 

Gets the transfers of the tokens from a block number to a block number.

### Params:

```json
- `chain :EvmChainish
- `limit :any
- `cursor :any
- `format :any
- `fromBlock :any
- `toBlock :any
- `fromDate :any
- `toDate :any
- `offset :number
```

### Example:
```jsx
import { useEvmNFTTransfersFromToBlock } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useEvmNFTTransfersFromToBlock();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain:} })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => { chain: string | number; blockNumber: string; fromAddress: string; toAddress: string; tokenAddress: string; value: string; operator: string; amount?: number; blockHash: string; blockTimestamp: Date; contractType: string; logIndex: number; tokenId: string; transactionHash: string; transactionIndex?: number; transactionType?: string; }[]"
```

## `useEvmSearchNFTs()` 

Get NFTs that match a given metadata search query.

### Params:

```json
- `chain :EvmChainish
- `addresses :EvmAddressish[]
- `limit :any
- `cursor :any
- `format :any
- `fromBlock :any
- `toBlock :any
- `fromDate :any
- `toDate :any
- `q :any
- `filter :any
- `offset :number
```

### Example:
```jsx
import { useEvmSearchNFTs } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useEvmSearchNFTs();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain:} })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => { token: { tokenAddress: string; chain: string || number; contractType: EvmNftContractType; tokenUri?: string; tokenHash?: string; metadata?: MoralisDataObjectValue; name?: string; symbol?: string; lastMetadataSync?: Date; lastTokenUriSync?: Date; amount?: number; }; lastMetadataSync: string; lastTokenUriSync: string; updatedAt: string; tokenHash: string; blockNumberMinted: string; batchId: string; frozen: number; frozenLogIndex: { [key: string]: unknown; }; imported: { [key: string]: unknown; }; isValid: number; openseaLookup: { [key: string]: unknown; }; resyncing: number; syncing: number; }[]"
```

## `useEvmNFTLowestPrice()` 

Get the lowest executed price for an NFT token contract for the last x days (only trades paid in ETH).

### Params:

```json
- `chain :EvmChainish
- `address :EvmAddressish
- `providerUrl :any
- `marketplace :any
- `days :any
```

### Example:
```jsx
import { useEvmNFTLowestPrice } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useEvmNFTLowestPrice();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain:} })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => { chain: string | number; sellerAddress: string; buyerAddress: string; marketplaceAddress: string; tokenAddress: string; priceTokenAddress: string; blockNumber: string; price: string; blockTimestamp: string; transactionHash: string; transactionIndex: number; tokenIds: string[]; blockHash: string; }"
```

## `useEvmNFTTrades()` 

Get the nft trades for a given contract and marketplace.

### Params:

```json
- `chain :EvmChainish
- `address :EvmAddressish
- `limit :any
- `cursor :any
- `fromBlock :any
- `toBlock :any
- `fromDate :any
- `toDate :any
- `providerUrl :any
- `marketplace :any
- `offset :number
```

### Example:
```jsx
import { useEvmNFTTrades } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useEvmNFTTrades();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain:} })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => { chain: string | number; sellerAddress: string; buyerAddress: string; marketplaceAddress: string; tokenAddress: string; priceTokenAddress: string; blockNumber: string; price: string; blockTimestamp: string; transactionHash: string; transactionIndex: number; tokenIds: string[]; blockHash: string; }[]"
```

## `useEvmWalletNFTTransfers()` 

Get the transfers of the tokens matching the given parameters.

### Params:

```json
- `chain :EvmChainish
- `address :EvmAddressish
- `limit :any
- `cursor :any
- `format :any
- `direction :any
- `fromBlock :any
- `toBlock :any
- `offset :number
```

### Example:
```jsx
import { useEvmWalletNFTTransfers } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useEvmWalletNFTTransfers();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain:} })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => { chain: string | number; blockNumber: string; fromAddress: string; toAddress: string; tokenAddress: string; value: string; operator: string; amount?: number; blockHash: string; blockTimestamp: Date; contractType: string; logIndex: number; tokenId: string; transactionHash: string; transactionIndex?: number; transactionType?: string; }[]"
```

## `useEvmWalletNFTs()` 

Get NFTs owned by a given address.
* The response will include status [SYNCED/SYNCING] based on the contracts being indexed.
* Use the token_address param to get results for a specific contract only
* Note results will include all indexed NFTs
* Any request which includes the token_address param will start the indexing process for that NFT collection the very first time it is requested.

### Params:

```json
- `chain :EvmChainish
- `tokenAddresses :EvmAddressish[]
- `address :EvmAddressish
- `limit :any
- `cursor :any
- `format :any
- `offset :number
```

### Example:
```jsx
import { useEvmWalletNFTs } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useEvmWalletNFTs();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain:} })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => { tokenAddress: string; chain: string || number; contractType: EvmNftContractType; tokenUri?: string; tokenHash?: string; metadata?: MoralisDataObjectValue; name?: string; symbol?: string; lastMetadataSync?: Date; lastTokenUriSync?: Date; amount?: number; }[]"
```

## `useEvmNFTTransfersByBlock()` 

Get NFT transfers by block number or block hash.

### Params:

```json
- `chain :EvmChainish
- `subdomain :any
- `limit :any
- `cursor :any
- `blockNumberOrHash :any
- `offset :number
```

### Example:
```jsx
import { useEvmNFTTransfersByBlock } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useEvmNFTTransfersByBlock();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain:} })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => { chain: string | number; blockNumber: string; fromAddress: string; toAddress: string; tokenAddress: string; value: string; operator: string; amount?: number; blockHash: string; blockTimestamp: Date; contractType: string; logIndex: number; tokenId: string; transactionHash: string; transactionIndex?: number; transactionType?: string; }[]"
```

## `useAuthMessage()` 

Description will be added later 👀

### Params:

```json

```

### Example:
```jsx
import { useAuthMessage } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useAuthMessage();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain:} })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:

```json
"() => { id: string; message: string; profileId: string; }"
```