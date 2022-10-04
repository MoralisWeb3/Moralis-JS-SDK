---
'@moralisweb3/auth': patch
'@moralisweb3/evm-utils': patch
'@moralisweb3/streams': patch
---

Rename `network` param to `networkType` for `Moralis.Streams` and `Moralis.Auth`, to communicate more clearly the purpose of this param. Also make this value optional and default to `"evm"`
