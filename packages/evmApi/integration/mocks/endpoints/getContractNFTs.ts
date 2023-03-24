import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../response/errorResponse';

export const mockGetContractNFTs = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetContractNFTs',
    url: `/nft/:address`,
    getParams: ({ req }) => ({
      address: req.params.address,
      disable_total: req.url.searchParams.get('disable_total'),
      media_items: req.url.searchParams.get('media_items'),
      limit: req.url.searchParams.get('limit'),
    }),
  },
  [
    {
      condition: {
        address: '0x75e3e9c92162e62000425c98769965a76c2e387a',
        disable_total: 'false',
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
            possible_spam: false,
          },
        ],
      },
    },

    {
      condition: {
        address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
        media_items: 'true',
        limit: '1',
      },
      response: {
        total: null,
        page: 1,
        page_size: 1,
        cursor:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21QYXJhbXMiOnsid2FsbGV0QWRkcmVzcyI6IjB4ZDhkYTZiZjI2OTY0YWY5ZDdlZWQ5ZTAzZTUzNDE1ZDM3YWE5NjA0NSJ9LCJrZXlzIjpbIjE2Nzk0OTcwNzQuNzA0Il0sIndoZXJlIjp7Im93bmVyX29mIjoiMHhkOGRhNmJmMjY5NjRhZjlkN2VlZDllMDNlNTM0MTVkMzdhYTk2MDQ1In0sImxpbWl0IjoxLCJvZmZzZXQiOjAsIm9yZGVyIjpbXSwiZGlzYWJsZV90b3RhbCI6dHJ1ZSwidG90YWwiOm51bGwsInBhZ2UiOjEsInRhaWxPZmZzZXQiOjEsImlhdCI6MTY3OTQ5NzA5NH0.JXtPZHQ6Lwucv3T2Qp2bR3kGc-tTHBCN11GKBu2jagM',
        result: [
          {
            token_address: '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb',
            token_id: '9082',
            amount: '1',
            token_hash: 'fffdaced3ddfb220d9124289a518bb97',
            block_number_minted: '12021693',
            updated_at: null,
            contract_type: null,
            name: 'CRYPTOPUNKS',
            symbol: 'Ͼ',
            token_uri: 'https://www.larvalabs.com/cryptopunks/details/9082',
            metadata:
              '{"image":"https://www.larvalabs.com/cryptopunks/cryptopunk9082.png","name":"CryptoPunk 9082","attributes":["Bandana","Big Shades","Shadow Beard"],"description":"Male"}',
            last_token_uri_sync: null,
            last_metadata_sync: '2022-10-05T17:55:52.262Z',
            minter_address: null,
            media: {
              original_media_url: 'https://i.seadn.io/gcs/files/4c1618ad9dfd7bfe280c82354ce07812.png?w=500&auto=format',
              status: 'processing',
              updatedAt: '2023-03-22T14:58:14.245Z',
            },
            possible_spam: false,
          },
        ],
        status: 'SYNCED',
      },
    },
    {
      condition: {
        address: '0x00625c59f4a63a1352612663eb2a6717bfa8433b',
        media_items: 'true',
        limit: '1',
      },
      response: {
        total: null,
        page: 0,
        page_size: 1,
        cursor:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3aGVyZSI6eyJ0b2tlbl9hZGRyZXNzIjoiMHhiNDdlM2NkODM3ZGRmOGU0YzU3ZjA1ZDcwYWI4NjVkZTZlMTkzYmJiIn0sInRva2VuX2FkZHJlc3MiOiIweGI0N2UzY2Q4MzdkZGY4ZTRjNTdmMDVkNzBhYjg2NWRlNmUxOTNiYmIiLCJsaW1pdCI6MSwib2Zmc2V0IjowLCJvcmRlciI6W10sInBhZ2UiOjEsImtleSI6ImZmZmRhY2VkM2RkZmIyMjBkOTEyNDI4OWE1MThiYjk3IiwidG90YWwiOm51bGwsImlhdCI6MTY3OTQ5OTU0NX0.GJTzzFVO1eJM9hlFxh4U8DKb6Tuu2mtlojCf9U90jQI',
        result: [
          {
            token_address: '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb',
            token_id: '9082',
            amount: '1',
            token_hash: 'fffdaced3ddfb220d9124289a518bb97',
            block_number_minted: '12021693',
            updated_at: null,
            contract_type: null,
            name: 'CRYPTOPUNKS',
            symbol: 'Ͼ',
            token_uri: 'https://www.larvalabs.com/cryptopunks/details/9082',
            metadata:
              '{"image":"https://www.larvalabs.com/cryptopunks/cryptopunk9082.png","name":"CryptoPunk 9082","attributes":["Bandana","Big Shades","Shadow Beard"],"description":"Male"}',
            last_token_uri_sync: null,
            last_metadata_sync: '2022-10-05T17:55:52.262Z',
            minter_address: null,
            possible_spam: false,
            media: {
              media_collection: {
                low: {
                  height: 100,
                  width: 100,
                  url: 'https://nft-preview-media.s3.us-east-1.amazonaws.com/evm/0x1/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb/0xed1b0d5a973a63694e3d8cfb1a5ace4485b37eba2a7ea846a1f5e52ba934be0e/low.png',
                },
                medium: {
                  height: 250,
                  width: 250,
                  url: 'https://nft-preview-media.s3.us-east-1.amazonaws.com/evm/0x1/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb/0xed1b0d5a973a63694e3d8cfb1a5ace4485b37eba2a7ea846a1f5e52ba934be0e/medium.png',
                },
                high: {
                  height: 500,
                  width: 500,
                  url: 'https://nft-preview-media.s3.us-east-1.amazonaws.com/evm/0x1/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb/0xed1b0d5a973a63694e3d8cfb1a5ace4485b37eba2a7ea846a1f5e52ba934be0e/high.png',
                },
              },
              category: 'image',
              mimetype: 'image/png',
              parent_hash: '0x21ba1263dd63696f0d9ede101b00a4e2f4985a854483076c92a3415624fca051',
              status: 'success',
              updatedAt: '2023-03-17T14:12:24.192Z',
              original_media_url: 'https://www.larvalabs.com/cryptopunks/cryptopunk9082.png',
            },
          },
        ],
      },
    },

    {
      condition: {
        address: '0x75e3e9c92162e62000425c98769965a76c2e387',
        disable_total: 'true',
      },
      responseStatus: 400,
      response: createErrorResponse('[C0005] Invalid address provided'),
    },
  ],
);
