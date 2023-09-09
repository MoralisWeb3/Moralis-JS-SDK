---
'@moralisweb3/common-evm-utils': minor
'@moralisweb3/evm-api': minor
'@moralisweb3/react': minor
'@moralisweb3/next': minor
'moralis': minor
---

This version implements [breaking changes](https://docs.moralis.io/changelog/essential-api-changes) in the Moralis EVM API.

Deleted endpoints:

- `getErc20Approvals`,
- `getErc20Burns`,
- `getErc20Mints`,
- `getErc20Transfers`,
- `searchNFTs`.

New endpoints:

- `getBlockStats`,
- `getNFTCollectionStats`,
- `getNFTTokenStats`,
- `getTokenStats`,
- `getWalletStats`.

Updated endpoints:

- `getTokenTransfers`, `getNFTs`, `getWalletNFTCollections`, `getNFTTrades`, `getNFTTransfers`, `getContractNFTTransfers`, `getNFTOwners`, `getTokenAddressTransfers`, `getWalletTokenIdTransfers`, `getAllTokenIds`, `getNFTTransfersFromToBlock`, `getNFTTransfersByBlock`, `getTokenIdOwners`, `getTransactions`, `getContractEvents` - the `total` field in the response is not available anymore, the `disable_total` parameter is now removed,
- `getNFTTransfers` - doesn't support the `direction` parameter anymore,
- `getLogsByAddress` - the `topic0` parameter is now required, `topic1`, `topic2` and `topic3` are now removed.
