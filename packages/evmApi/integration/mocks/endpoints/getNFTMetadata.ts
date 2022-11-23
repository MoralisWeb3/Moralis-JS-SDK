import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../response/errorResponse';

export const mockGetNFTMetadata = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetNFTMetadata',
    url: `/nft/:address/:tokenId`,
    getParams: (req) => ({
      address: req.params.address,
      tokenId: req.params.tokenId,
    }),
  },
  [
    {
      condition: {
        address: '0x75e3e9c92162e62000425c98769965a76c2e387a',
        tokenId: '15',
      },
      response: {
        token_address: '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB',
        token_id: '15',
        owner_of: '0x9c83ff0f1c8924da96cb2fcb7e093f78eb2e316b',
        token_hash: '502cee781b0fb40ea02508b21d319ced',
        block_number: '88256',
        block_number_minted: '88256',
        contract_type: 'ERC721',
        token_uri: 'string',
        metadata: 'string',
        normalized_metadata: {
          name: 'Moralis Mug',
          description:
            'Moralis Coffee nug 3D Asset that can be used in 3D worldspaces. This NFT is presented as a flat PNG, a Unity3D Prefab and a standard fbx.',
          image:
            'https://arw2wxg84h6b.moralishost.com:2053/server/files/tNJatzsHirx4V2VAep6sc923OYGxvkpBeJttR7Ks/de504bbadadcbe30c86278342fcf2560_moralismug.png',
          external_link: 'https://giphy.com/gifs/loop-recursion-ting-aaODAv1iuQdgI',
          animation_url: 'https://giphy.com/gifs/food-design-donuts-o9ngTPVYW4qo8',
          attributes: [
            {
              trait_type: 'Eye Color',
              value: 'hazel',
              display_type: 'string',
              max_value: 100,
              trait_count: 7,
              order: 1,
            },
          ],
        },
        minter_address: '0x9c83ff0f1c8924da96cb2fcb7e093f78eb2e316b',
        last_token_uri_sync: 'string',
        last_metadata_sync: 'string',
        amount: '1',
        name: 'CryptoKitties',
        symbol: 'RARI',
      },
    },
    {
      condition: {
        address: '0x75e3e9c92162e62000425c98769965a76c2e387',
        tokenId: '15',
      },
      responseStatus: 400,
      response: createErrorResponse('[C0005] Invalid address provided'),
    },
    {
      condition: {
        address: '0x75e3e9c92162e62000425c98769965a76c2e387a',
        tokenId: '000000215',
      },
      responseStatus: 400,
      response: createErrorResponse('[C0006] Request failed, Bad Request(400): [C0005] Invalid TokenId provided'),
    },
  ],
);
