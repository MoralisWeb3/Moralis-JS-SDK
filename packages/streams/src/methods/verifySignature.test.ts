import { Config } from '@moralisweb3/common-core';
import { IWebhook } from '@moralisweb3/streams-typings';
import { makeVerifySignature } from './verifySignature';
import { ApiUtilsConfig } from '@moralisweb3/api-utils';
import { StreamsConfig } from '../config/StreamsConfig';

describe('verifySignature', () => {
  const body: IWebhook = {
    abi: [],
    block: { number: '', hash: '', timestamp: '' },
    txs: [],
    txsInternal: [],
    logs: [],
    chainId: '',
    confirmed: true,
    retries: 0,
    tag: '',
    streamId: '',
    erc20Approvals: [],
    erc20Transfers: [],
    nftTokenApprovals: [],
    nftApprovals: { ERC721: [], ERC1155: [] },
    nftTransfers: [],
    nativeBalances: [],
  };
  const apiKeyOrSecret1 = 'k9k9k9k9k9k9k9k9k9k9k9k9k9k9k9k9k9k9k9k9k9k9k9k9k9k9k9k9k9k9k9k9';
  const apiKeyOrSecret2 = 'x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3';
  const signature = '0x3c4b2e6b07e386f97198eb2dc639f7901f00a5d3ec1b8c8effe4838920d71829'; // for apiKeyOrSecret1
  let config: Config;

  beforeEach(() => {
    config = new Config();
    config.registerKey(ApiUtilsConfig.apiKey);
    config.registerKey(StreamsConfig.streamsSecret);
  });

  it('verifies correctly if api key is present', () => {
    config.set('apiKey', apiKeyOrSecret1);

    expect(
      makeVerifySignature(config)({
        body,
        signature: signature,
      }),
    ).toBe(true);
  });

  it('verifies correctly if streams secret is present', () => {
    config.set('apiKey', apiKeyOrSecret2);
    config.set('streamsSecret', apiKeyOrSecret1);

    expect(
      makeVerifySignature(config)({
        body,
        signature: signature,
      }),
    ).toBe(true);
  });

  it('throw error if signature is not valid', () => {
    config.set('apiKey', apiKeyOrSecret1);

    expect(() =>
      makeVerifySignature(config)({
        body,
        signature: 'wrong_signature',
      }),
    ).toThrowError('[S0004] Signature is not valid');
  });
});
