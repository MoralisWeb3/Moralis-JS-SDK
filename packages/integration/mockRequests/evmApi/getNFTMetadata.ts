import { rest } from 'msw';
import { EVM_API_ROOT, MOCK_API_KEY } from '../config';

export const mockGetNFTMetadata = rest.get(`${EVM_API_ROOT}/nft/:address/:token_id`, (req, res, ctx) => {
  const address = req.params.address as string;
  const tokenId = req.params.token_id as string;
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  if (
    address === '0x2953399124f0cbb46d2cbacd8a89cf0599974963' &&
    tokenId === '113461209507512867518933452141320285231135646094834536306130710983923277496520'
  ) {
    return res(
      ctx.status(200),
      ctx.json({
        token_address: '0x2953399124f0cbb46d2cbacd8a89cf0599974963',
        token_id: '113461209507512867518933452141320285231135646094834536306130710983923277496520',
        transfer_index: [31480170, 38, 129, 0],
        owner_of: '0x86d2b5f4af69458a22d69a7347b2133854933ba4',
        block_number: '31480170',
        block_number_minted: '27090571',
        token_hash: '6a5c632686374a276c17510e45fa546f',
        amount: '1',
        contract_type: 'ERC1155',
        name: 'OpenSea Collections',
        symbol: 'OPENSTORE',
        token_uri:
          'https://api.opensea.io/api/v2/metadata/matic/0x2953399124F0cBB46d2CbACD8A89cF0599974963/0xfad8c4d1b26f280ca7a3f3f05e0fba1954e69c930000000000001c00000000c8',
        metadata:
          '{"image":"https://lh3.googleusercontent.com/rp89xp0BIhvqaRPeSt-ONlBXyKb016HFAOr_f3HjkdQjBgcXmwZJXPafTlfft9qR6yKB7Ga7ycFtu2Oa4Aqder4_rBoKyMqL8b-e6Q","name":"Moralis Core Keycard","description":"The Core Team Keycard is used to identify a Moralis Core Team member.\\n\\nThe token is held proudly by Moralis developers, content creators, and supporting team members a like!\\n\\nKeep the hedgehog, push the flywheel together, be the movement: Moralis!","external_link":null,"animation_url":"https://openseauserdata.com/files/61af0e98bb91bee60234fcad25a9b343.mp4","traits":[]}',
        last_token_uri_sync: null,
        last_metadata_sync: null,
      }),
    );
  }

  if (address === '0x4044044044044044044044044044044044044040') {
    return res(ctx.status(404));
  }

  throw new Error('getNFTMetadata: Not supported scenario');
});
