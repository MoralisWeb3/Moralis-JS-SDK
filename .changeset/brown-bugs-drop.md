---
'@moralisweb3/react': minor
---

- Switched from `SWR` to `@tanstack/react-query`
- Updated `MoralisConfig` options: `cacheTime`, `enabled`, `onError`, `onSettled`, `onSuccess`, `refetchInterval`, `refetchOnWindowFocus`, `staleTime`, `suspense'
- All hooks accept fetch config directly to params e.g. `useEvmBlock({ chain: '0x13881', blockNumberOrHash: '10000', enabled: false, onSuccess: (res) => foo(), })`
