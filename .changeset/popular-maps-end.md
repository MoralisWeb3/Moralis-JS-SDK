---
'@moralisweb3/common-evm-utils': minor
'@moralisweb3/evm-api': minor
---

**Breaking change**: The `nft.getNFTTrades()` methods returns the `EvmTrade` class as the result. The `EvmNftTrade` class has been deleted. The SDK uses now the `EvmTrade` instead. The `EvmTrade` has two differences with comparison with the `EvmNftTrade`:

- the `transactionIndex` property is the `string` type now (previously `number`),
- the `blockTimestamp` property is `string` type now (previously `Date`).
