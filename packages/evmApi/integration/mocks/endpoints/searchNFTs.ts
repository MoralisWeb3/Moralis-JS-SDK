import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../response/errorResponse';

export const mockSearchNFTs = MockScenarios.create(
  {
    method: 'get',
    name: 'mockSearchNFTs',
    url: `/nft/search`,
    getParams: (req) => ({
      q: req.url.searchParams.get('q'),
    }),
  },
  [
    {
      condition: {
        q: '889',
      },
      response: {
        total: 2000,
        page: 2,
        page_size: 100,
        result: [
          {
            token_id: '889',
            token_address: '0x8ce66ff0865570d1ff0bb0098fa41b4dc61e02e6',
            token_uri: 'https://ipfs.moralis.io:2053/ipfs/QmZZbo8u8zEWg7wtmZhJS2W718WL6FA95T4XdgmCcLp1SJ/889.json',
            metadata:
              '{"name":"Bape #889","description":"The #1 metavestor clan (NFT/DAO) by a team with multi billion dollar company experience.","image":"https://bapesclan.mypinata.cloud/ipfs/QmTSUD5JA6qHaC5t25mcXySfz19AV9u4Mb6Na7ntQ6tEwf/889.jpg","attributes":[{"trait_type":"Background","value":"Black"},{"trait_type":"Body","value":"Man"},{"trait_type":"Dress","value":"Suit Tie Blue"},{"trait_type":"Face","value":"Pipe"},{"trait_type":"Eye","value":"Eye"}]}',
            is_valid: 1,
            syncing: 2,
            frozen: 0,
            resyncing: 0,
            contract_type: 'ERC721',
            token_hash: 'fffa3102469ce77f569893d16d5884f9',
            batch_id: 'fd995c8a-f8b2-40cb-a407-f43e552638b4',
            metadata_name: 'Bape #889',
            metadata_description:
              'The #1 metavestor clan (NFT/DAO) by a team with multi billion dollar company experience.',
            metadata_attributes:
              '[{"trait_type":"Background","value":"Black"},{"trait_type":"Body","value":"Man"},{"trait_type":"Dress","value":"Suit Tie Blue"},{"trait_type":"Face","value":"Pipe"},{"trait_type":"Eye","value":"Eye"}]',
            block_number_minted: '14265936',
            opensea_lookup: null,
            minter_address: '0xdcf086e3f7954b38180daae1405569da86588bfe',
            transaction_minted: '0x2c8d7ec7a8439b0f67b50e93be63242de52e9b5cdfc7dc0aee80c6a2f104c41a',
            frozen_log_index: null,
            imported: null,
            last_token_uri_sync: '2021-02-24T00:47:26.647Z',
            last_metadata_sync: '2021-02-24T00:47:26.647Z',
            createdAt: '2022-02-24T00:47:26.647Z',
            updatedAt: '2022-04-09T23:56:44.807Z',
          },
        ],
      },
    },
    {
      condition: {
        q: 'Pancake',
      },
      responseStatus: 400,
      response: createErrorResponse('[C0005] Invalid search parameter provided'),
    },
  ],
);
