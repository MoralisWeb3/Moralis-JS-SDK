import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../response/errorResponse';

export const mockGetWalletNFTs = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetWalletNFTs',
    url: `/:address/nft`,
    getParams: (req) => ({
      address: req.params.address,
    }),
  },
  [
    {
      condition: {
        address: '0x75e3e9c92162e62000425c98769965a76c2e387a',
      },
      response: {
        status: 'SYNCING',
        total: 2000,
        page: 2,
        page_size: 100,
        cursor: 'string',
        result: [
          {
            token_address: '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB',
            token_id: '15',
            contract_type: 'ERC721',
            owner_of: '0x057Ec652A4F150f7FF94f089A38008f49a0DF88e',
            block_number: '88256',
            block_number_minted: '88256',
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
            amount: '1',
            name: 'CryptoKitties',
            symbol: 'RARI',
            token_hash: '502cee781b0fb40ea02508b21d319ced',
            last_token_uri_sync: '2021-02-24T00:47:26.647Z',
            last_metadata_sync: '2021-02-24T00:47:26.647Z',
          },
        ],
      },
    },
    {
      condition: {
        address: '0x75e3e9c92162e62000425c98769965a76c2e387',
      },
      responseStatus: 400,
      response: createErrorResponse('[C0005] Invalid address provided'),
    },
  ],
);
