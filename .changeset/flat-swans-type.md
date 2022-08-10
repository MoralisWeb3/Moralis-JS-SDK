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

Improve Erc20Value logic by:

- geters for Erc20 for: `token.decimals`, `token.name`, `token.symbol`, `token.contractAddress`, `token.chain`, `token.logo`, `token.logoHash` and `token.thumbnail`,
- adding an optional token reference for `Erc20Value`. This can be used by calling `Erc20Value.create(amount, { token })`
- fixes and additions for output of `Erc20Value`:
  - `erc20Value.value` now returns the value in a decimal string `"123.567"`
  - `erc20Value.amount` returns the Bignumber value withtout taking decimals into account
  - `erc20Value.decimals` returns the decimals
  - `erc20Value.toNumber()` returns the value in a decimal number (or throws an error if the value is too big): `123.456`
  - `erc20Value.display()` returns the value in a readable string with the token symbol if available: `"123.456 LINK"` (or `"123.456"`)
- `Moralis.EvmApi.getTokenBalances()` now returns an `Erc20Value` object with associated token information.
