import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../response/errorResponse';

export const mockGetNFTOwners = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetNFTOwners',
    url: `/nft/:address/owners`,
    getParams: ({ req }) => ({
      address: req.params.address,
      media_items: req.url.searchParams.get('media_items'),
      limit: req.url.searchParams.get('limit'),
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
        address: '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb',
        limit: '1',
        media_items: 'true',
      },
      response: {
        status: 'SYNCING',
        total: 2000,
        page: 2,
        page_size: 100,
        cursor: 'string',
        result: [
          {
            token_address: '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb',
            token_id: '5196',
            amount: '1',
            owner_of: '0xb7f7f6c52f2e2fdb1963eab30438024864c313f6',
            token_hash: 'fa300cfef85eda0b95c69ac7394627d7',
            block_number_minted: '10977604',
            block_number: '16884100',
            contract_type: null,
            name: 'CRYPTOPUNKS',
            symbol: 'Ͼ',
            token_uri: 'https://www.larvalabs.com/cryptopunks/details/5196',
            metadata:
              '{"image":"https://www.larvalabs.com/cryptopunks/cryptopunk5196.png","name":"CryptoPunk 5196","attributes":["Vampire Hair","Front Beard"],"description":"Male"}',
            last_token_uri_sync: null,
            last_metadata_sync: '2022-07-24T12:42:58.248Z',
            minter_address: null,
            media: {
              original_media_url: 'https://www.larvalabs.com/cryptopunks/cryptopunk5196.png',
              status: 'processing',
              updatedAt: '2023-03-22T15:46:34.453Z',
            },
          },
        ],
      },
    },
    {
      condition: {
        address: '0x00625c59f4a63a1352612663eb2a6717bfa8433b',
        limit: '1',
        media_items: 'true',
      },
      response: {
        total: null,
        page: 1,
        page_size: 1,
        cursor:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21QYXJhbXMiOnsidG9rZW5BZGRyZXNzIjoiMHhiNDdlM2NkODM3ZGRmOGU0YzU3ZjA1ZDcwYWI4NjVkZTZlMTkzYmJiIn0sImtleXMiOlsiMTY3OTUwMDEzMi42MzIiXSwid2hlcmUiOnsidG9rZW5fYWRkcmVzcyI6IjB4YjQ3ZTNjZDgzN2RkZjhlNGM1N2YwNWQ3MGFiODY1ZGU2ZTE5M2JiYiJ9LCJsaW1pdCI6MSwib2Zmc2V0IjowLCJvcmRlciI6W10sImRpc2FibGVfdG90YWwiOnRydWUsInRvdGFsIjpudWxsLCJwYWdlIjoxLCJ0YWlsT2Zmc2V0IjoxLCJpYXQiOjE2Nzk1MDAyODl9.4D9s4eaYurtD3_Fc19NND0rUP0qwNetC_IcQJEhrxTY',
        result: [
          {
            token_address: '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb',
            token_id: '2318',
            amount: '1',
            owner_of: '0xb7f7f6c52f2e2fdb1963eab30438024864c313f6',
            token_hash: '243c73bf770ab12a71de396e21483bb7',
            block_number_minted: '3918580',
            block_number: '16884122',
            contract_type: null,
            name: 'CRYPTOPUNKS',
            symbol: 'Ͼ',
            token_uri: 'https://www.larvalabs.com/cryptopunks/details/2318',
            metadata:
              '{"image":"https://www.larvalabs.com/cryptopunks/cryptopunk2318.png","name":"CryptoPunk 2318","attributes":["Blue Eye Shadow","Half Shaved","Purple Lipstick"],"description":"Female"}',
            last_token_uri_sync: null,
            last_metadata_sync: '2022-07-24T12:12:27.630Z',
            minter_address: '0xc352b534e8b987e036a93539fd6897f53488e56a',
            media: {
              media_collection: {
                low: {
                  height: 100,
                  width: 100,
                  url: 'https://nft-preview-media.s3.us-east-1.amazonaws.com/evm/0x1/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb/0x07b2dc02b9684b0238e4c00fd4c0a9bb1383ffc2a13adf506c81cc13b5a9787a/low.png',
                },
                medium: {
                  height: 250,
                  width: 250,
                  url: 'https://nft-preview-media.s3.us-east-1.amazonaws.com/evm/0x1/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb/0x07b2dc02b9684b0238e4c00fd4c0a9bb1383ffc2a13adf506c81cc13b5a9787a/medium.png',
                },
                high: {
                  height: 500,
                  width: 500,
                  url: 'https://nft-preview-media.s3.us-east-1.amazonaws.com/evm/0x1/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb/0x07b2dc02b9684b0238e4c00fd4c0a9bb1383ffc2a13adf506c81cc13b5a9787a/high.png',
                },
              },
              category: 'image',
              mimetype: 'image/png',
              parent_hash: '0x214d595a6f82929f2c202ce5ebea95525c2368b8106ffb5b911ef5fa80c63f7a',
              status: 'success',
              updatedAt: '2023-03-22T15:51:25.836Z',
              original_media_url: 'https://www.larvalabs.com/cryptopunks/cryptopunk2318.png',
            },
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
