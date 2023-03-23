import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../response/errorResponse';

export const mockGetNFTTokenIdOwners = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetNFTTokenIdOwners',
    url: `/nft/:address/:tokenId/owners`,
    getParams: ({ req }) => ({
      address: req.params.address,
      tokenId: req.params.tokenId,
      media_items: req.url.searchParams.get('media_items'),
    }),
  },
  [
    {
      condition: {
        address: '0x057ec652a4f150f7ff94f089a38008f49a0df88e',
        tokenId: '15',
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
            owner_of: '0x057ec652a4f150f7ff94f089a38008f49a0df88e',
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
        tokenId: '15',
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
            token_address: '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB',
            token_id: '15',
            contract_type: 'ERC721',
            owner_of: '0x057ec652a4f150f7ff94f089a38008f49a0df88e',
            block_number: '88256',
            block_number_minted: '88256',
            token_uri: 'string',
            metadata: '"{}"',
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
            media: {
              original_media_url: 'https://www.larvalabs.com/cryptopunks/cryptopunk015.png',
              status: 'processing',
              updatedAt: '2023-03-22T15:46:34.453Z',
            },
          },
        ],
      },
    },
    {
      condition: {
        address: '0x4329d392754fd3ae7f4d252ef1b72b17dd6d79fe',
        tokenId: '15',
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
            token_id: '15',
            contract_type: 'ERC721',
            owner_of: '0x057ec652a4f150f7ff94f089a38008f49a0df88e',
            block_number: '88256',
            block_number_minted: '88256',
            token_uri: 'string',
            metadata: '"{}"',
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
            media: {
              media_collection: {
                low: {
                  height: 100,
                  width: 100,
                  url: 'https://nft-preview-media.s3.us-east-1.amazonaws.com/evm/0x1/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb/0x78b818abb115a066f695dd07ca7833348633c212220895ac74a522c6453c3ef2/low.png',
                },
                medium: {
                  height: 250,
                  width: 250,
                  url: 'https://nft-preview-media.s3.us-east-1.amazonaws.com/evm/0x1/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb/0x78b818abb115a066f695dd07ca7833348633c212220895ac74a522c6453c3ef2/medium.png',
                },
                high: {
                  height: 500,
                  width: 500,
                  url: 'https://nft-preview-media.s3.us-east-1.amazonaws.com/evm/0x1/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb/0x78b818abb115a066f695dd07ca7833348633c212220895ac74a522c6453c3ef2/high.png',
                },
              },
              category: 'image',
              mimetype: 'image/png',
              parent_hash: '0x88a434cee5ebfcfaeb2723c3f18f4724228c2a82aad7d26af45ca11d8b6ed9a9',
              status: 'success',
              updatedAt: '2023-03-20T20:14:51.781Z',
              original_media_url: 'https://www.larvalabs.com/cryptopunks/cryptopunk015.png',
            },
          },
        ],
      },
    },
    {
      condition: {
        address: '0x057Ec652A4F150f7FF94f089A38008f49a0DF88',
        tokenId: '15',
      },
      responseStatus: 400,
      response: createErrorResponse('[C0005] Invalid address provided'),
    },
    {
      condition: {
        address: '0x057ec652a4f150f7ff94f089a38008f49a0df88e',
        tokenId: '000000215',
      },
      responseStatus: 400,
      response: createErrorResponse('[C0006] Request failed, Bad Request(400): [C0005] Invalid TokenId provided'),
    },
  ],
);
