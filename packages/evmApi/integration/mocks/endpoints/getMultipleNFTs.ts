import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../response/errorResponse';

export const mockGetMultipleNFTs = MockScenarios.create(
  {
    method: 'post',
    name: 'getMultipleNFTs',
    url: `/nft/getMultipleNFTs`,
    getParams: ({ req, reqBody }) => ({
      normalizeMetadata: req.params.normalizeMetadata,
      tokens: (reqBody as any).tokens,
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
