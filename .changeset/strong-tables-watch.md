---
'@moralisweb3/common-evm-utils': patch
'@moralisweb3/evm-api': patch
'moralis': patch
---

Added to `Erc20Burn`, `Erc20Mint` and `Erc20Approval` classes 4 new fields: `tokenName`, `tokenLogo`, `tokenSymbol` and `tokenDecimals`. These classes are used by the following EVM API methods: `getErc20Approvals`, `getErc20Burns` and `getErc20Mints`.
