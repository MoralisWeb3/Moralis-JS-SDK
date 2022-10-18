import { MockScenarios } from '../../MockScenarios';

export const mockGetNFTMetadataSol = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetNFTMetadataSol',
    url: `/nft/:network/:address/metadata`,
    getParams: (req) => ({
      network: req.params.network,
      address: req.params.address,
    }),
  },
  [
    {
      condition: {
        network: 'mainnet',
        address: '9MwGzSyuQRqmBHqmYwE6wbP3vzRBj4WWiYxWns3rkR7A',
      },
      response: {
        mint: '9MwGzSyuQRqmBHqmYwE6wbP3vzRBj4WWiYxWns3rkR7A',
        standard: 'metaplex',
        name: 'Degen Ape #7225',
        symbol: 'DAPE',
        metaplex: {
          metadataUri: 'https://arweave.net/KzX7jkL6tMEcLIxTPqFEVSLMiTuvndTqMJ1gevjcu8Y',
          updateAuthority: 'DC2mkgwhy56w3viNtHDjJQmc7SGu2QX785bS4aexojwX',
          sellerFeeBasisPoints: 420,
          primarySaleHappened: 1,
          owners: [],
          isMutable: false,
          masterEdition: false,
        },
      },
    },
  ],
);
