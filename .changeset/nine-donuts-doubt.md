---
'@moralisweb3/core': patch
'@moralisweb3/auth': patch
'@moralisweb3/evm-api': patch
'moralis': patch
'@moralisweb3/sol-api': patch
'@moralisweb3/streams': patch
---

Fix parsing of API error messages, now the MoralisError will show the `message` that is returned from the api.
