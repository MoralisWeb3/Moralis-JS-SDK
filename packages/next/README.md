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

This project is a thin NextJS wrapper around [Moralis](https://moralis.io/), to easily call functionalities and display data. It  serves as a proxy, to allow users to access Moralis APIs in client-side.

Please check the [official documentation of Moralis](https://docs.moralis.io/) for all the functionalities of Moralis.

# ⚙️ Quick start

Make sure to have `next`, `react`, `react-dom` and `moralis` installed as dependencies, then install `@moralisweb3/next`

In short:

```sh
npm install moralis @moralisweb3/next next react react-dom
```

or

```sh
yarn add moralis @moralisweb3/next next react react-dom
```

> Make sure to also  `moralis` to the latest version, when you update `@moralisweb3/next`.

### Create environment variables file

Add a new file `.env.local` in project's root and provide a new variable with [Moralis API key](https://docs.moralis.io/docs/nextjs-dapp#add-moralis-to-your-nextjs-dapp):

```sh
MORALIS_API_KEY= ***
```

### Create API route
To use Moralis APIs in your NextJs project create a file `pages/api/moralis/[...moralis].ts` with following code:

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

