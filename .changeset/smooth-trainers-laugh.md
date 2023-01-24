---
'@moralisweb3/common-evm-utils': patch
'@moralisweb3/evm-api': patch
---

Fix response of `EvmApi.nft.getNFTTransfersByBlock`:

- `result.value` shows now the value correctly in wei (As a BigNumber)
- `result.tokenAddress` shows not the correct token address
