---
'@moralisweb3/evm-api': patch
'@moralisweb3/evm-utils': patch
---

Fixed a wrong calculated pagination size. Added the `hasNext()` method to a paginated result. Now you must call it before you call the `next()` method.

```ts
let response = await Moralis.EvmApi.token.getNFTOwners({
  /* ... */
});

while (response.hasNext()) {
  response = await response.next();
  // ...
}
```
