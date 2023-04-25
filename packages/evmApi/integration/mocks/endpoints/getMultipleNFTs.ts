import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../response/errorResponse';

export const mockGetMultipleNFTs = MockScenarios.create(
  {
    method: 'post',
    name: 'getMultipleNFTs',
    url: `/nft/getMultipleNFTs`,
    getParams: ({ req, reqBody }) => ({
      normalizeMetadata: req.params.normalizeMetadata,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tokens: (reqBody as any).tokens,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      media_items: (reqBody as any).media_items,
    }),
  },
  [
    {
      condition: {
        tokens: [
          {
            token_address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
            token_id: '1234',
          },
        ],
      },
      response: [
        {
          token_address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
          token_id: '1234',
          transfer_index: [16223637, 103, 872, 0],
          owner_of: '0xdbfd76af2157dc15ee4e57f3f942bb45ba84af24',
          block_number: '16223637',
          block_number_minted: '12346232',
          token_hash: 'ab96a59f7d41a8648adee2f63d1386ce',
          amount: '1',
          updated_at: '1671511972.032',
          contract_type: 'ERC721',
          name: 'BoredApeYachtClub',
          symbol: 'BAYC',
          token_uri: 'https://ipfs.moralis.io:2053/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1234',
          metadata:
            '{"image":"ipfs://QmZ2ddtVUV1brVGjpq6vgrG6jEgEK3CqH19VURKzdwCSRf","attributes":[{"trait_type":"Eyes","value":"Sleepy"},{"trait_type":"Background","value":"Army Green"},{"trait_type":"Clothes","value":"Leather Jacket"},{"trait_type":"Fur","value":"Blue"},{"trait_type":"Mouth","value":"Bored Bubblegum"},{"trait_type":"Hat","value":"Fisherman\'s Hat"}]}',
          last_token_uri_sync: '2022-11-28T12:51:42.133Z',
          last_metadata_sync: '2022-11-28T12:51:44.067Z',
          minter_address: '0xe72eb31b59f85b19499a0f3b3260011894fa0d65',
          possible_spam: false,
        },
      ],
    },
    {
      condition: {
        tokens: [
          {
            token_address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
            token_id: '1234',
          },
          {
            token_address: '0x8698bf7cdef5a23b8dfc319e7c4236dcc7149380',
            token_id: '12',
          },
        ],
      },
      response: [
        {
          token_address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
          token_id: '1234',
          transfer_index: [16223637, 103, 872, 0],
          owner_of: '0xdbfd76af2157dc15ee4e57f3f942bb45ba84af24',
          block_number: '16223637',
          block_number_minted: '12346232',
          token_hash: 'ab96a59f7d41a8648adee2f63d1386ce',
          amount: '1',
          updated_at: '1671511972.032',
          contract_type: 'ERC721',
          name: 'BoredApeYachtClub',
          symbol: 'BAYC',
          token_uri: 'https://ipfs.moralis.io:2053/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1234',
          metadata:
            '{"image":"ipfs://QmZ2ddtVUV1brVGjpq6vgrG6jEgEK3CqH19VURKzdwCSRf","attributes":[{"trait_type":"Eyes","value":"Sleepy"},{"trait_type":"Background","value":"Army Green"},{"trait_type":"Clothes","value":"Leather Jacket"},{"trait_type":"Fur","value":"Blue"},{"trait_type":"Mouth","value":"Bored Bubblegum"},{"trait_type":"Hat","value":"Fisherman\'s Hat"}]}',
          last_token_uri_sync: '2022-11-28T12:51:42.133Z',
          last_metadata_sync: '2022-11-28T12:51:44.067Z',
          minter_address: '0xe72eb31b59f85b19499a0f3b3260011894fa0d65',
          possible_spam: false,
        },
        {
          token_address: '0x8698bf7cdef5a23b8dfc319e7c4236dcc7149380',
          token_id: '12',
          transfer_index: [16220186, 82, 137, 0],
          owner_of: '0x85f908b3b6bcf0a691a802a624af56f9913a7491',
          block_number: '16220186',
          block_number_minted: '16220186',
          token_hash: '611d9842d09b229b16b168c3cce88600',
          amount: '1',
          updated_at: '1671470308.761',
          contract_type: 'ERC721',
          name: 'MutantDumpiesNFT',
          symbol: 'MUTANTDUMPIES',
          token_uri: 'https://ipfs.moralis.io:2053/ipfs/QmThieUhuT5xzcs83fHP3jVBkUNNq9wUVs2sm8kSqfrn2W/13.json',
          metadata:
            '{"name":"Dumpies Raffle #12","description":"This NFT Collection is the Access to the Dumpies","image":"ipfs://QmUxLvSNJFMZw8KuejzxT8UYi6r9Fgo8fPCBaJqLnCKaAy/12.png","dna":"8037096defe1f0bd6a0eb0fd095aa628923d2393","edition":12,"date":1668185877184,"attributes":[{"trait_type":"Background","value":"Yellow"},{"trait_type":"Acsessories","value":"Octopus Arm"},{"trait_type":"Carzy Skin","value":"Melting Purple"},{"trait_type":"Crazy Outfit","value":"Skul"},{"trait_type":"Crazy Mouth","value":"Monster"},{"trait_type":"Crazy Eye","value":"Zombie"},{"trait_type":"Crazy Cap","value":"Cap 2"},{"trait_type":"Trash Can","value":"Invisible"}],"compiler":"Dumpies"}',
          last_token_uri_sync: '2022-12-19T21:41:54.396Z',
          last_metadata_sync: '2022-12-19T21:42:00.812Z',
          minter_address: null,
          possible_spam: false,
        },
      ],
    },
    {
      condition: {
        tokens: [
          {
            token_address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
            token_id: '1234',
          },
        ],
        media_items: true,
      },
      response: [
        {
          token_address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
          token_id: '1234',
          transfer_index: [16223637, 103, 872, 0],
          owner_of: '0xdbfd76af2157dc15ee4e57f3f942bb45ba84af24',
          block_number: '16223637',
          block_number_minted: '12346232',
          token_hash: 'ab96a59f7d41a8648adee2f63d1386ce',
          amount: '1',
          updated_at: '1671511972.032',
          contract_type: 'ERC721',
          name: 'BoredApeYachtClub',
          symbol: 'BAYC',
          token_uri: 'https://ipfs.moralis.io:2053/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1234',
          metadata:
            '{"image":"ipfs://QmZ2ddtVUV1brVGjpq6vgrG6jEgEK3CqH19VURKzdwCSRf","attributes":[{"trait_type":"Eyes","value":"Sleepy"},{"trait_type":"Background","value":"Army Green"},{"trait_type":"Clothes","value":"Leather Jacket"},{"trait_type":"Fur","value":"Blue"},{"trait_type":"Mouth","value":"Bored Bubblegum"},{"trait_type":"Hat","value":"Fisherman\'s Hat"}]}',
          last_token_uri_sync: '2022-11-28T12:51:42.133Z',
          last_metadata_sync: '2022-11-28T12:51:44.067Z',
          minter_address: '0xe72eb31b59f85b19499a0f3b3260011894fa0d65',
          media: {
            original_media_url: 'https://www.larvalabs.com/cryptopunks/cryptopunk015.png',
            status: 'processing',
            updatedAt: '2023-03-22T15:46:34.453Z',
          },
          possible_spam: false,
        },
      ],
    },
    {
      condition: {
        tokens: [
          {
            token_address: '0x4329d392754fd3ae7f4d252ef1b72b17dd6d79fe',
            token_id: '1234',
          },
        ],
        media_items: true,
      },
      response: [
        {
          token_address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
          token_id: '1234',
          transfer_index: [16223637, 103, 872, 0],
          owner_of: '0xdbfd76af2157dc15ee4e57f3f942bb45ba84af24',
          block_number: '16223637',
          block_number_minted: '12346232',
          token_hash: 'ab96a59f7d41a8648adee2f63d1386ce',
          amount: '1',
          updated_at: '1671511972.032',
          contract_type: 'ERC721',
          name: 'BoredApeYachtClub',
          symbol: 'BAYC',
          token_uri: 'https://ipfs.moralis.io:2053/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1234',
          metadata:
            '{"image":"ipfs://QmZ2ddtVUV1brVGjpq6vgrG6jEgEK3CqH19VURKzdwCSRf","attributes":[{"trait_type":"Eyes","value":"Sleepy"},{"trait_type":"Background","value":"Army Green"},{"trait_type":"Clothes","value":"Leather Jacket"},{"trait_type":"Fur","value":"Blue"},{"trait_type":"Mouth","value":"Bored Bubblegum"},{"trait_type":"Hat","value":"Fisherman\'s Hat"}]}',
          last_token_uri_sync: '2022-11-28T12:51:42.133Z',
          last_metadata_sync: '2022-11-28T12:51:44.067Z',
          minter_address: '0xe72eb31b59f85b19499a0f3b3260011894fa0d65',
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
    {
      condition: {
        tokens: [
          {
            token_address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
            token_id: '9999999999',
          },
        ],
      },
      response: [null],
    },
    {
      condition: {
        tokens: [],
      },
      responseStatus: 400,
      response: createErrorResponse(
        'tokens must be an array, tokens must contain not more than 25 elements, tokens must contain at least 1 elements',
      ),
    },
  ],
);
