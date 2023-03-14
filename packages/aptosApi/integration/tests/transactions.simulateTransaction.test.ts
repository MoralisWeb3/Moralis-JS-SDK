import { AptosAddress, AptosNetwork, AptosStateCheckpointTransaction } from '@moralisweb3/common-aptos-utils';
import { AptosApi } from '../../src/AptosApi';
import { cleanAptosApi, setupAptosApi } from '../setup';

describe('simulateTransaction', () => {
  let aptosApi: AptosApi;

  beforeAll(() => {
    aptosApi = setupAptosApi();
  });

  afterAll(() => {
    cleanAptosApi();
  });

  it('returns a transaction', async () => {
    const response = await aptosApi.transactions.simulateTransaction(
      {
        network: AptosNetwork.MAINNET,
      },
      {
        expirationTimestampSecs: '1000000',
        gasUnitPrice: '10000000',
        maxGasAmount: '20000000',
        sender: AptosAddress.create('0x9efbf0ccb6c07dcab7dc1e3c88024ce4adc49f175bdd8d0ebb672c5262c5b3be'),
        sequenceNumber: '1000',
        signature: {
          type: 'ed25519_signature',
          signature:
            '0xbbac8284e434f3915affbf524c0ba380ea15fb2ca29ba8483518a3cd0d423f2534f1182c0d84b466dcfbe4c8f8965dc6032d3be1dbb848d0cf7e9b090813380f',
          publicKey: '0xb861591a8d6485617a3c85d42696a7ff6f17ede1fb4150f8ffe84d23978fb80a',
        },
        payload: {
          type: 'entry_function_payload',
          function: '0xc7ea756470f72ae761b7986e4ed6fd409aad183b1b2d3d2f674d979852f45c4b::piece_swap::update_price_2',
          typeArguments: [
            '0x1::aptos_coin::AptosCoin',
            '0x5e156f1207d0ebfa19a9eeff00d62a282278fb8719f4fab3a586a0a2c0fffbea::coin::T',
            '0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDC',
          ],
          arguments: ['12178', '993'],
        },
      },
    );

    const transaction = response as AptosStateCheckpointTransaction;
    expect(transaction.hash).toBe('0xeb8aa70b16ed578c1ae82c7031a695884a0c695c7f3dad09efddee15267eb4a9');
    expect(transaction.version).toBe('101757643');
    expect(transaction.eventRootHash).toBe('0x414343554d554c41544f525f504c414345484f4c4445525f4841534800000000');
    expect(transaction.gasUsed).toBe('0');
    expect(transaction.vmStatus).toBe('Executed successfully');
    expect(transaction.accumulatorRootHash).toBe('0x6eee6b4b630bb94eb102816d60607faf9be0759ab1c5d4100da66f3639e9164f');
    expect(transaction.timestamp).toBe('1678783213889401');
    expect(transaction.success).toBe(true);
  });
});
