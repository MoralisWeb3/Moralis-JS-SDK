---
'@moralisweb3/api-utils': patch
'@moralisweb3/auth': patch
'@moralisweb3/client-api-utils': patch
'@moralisweb3/client-evm-api': patch
'@moralisweb3/client-firebase-api-utils': patch
'@moralisweb3/client-firebase-auth-utils': patch
'@moralisweb3/client-firebase-evm-api': patch
'@moralisweb3/client-firebase-evm-auth': patch
'@moralisweb3/client-firebase-sol-api': patch
'@moralisweb3/client-firebase-sol-auth': patch
'@moralisweb3/client-sol-api': patch
'@moralisweb3/codegen': patch
'@moralisweb3/common-auth-utils': patch
'@moralisweb3/common-core': patch
'@moralisweb3/common-evm-utils': patch
'@moralisweb3/common-sol-utils': patch
'@moralisweb3/common-streams-utils': patch
'create-moralis-dapp': patch
'@moralisweb3/evm-api': patch
'@moralisweb3/evm-utils': patch
'moralis': patch
'@moralisweb3/next': patch
'@moralisweb3/parse-server': patch
'@moralisweb3/sol-api': patch
'@moralisweb3/sol-utils': patch
'@moralisweb3/streams': patch
'@moralisweb3/test-utils': patch
---

Update api types to include latest features and fixes of evmApi and streams. This includes:

- removal of deprecated `subdomain` and `providerUrl` params
- evm endpooint for `getMultipleNFTs`
- evm endpoint updated for `getNFTContractTransfers` to include `fromBlock`, `toBlock`, `fromDate` and `toDate` params
- streams support for `getNativeBalances`
