import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../response/errorResponse';

export const mockGetWalletNFTs = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetWalletNFTs',
    url: `/:address/nft`,
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
            possible_spam: false,
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
            token_address: '0x495f947276749ce646f68ac8c248420045cb7b5e',
            token_id: '66388772599617078469438904114703984066464599303204452128467118810569801465862',
            amount: '1',
            owner_of: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
            token_hash: '2a86a0e5fd99ffa6623b6a6dc3adbf25',
            block_number_minted: '16883868',
            block_number: '16883868',
            contract_type: 'ERC1155',
            name: 'OpenSea Shared Storefront',
            symbol: 'OPENSTORE',
            token_uri:
              'https://api.opensea.io/api/v1/metadata/0x495f947276749Ce646f68AC8c248420045cb7b5e/0x92c6b6b4a1817e76b56eb3e1724f9df6026dd63c000000000000410000000006',
            metadata:
              '{"image":"https://i.seadn.io/gcs/files/4c1618ad9dfd7bfe280c82354ce07812.png?w=500&auto=format","name":"#31.1","description":null,"external_link":null,"animation_url":"https://openseauserdata.com/files/017b9d87385c1659889a9f0adbc723a3.mp4"}',
            last_token_uri_sync: '2023-03-22T14:57:55.980Z',
            last_metadata_sync: '2023-03-22T14:58:10.199Z',
            minter_address: "ERC1155 tokens don't have a single minter",
            possible_spam: false,

            media: {
              original_media_url: 'https://i.seadn.io/gcs/files/4c1618ad9dfd7bfe280c82354ce07812.png?w=500&auto=format',
              status: 'processing',
              updatedAt: '2023-03-22T14:58:14.245Z',
            },
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
        page: 1,
        page_size: 1,
        cursor:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21QYXJhbXMiOnsid2FsbGV0QWRkcmVzcyI6IjB4ZDhkYTZiZjI2OTY0YWY5ZDdlZWQ5ZTAzZTUzNDE1ZDM3YWE5NjA0NSJ9LCJrZXlzIjpbIjE2Nzk0OTcwNzQuNzA0Il0sIndoZXJlIjp7Im93bmVyX29mIjoiMHhkOGRhNmJmMjY5NjRhZjlkN2VlZDllMDNlNTM0MTVkMzdhYTk2MDQ1In0sImxpbWl0IjoxLCJvZmZzZXQiOjAsIm9yZGVyIjpbXSwiZGlzYWJsZV90b3RhbCI6dHJ1ZSwidG90YWwiOm51bGwsInBhZ2UiOjEsInRhaWxPZmZzZXQiOjEsImlhdCI6MTY3OTQ5NzIyOX0.ITy53UNRCjMC2Rp8HVAHMXbWHDJyO43UPAQiojHfd98',
        result: [
          {
            token_address: '0x495f947276749ce646f68ac8c248420045cb7b5e',
            token_id: '66388772599617078469438904114703984066464599303204452128467118810569801465862',
            amount: '1',
            owner_of: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
            token_hash: '2a86a0e5fd99ffa6623b6a6dc3adbf25',
            block_number_minted: '16883868',
            block_number: '16883868',
            contract_type: 'ERC1155',
            name: 'OpenSea Shared Storefront',
            symbol: 'OPENSTORE',
            token_uri:
              'https://api.opensea.io/api/v1/metadata/0x495f947276749Ce646f68AC8c248420045cb7b5e/0x92c6b6b4a1817e76b56eb3e1724f9df6026dd63c000000000000410000000006',
            metadata:
              '{"image":"https://i.seadn.io/gcs/files/4c1618ad9dfd7bfe280c82354ce07812.png?w=500&auto=format","name":"#31.1","description":null,"external_link":null,"animation_url":"https://openseauserdata.com/files/017b9d87385c1659889a9f0adbc723a3.mp4"}',
            last_token_uri_sync: '2023-03-22T14:57:55.980Z',
            last_metadata_sync: '2023-03-22T14:58:10.199Z',
            minter_address: "ERC1155 tokens don't have a single minter",
            possible_spam: false,

            media: {
              media_collection: {
                low: {
                  url: 'https://nft-preview-media.s3.us-east-1.amazonaws.com/evm/0x1/0x495f947276749ce646f68ac8c248420045cb7b5e/0x21679e75b63fa1774f87b8a83294991f5b93430566f60f364947b8839b81056d/low.png',
                  width: 100,
                  height: 100,
                },
                medium: {
                  url: 'https://nft-preview-media.s3.us-east-1.amazonaws.com/evm/0x1/0x495f947276749ce646f68ac8c248420045cb7b5e/0x21679e75b63fa1774f87b8a83294991f5b93430566f60f364947b8839b81056d/medium.png',
                  width: 250,
                  height: 250,
                },
                high: {
                  url: 'https://nft-preview-media.s3.us-east-1.amazonaws.com/evm/0x1/0x495f947276749ce646f68ac8c248420045cb7b5e/0x21679e75b63fa1774f87b8a83294991f5b93430566f60f364947b8839b81056d/high.png',
                  width: 500,
                  height: 500,
                },
              },
              category: 'image',
              mimetype: 'image/png',
              parent_hash: '0x4df48bc51cd3fecb22c69a79bffc1dbad03def485aa8e0bb3eaabd9d8516e627',
              status: 'success',
              updatedAt: '2023-03-22T14:58:14.880Z',
              original_media_url: 'https://i.seadn.io/gcs/files/4c1618ad9dfd7bfe280c82354ce07812.png?w=500&auto=format',
            },
          },
        ],
        status: 'SYNCED',
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
