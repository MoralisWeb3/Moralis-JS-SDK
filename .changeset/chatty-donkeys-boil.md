---
'@moralisweb3/evm-api': patch
---

Evm api endpoints have been renamed. All methods now are listed under these categories: nft, token, defi, events, transaction, balance, block, resolve, ipfs, utils. Below you can find an overview of all the new methods.
The old methods, still work and will be redirected to the new methods. In the next major release, these old methods will be removed.

## NFT API

- native.getNFTTransfersByBlock => nft.getNFTTransfersByBlock
- account.getNFTs => **nft.getWalletNFTs**
- account.getNFTTransfers => **nft.getWalletNFTTransfers**
- account.getNFTsForContract (Will deprecate. Same func as getNFTs)
- token.getNFTTrades => nft.getNFTTrades
- token.getNFTLowestPrice => nft.getNFTLowestPrice
- token.searchNFTs => nft.searchNFTs
- token.getNFTTransfersFromToBlock => nft.getNFTTransfersFromToBlock
- token.getAllTokenIds => **nft.getContractNFTs**
- token.getNFTOwners => nft.getNFTOwners
- token.getNFTMetadata => **nft.getNFTContractMetadata**
- token.reSyncMetadata => nft.reSyncMetadata
- token.getTokenIdMetadata => **nft.getNFTMetadata** (switch name with token.getNFTMetadata)
- token.getTokenIdOwners => **nft.getNFTTokenIdOwners**
- token.getWalletTokenIdTransfers => **nft.getNFTTransfers**
- contract.syncNFTContract => nft.syncNFTContract
- token.getContractNFTTransfers => **nft.getNFTContractTransfers**

## Token API

- account.getTokenBalances => **token.getWalletTokenBalances**
- account.getTokenTransfers => **token.getWalletTokenTransfers**
- token.getTokenMetadata => token.getTokenMetadata
- token.getTokenMetadataBySymbol => token.getTokenMetadataBySymbol
- token.getTokenPrice => token.getTokenPrice
- token.getTokenAddressTransfers => **token.getTokenTransfers** (switch name with account.getTokenTransfers)
- token.getTokenAllowance => token.getTokenAllowance

## DeFi API

- defi.getPairReserves => defi.getPairReserves
- defi.getPairAddress => defi.getPairAddress

## Events API

- native.getContractEvents => events.getContractEvents
- native.getLogsByAddress => **events.getContractLogs**

## Transaction API

- native.getTransaction => transaction.getTransaction
- account.getTransactions => **transaction.getWalletTransactions**

## Balance API

- account.getNativeBalance => balance.getNativeBalance

## Block API

- native.getBlock => block.getBlock
- native.getDateToBlock => block.getDateToBlock

## Domain API

- resolve.resolveDomain => resolve.resolveDomain
- resolve.resolveAddress => resolve.resolveAddress

## IPFS API

- storage.uploadFolder => ipfs.uploadFolder

## Utils API

- native.runContractFunction => utils.runContractFunction
- info.web3ApiVersion => utils.web3ApiVersion
- info.endpointWeights => utils.endpointWeights
