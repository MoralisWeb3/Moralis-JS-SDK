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

### Create environment variables file

Add a new file `.env.local` in project's root and provide a new variable with [Moralis API key](https://docs.moralis.io/docs/nextjs-dapp#add-moralis-to-your-nextjs-dapp):

```sh
MORALIS_API_KEY= ***
```

### Create API route

To add the `@moralisweb3/next` to a project create a file `pages/api/moralis/[...moralis].ts` with following code:

```js
import { MoralisNextApi } from "@moralisweb3/next";

export default MoralisNextApi()
```

# Authentication and Session Management with NextAuth

The `@moralisweb3/next` library provides first class tools for web3 authentication. Using the [NextAuth.js](https://next-auth.js.org/) and our custom `MoralisNextAuthProvider()` you can implement web3 authentication you can create web3 authentication for any web3 wallet.

Please follow [Sign In with MetaMask](https://docs.moralis.io/docs/sign-in-with-metamask) Tutorial for NextJS.

# Hook Usage Example

```jsx
import { useEvmWalletTokenBalances } from '@moralisweb3/next'

const App = () => {
  const { data: balance, error, refetch, isValidating } = useEvmWalletTokenBalances({ address: '0x...' })

  if (isValidating) return <div>Fetching/Refreshing balance…</div>
  if (error) return <div>{JSON.stringify(error, null, 2)}</div>
  return (
    <>
      <button onClick={refetch}>Refetch Balance</button>
      <div>{JSON.stringify(balance, null, 2)}</div>
    </>
  )
}
```

# Hooks
## `useSolNFTMetadata()` 

Gets the contract level metadata (mint, standard, name, symbol, metaplex) for the given network and contract

### Params:

```sh
network: SolNetworkish,
address: SolAddressish,
```

### Example return:

```json
"{ mint: string; standard: string; name: string; symbol: string; metaplex: { metadataUri: string; updateAuthority: string; sellerFeeBasisPoints: number; primarySaleHappened: boolean; isMutable: boolean; masterEdition: boolean; }; }"
```
## `useSolSPL()` 

Gets token balances owned by the given network and address

### Params:

```sh
network: SolNetworkish,
address: SolAddressish,
```

### Example return:

```json
"{ associatedTokenAddress: string; mint: string; amount: string; }[]"
```
## `useSolPortfolio()` 

Gets the portfolio of the given network and address

### Params:

```sh
network: SolNetworkish,
address: SolAddressish,
```

### Example return:

```json
"{ nativeBalance: string; nfts: { associatedTokenAddress: string; mint: string; }[]; tokens: { associatedTokenAddress: string; mint: string; amount: string; }[]; }"
```
## `useSolNFTs()` 

Gets NFTs owned by the given network and address

### Params:

```sh
network: SolNetworkish,
address: SolAddressish,
```

### Example return:

```json
"{ associatedTokenAddress: string; mint: string; }[]"
```
## `useSolBalance()` 

Gets native balance owned by the given network and address

### Params:

```sh
network: SolNetworkish,
address: SolAddressish,
```

### Example return:

```json
"string"
```
## `useEvmRunContractFunction()` 

Run a given function of a contract abi and retrieve readonly data.

### Params:

```sh
chain: EvmChainish,
subdomain: string,
providerUrl: string,
functionName: string,
address: EvmAddressish,
abi: unknown,
params: { [key: string]: unknown; },
```

### Example return:

```json
"string"
```
## `useEvmUploadFolder()` 

Upload multiple files to IPFS and place them in a folder directory.

### Params:

```sh
abi: { path: string; content: string; }[],
```

### Example return:

```json
"{ path: string; }[]"
```
## `useEvmDomain()` 

Resolve an Unstoppable domain and get the address.

### Params:

```sh
currency: "eth" | "0x1",
domain: string,
```

### Example return:

```json
"{ address: string; }"
```
## `useEvmAddress()` 

Resolve an ETH address and find the ENS name.

### Params:

```sh
address: EvmAddressish,
```

### Example return:

```json
"{ name: string; }"
```
## `useEvmDateToBlock()` 

Get the closest block of the provided date.

### Params:

```sh
chain: EvmChainish,
date: string,
providerUrl: any,
```

### Example return:

```json
"{ date: Date; block: number; timestamp: number; }"
```
## `useEvmBlock()` 

Get the contents of a block by block hash.

### Params:

```sh
chain: EvmChainish,
subdomain: any,
blockNumberOrHash: any,
```

### Example return:

```json
"{ number: string; difficulty: string; totalDifficulty: string; size: string; gasLimit: string; gasUsed: string; chain: string | number; miner: string; transactions: { to: string; from: string; nonce: string; gas: string; gasPrice: string; gasUsed: string; cumulativeGasUsed: string; blockNumber: string; value: string; chain: string | number; contractAddress: string; logs: { address: string; logIndex?: number; transactionHash: string; transactionIndex?: number; data: string; topics: string[]; blockHash: string; blockNumber: number; blockTimestamp?: string; }[]; blockTimestamp: string; data?: string; hash: string; type?: number; index: number; blockHash: string; receiptRoot?: string; receiptStatus?: number; }[]; timestamp: Date; hash: string; parentHash: string; nonce: string; sha3Uncles: string; logsBloom: string; transactionsRoot: string; stateRoot: string; receiptsRoot: string; extraData: string; transactionCount: number; }"
```
## `useEvmNativeBalance()` 

Get native balance for a specific address.

### Params:

```sh
chain: EvmChainish,
address: EvmAddressish,
toBlock: any,
providerUrl: any,
```

### Example return:

```json
"{ balance: string; }"
```
## `useEvmWalletTransactions()` 

Get native transactions ordered by block number in descending order.

### Params:

```sh
chain: EvmChainish,
address: EvmAddressish,
subdomain: any,
limit: any,
fromBlock: any,
toBlock: any,
fromDate: any,
toDate: any,
offset: number,
cursor: string,
```

### Example return:

```json
"{ to: string; from: string; nonce: string; gas: string; gasPrice: string; gasUsed: string; cumulativeGasUsed: string; blockNumber: string; value: string; chain: string | number; contractAddress: string; logs: { address: string; logIndex?: number; transactionHash: string; transactionIndex?: number; data: string; topics: string[]; blockHash: string; blockNumber: number; blockTimestamp?: string; }[]; blockTimestamp: string; data?: string; hash: string; type?: number; index: number; blockHash: string; receiptRoot?: string; receiptStatus?: number; }[]"
```
## `useEvmTransaction()` 

Get the contents of a transaction by transaction hash.

### Params:

```sh
chain: EvmChainish,
subdomain: any,
transactionHash: any,
```

### Example return:

```json
"{ to: string; from: string; nonce: string; gas: string; gasPrice: string; gasUsed: string; cumulativeGasUsed: string; blockNumber: string; value: string; chain: string | number; contractAddress: string; logs: { address: string; logIndex?: number; transactionHash: string; transactionIndex?: number; data: string; topics: string[]; blockHash: string; blockNumber: number; blockTimestamp?: string; }[]; blockTimestamp: string; data?: string; hash: string; type?: number; index: number; blockHash: string; receiptRoot?: string; receiptStatus?: number; }"
```
## `useEvmContractLogs()` 

Get the logs for an address.

### Params:

```sh
chain: EvmChainish,
address: EvmAddressish,
subdomain: any,
limit: any,
cursor: any,
blockNumber: any,
fromBlock: any,
toBlock: any,
fromDate: any,
toDate: any,
topic0: any,
topic1: any,
topic2: any,
topic3: any,
offset: number,
```

### Example return:

```json
"{ address: string; logIndex?: number; transactionHash: string; transactionIndex?: number; data: string; topics: string[]; blockHash: string; blockNumber: number; blockTimestamp?: string; }[]"
```
## `useEvmContractEvents()` 

Get events for a specific contract ordered by block number in descending order.

### Params:

```sh
chain: EvmChainish,
address: EvmAddressish,
abi: unknown,
subdomain: any,
limit: any,
offset: any,
fromBlock: any,
toBlock: any,
fromDate: any,
toDate: any,
providerUrl: any,
topic: any,
cursor: string,
```

### Example return:

```json
"EvmEvent[]"
```
## `useEvmPairReserves()` 

Get the liquidity reserves for a given pair address. Only Uniswap V2 based exchanges supported at the moment.

### Params:

```sh
chain: EvmChainish,
pairAddress: EvmAddressish,
toBlock: any,
toDate: any,
providerUrl: any,
```

### Example return:

```json
"{ reserve0?: string; reserve1?: string; }"
```
## `useEvmPairAddress()` 

Fetch the pair data of the provided token0+token1 combination.
The token0 and token1 options are interchangable (ie. there is no different outcome in "token0=WETH and token1=USDT" or "token0=USDT and token1=WETH")

### Params:

```sh
chain: EvmChainish,
token0Address: EvmAddressish,
token1Address: EvmAddressish,
toBlock: any,
toDate: any,
exchange: any,
```

### Example return:

```json
"{ token0: { token: { contractAddress: string; chain: string | number; decimals: number; name: string; symbol: string; logo?: string; logoHash?: string; thumbnail?: string; }; blockNumber: string; validated: number; createdAt: Date; }; token1: { token: { contractAddress: string; chain: string | number; decimals: number; name: string; symbol: string; logo?: string; logoHash?: string; thumbnail?: string; }; blockNumber: string; validated: number; createdAt: Date; }; pairAddress: string; }"
```
## `useEvmTokenAllowance()` 

Get the amount which the spender is allowed to withdraw on behalf of the owner.

### Params:

```sh
chain: EvmChainish,
address: EvmAddressish,
ownerAddress: EvmAddressish,
spenderAddress: EvmAddressish,
providerUrl: any,
```

### Example return:

```json
"{ allowance: string; }"
```
## `useEvmTokenTransfers()` 

Get ERC20 token transactions ordered by block number in descending order.

### Params:

```sh
chain: EvmChainish,
address: EvmAddressish,
subdomain: any,
limit: any,
offset: any,
fromBlock: any,
toBlock: any,
fromDate: any,
toDate: any,
cursor: string,
```

### Example return:

```json
"{ chain: string | number; address: string; blockNumber: string; toAddress: string; fromAddress: string; value: string; transactionHash: string; blockTimestamp: Date; blockHash: string; }[]"
```
## `useEvmTokenPrice()` 

Get the token price denominated in the blockchains native token and USD.

### Params:

```sh
chain: "eth" | "0x1" | "ropsten" | "0x3" | "rinkeby" | "0x4" | "goerli" | "0x5" | "kovan" | "0x2a" | "polygon" | "0x89" | "mumbai" | "0x13881" | "bsc" | "0x38" | "bsc testnet" | "0x61" | "avalanche" | "0xa86a" | "avalanche testnet" | "0xa869" | "fantom" | "0xfa" | "cronos" | "0x19" | "cronos testnet" | "0x152",
providerUrl: string,
exchange: string,
toBlock: number,
address: string,
```

### Example return:

```json
"{ exchangeAddress: string; nativePrice: string; usdPrice: number; exchangeName?: string; symbol: Camelize<unknown>; }"
```
## `useEvmTokenMetadataBySymbol()` 

Get metadata (name, symbol, decimals, logo) for a list of token symbols.

### Params:

```sh
chain: EvmChainish,
subdomain: any,
symbols: any,
```

### Example return:

```json
"{ token: { contractAddress: string; chain: string | number; decimals: number; name: string; symbol: string; logo?: string; logoHash?: string; thumbnail?: string; }; blockNumber: string; validated: string; }[]"
```
## `useEvmTokenMetadata()` 

Returns metadata (name, symbol, decimals, logo) for a given token contract address.

### Params:

```sh
chain: EvmChainish,
addresses: EvmAddressish[],
subdomain: any,
providerUrl: any,
```

### Example return:

```json
"{ token: { contractAddress: string; chain: string | number; decimals: number; name: string; symbol: string; logo?: string; logoHash?: string; thumbnail?: string; }; blockNumber: string; validated: string; }[]"
```
## `useEvmWalletTokenTransfers()` 

Get ERC20 token transactions ordered by block number in descending order.

### Params:

```sh
chain: EvmChainish,
address: EvmAddressish,
subdomain: any,
limit: any,
cursor: any,
fromBlock: any,
toBlock: any,
fromDate: any,
toDate: any,
offset: number,
```

### Example return:

```json
"{ chain: string | number; address: string; blockNumber: string; toAddress: string; fromAddress: string; value: string; transactionHash: string; blockTimestamp: Date; blockHash: string; }[]"
```
## `useEvmWalletTokenBalances()` 

Get token balances for a specific address.

### Params:

```sh
chain: EvmChainish,
address: EvmAddressish,
subdomain: any,
tokenAddresses: any,
toBlock: any,
```

### Example return:

```json
"({ value: string; token: { contractAddress: string; chain: string | number; decimals: number; name: string; symbol: string; logo?: string; logoHash?: string; thumbnail?: string; }; } | { value: string; token?: undefined; })[]"
```
## `useEvmWalletNFTCollections()` 

Get the nft collections owned by an user

### Params:

```sh
chain: EvmChainish,
address: EvmAddressish,
limit: any,
cursor: any,
offset: number,
```

### Example return:

```json
"{ chain: string | number; tokenAddress: string; contractType: EvmNftContractType; name: string; symbol: string; }[]"
```
## `useEvmNFTContractTransfers()` 

Get the transfers of the tokens matching the given parameters.

### Params:

```sh
chain: EvmChainish,
address: EvmAddressish,
limit: any,
cursor: any,
format: any,
offset: number,
```

### Example return:

```json
"{ chain: string | number; blockNumber: string; fromAddress: string; toAddress: string; tokenAddress: string; value: string; operator: string; amount?: number; blockHash: string; blockTimestamp: Date; contractType: string; logIndex: number; tokenId: string; transactionHash: string; transactionIndex?: number; transactionType?: string; }[]"
```
## `useEvmSyncNFTContract()` 

Initiates a metadata refresh for an entire NFT collection.

### Params:

```sh
chain: EvmChainish,
address: EvmAddressish,
```

### Example return:

```json
"{ success: boolean; }"
```
## `useEvmNFTTransfers()` 

Get the transfers of an NFT given a conttract address and token ID.

### Params:

```sh
chain: EvmChainish,
address: EvmAddressish,
limit: any,
cursor: any,
format: any,
tokenId: any,
order: any,
offset: number,
```

### Example return:

```json
"{ chain: string | number; blockNumber: string; fromAddress: string; toAddress: string; tokenAddress: string; value: string; operator: string; amount?: number; blockHash: string; blockTimestamp: Date; contractType: string; logIndex: number; tokenId: string; transactionHash: string; transactionIndex?: number; transactionType?: string; }[]"
```
## `useEvmNFTTokenIdOwners()` 

Get all owners of a specific NFT given the contract address and token ID.
* Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection

### Params:

```sh
chain: EvmChainish,
address: EvmAddressish,
limit: any,
cursor: any,
format: any,
tokenId: any,
offset: number,
```

### Example return:

```json
"{ tokenAddress: string; chain: string | number; ownerOf: string; blockNumberMinted: string; blockNumber: string; tokenId: string | number; contractType: EvmNftContractType; tokenUri?: string; tokenHash?: string; metadata?: MoralisDataObjectValue; name?: string; symbol?: string; lastMetadataSync?: Date; lastTokenUriSync?: Date; amount?: number; }[]"
```
## `useEvmNFTMetadata()` 

Get NFT data, including metadata (where available), for the given NFT token id of the given contract address.
* Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection

### Params:

```sh
chain: EvmChainish,
address: EvmAddressish,
format: any,
tokenId: any,
```

### Example return:

```json
"{ tokenAddress: string; chain: string || number; contractType: EvmNftContractType; tokenUri?: string; tokenHash?: string; metadata?: MoralisDataObjectValue; name?: string; symbol?: string; lastMetadataSync?: Date; lastTokenUriSync?: Date; amount?: number; }"
```
## `useEvmReSyncMetadata()` 

ReSync the metadata for an NFT
* The metadata flag will request a the NFT's metadata from the already existing token_uri
* The uri(default) flag will fetch the latest token_uri from the given NFT address. In sync mode the metadata will also be fetched
* The sync mode will make the endpoint synchronous so it will wait for the task to be completed before responding
* The async mode(default) will make the endpoint asynchronous so we will wait for the task to be completed before responding

### Params:

```sh
chain: EvmChainish,
address: EvmAddressish,
tokenId: any,
flag: any,
mode: any,
```

### Example return:

```json
"{ status: string; }"
```
## `useEvmNFTContractMetadata()` 

Get the contract level metadata (name, symbol, base token uri) for the given contract
* Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection

### Params:

```sh
chain: EvmChainish,
address: EvmAddressish,
```

### Example return:

```json
"{ chain: string | number; tokenAddress: string; name: string; symbol: string; contractType: EvmNftContractType; syncedAt?: Date; }"
```
## `useEvmNFTOwners()` 

Get all owners of NFTs within a given contract.
* Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection.

### Params:

```sh
chain: EvmChainish,
address: EvmAddressish,
limit: any,
cursor: any,
format: any,
offset: number,
```

### Example return:

```json
"{ tokenAddress: string; chain: string || number; contractType: EvmNftContractType; tokenUri?: string; tokenHash?: string; metadata?: MoralisDataObjectValue; name?: string; symbol?: string; lastMetadataSync?: Date; lastTokenUriSync?: Date; amount?: number; }[]"
```
## `useEvmContractNFTs()` 

Get all NFTs, including metadata (where available), for all NFTs for the given contract address.
* Results are limited to 100 per page by default
* Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection.

### Params:

```sh
chain: EvmChainish,
address: EvmAddressish,
limit: any,
cursor: any,
format: any,
totalRanges: any,
range: any,
offset: number,
```

### Example return:

```json
"{ tokenAddress: string; chain: string || number; contractType: EvmNftContractType; tokenUri?: string; tokenHash?: string; metadata?: MoralisDataObjectValue; name?: string; symbol?: string; lastMetadataSync?: Date; lastTokenUriSync?: Date; amount?: number; }[]"
```
## `useEvmNFTTransfersFromToBlock()` 

Gets the transfers of the tokens from a block number to a block number.

### Params:

```sh
chain: EvmChainish,
limit: any,
cursor: any,
format: any,
fromBlock: any,
toBlock: any,
fromDate: any,
toDate: any,
offset: number,
```

### Example return:

```json
"{ chain: string | number; blockNumber: string; fromAddress: string; toAddress: string; tokenAddress: string; value: string; operator: string; amount?: number; blockHash: string; blockTimestamp: Date; contractType: string; logIndex: number; tokenId: string; transactionHash: string; transactionIndex?: number; transactionType?: string; }[]"
```
## `useEvmSearchNFTs()` 

Get NFTs that match a given metadata search query.

### Params:

```sh
chain: EvmChainish,
addresses: EvmAddressish[],
limit: any,
cursor: any,
format: any,
fromBlock: any,
toBlock: any,
fromDate: any,
toDate: any,
q: any,
filter: any,
offset: number,
```

### Example return:

```json
"{ token: { tokenAddress: string; chain: string || number; contractType: EvmNftContractType; tokenUri?: string; tokenHash?: string; metadata?: MoralisDataObjectValue; name?: string; symbol?: string; lastMetadataSync?: Date; lastTokenUriSync?: Date; amount?: number; }; lastMetadataSync: string; lastTokenUriSync: string; updatedAt: string; tokenHash: string; blockNumberMinted: string; batchId: string; frozen: number; frozenLogIndex: { [key: string]: unknown; }; imported: { [key: string]: unknown; }; isValid: number; openseaLookup: { [key: string]: unknown; }; resyncing: number; syncing: number; }[]"
```
## `useEvmNFTLowestPrice()` 

Get the lowest executed price for an NFT token contract for the last x days (only trades paid in ETH).

### Params:

```sh
chain: EvmChainish,
address: EvmAddressish,
providerUrl: any,
marketplace: any,
days: any,
```

### Example return:

```json
"{ chain: string | number; sellerAddress: string; buyerAddress: string; marketplaceAddress: string; tokenAddress: string; priceTokenAddress: string; blockNumber: string; price: string; blockTimestamp: string; transactionHash: string; transactionIndex: number; tokenIds: string[]; blockHash: string; }"
```
## `useEvmNFTTrades()` 

Get the nft trades for a given contract and marketplace.

### Params:

```sh
chain: EvmChainish,
address: EvmAddressish,
limit: any,
cursor: any,
fromBlock: any,
toBlock: any,
fromDate: any,
toDate: any,
providerUrl: any,
marketplace: any,
offset: number,
```

### Example return:

```json
"{ chain: string | number; sellerAddress: string; buyerAddress: string; marketplaceAddress: string; tokenAddress: string; priceTokenAddress: string; blockNumber: string; price: string; blockTimestamp: string; transactionHash: string; transactionIndex: number; tokenIds: string[]; blockHash: string; }[]"
```
## `useEvmWalletNFTTransfers()` 

Get the transfers of the tokens matching the given parameters.

### Params:

```sh
chain: EvmChainish,
address: EvmAddressish,
limit: any,
cursor: any,
format: any,
direction: any,
fromBlock: any,
toBlock: any,
offset: number,
```

### Example return:

```json
"{ chain: string | number; blockNumber: string; fromAddress: string; toAddress: string; tokenAddress: string; value: string; operator: string; amount?: number; blockHash: string; blockTimestamp: Date; contractType: string; logIndex: number; tokenId: string; transactionHash: string; transactionIndex?: number; transactionType?: string; }[]"
```
## `useEvmWalletNFTs()` 

Get NFTs owned by a given address.
* The response will include status [SYNCED/SYNCING] based on the contracts being indexed.
* Use the token_address param to get results for a specific contract only
* Note results will include all indexed NFTs
* Any request which includes the token_address param will start the indexing process for that NFT collection the very first time it is requested.

### Params:

```sh
chain: EvmChainish,
tokenAddresses: EvmAddressish[],
address: EvmAddressish,
limit: any,
cursor: any,
format: any,
offset: number,
```

### Example return:

```json
"{ tokenAddress: string; chain: string || number; contractType: EvmNftContractType; tokenUri?: string; tokenHash?: string; metadata?: MoralisDataObjectValue; name?: string; symbol?: string; lastMetadataSync?: Date; lastTokenUriSync?: Date; amount?: number; }[]"
```
## `useEvmNFTTransfersByBlock()` 

Get NFT transfers by block number or block hash.

### Params:

```sh
chain: EvmChainish,
subdomain: any,
limit: any,
cursor: any,
blockNumberOrHash: any,
offset: number,
```

### Example return:

```json
"{ chain: string | number; blockNumber: string; fromAddress: string; toAddress: string; tokenAddress: string; value: string; operator: string; amount?: number; blockHash: string; blockTimestamp: Date; contractType: string; logIndex: number; tokenId: string; transactionHash: string; transactionIndex?: number; transactionType?: string; }[]"
```