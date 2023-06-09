---
'moralis': patch
'@moralisweb3/streams': patch
---

Added new configuration: `streamsSecret` to the `Moralis.start` method. This option allows you to specify a custom secret used by the `Moralis.Streams.verifySignature` function.
