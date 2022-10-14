---
'@moralisweb3/evm-api': patch
'@moralisweb3/evm-utils': patch
---

Due to inconsistencies in the api regarding `contractType` on NFT datatypes, we have removed the tight validation check. This means that the type is not 'ERC721' | 'ERC1155' anymore, but a string. This allows other contractTypes to be parsed without throwing errors
