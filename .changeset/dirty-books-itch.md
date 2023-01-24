---
'@moralisweb3/common-auth-utils': minor
'@moralisweb3/common-evm-utils': minor
'@moralisweb3/evm-api': minor
'@moralisweb3/auth': minor
---

Updated operations to properly support updated endpoints.
New endpoint to get the native balance for multiple addresses:

- added `Moralis.EvmApi.getNativeBalancesForAddresses()`

Endpoints to get/add/remove addresses to an authenticated profile:

- added `Moralis.Auth.getAddresses()`
- added `Moralis.Auth.requestBind()`
- added `Moralis.Auth.verifyRequestBind()`
- added `Moralis.Auth.removeBind()`
- added `Moralis.Auth.verifyRemoveBind()`
