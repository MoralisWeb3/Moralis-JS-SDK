---
'@moralisweb3/api-utils': minor
'@moralisweb3/auth': minor
'@moralisweb3/core': minor
'@moralisweb3/evm-api': minor
'@moralisweb3/evm-utils': minor
'moralis': minor
'@moralisweb3/sol-api': minor
'@moralisweb3/sol-utils': minor
---

Include all files from `/lib` in npm builds. This fixes a bug where only the index.js file and .d.ts files were included in builds.
