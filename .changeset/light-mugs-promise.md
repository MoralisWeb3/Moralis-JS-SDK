---
'@moralisweb3/common-evm-utils': minor
'@moralisweb3/evm-api': minor
'@moralisweb3/react': minor
'@moralisweb3/next': minor
'moralis': minor
---

This version implements [breaking changes](https://docs.moralis.io/changelog/essential-api-changes) in the Moralis EVM API.

Deleted endpoints:

- `getErc20Approvals`
- `getErc20Burns`
- `getErc20Mints`
- `getErc20Transfers`
- `searchNFTs`

New endpoints:

- `getBlockStats`
- `getNFTCollectionStats`
- `getNFTTokenStats`
- `getTokenStats`
- `getWalletStats`
