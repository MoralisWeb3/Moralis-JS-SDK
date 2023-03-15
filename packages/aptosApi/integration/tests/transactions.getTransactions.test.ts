import {
  AptosEd25519SignatureRequest,
  AptosEntryFunctionPayloadRequest,
  AptosStateCheckpointTransaction,
  AptosUserTransaction,
} from '@moralisweb3/common-aptos-utils';
import { AptosApi } from '../../src/AptosApi';
import { cleanAptosApi, setupAptosApi } from '../setup';

describe('getTransactions', () => {
  let aptosApi: AptosApi;

  beforeAll(() => {
    aptosApi = setupAptosApi();
  });

  afterAll(() => {
    cleanAptosApi();
  });

  it('return transactions', async () => {
    const response = await aptosApi.transactions.getTransactions({
      limit: 5,
      start: '1020304',
    });

    expect(response.length).toBe(2);

    const tx1 = response[0] as AptosStateCheckpointTransaction;
    expect(tx1.type).toBe('state_checkpoint_transaction');
    expect(tx1.version).toBe('101767115');
    expect(tx1.hash).toBe('0xc3bfd1e81c285ec6315df3a37ca3bcb38fa8319a722928062ecbb22e529124ef');
    expect(tx1.stateChangeHash).toBe('0xafb6e14fe47d850fd0a7395bcfb997ffacf4715e0f895cc162c218e4a7564bc6');
    expect(tx1.eventRootHash).toBe('0x414343554d554c41544f525f504c414345484f4c4445525f4841534800000000');
    expect(tx1.stateCheckpointHash).toBe('0xd9a62c10068075be552ca39abfe36a91ebb9dbed7fb98a626c303a00269653ae');
    expect(tx1.gasUsed).toBe('0');
    expect(tx1.success).toBe(true);
    expect(tx1.vmStatus).toBe('Executed successfully');
    expect(tx1.accumulatorRootHash).toBe('0x86a1e4e197e6a819f4a8ab81719f0823068ee82b60203f4af2494c40870f2850');
    expect(tx1.changes).toHaveLength(0);
    expect(tx1.timestamp).toBe('1678784641610692');

    const tx2 = response[1] as AptosUserTransaction;
    expect(tx2.type).toBe('user_transaction');
    expect(tx2.version).toBe('101768014');
    expect(tx2.hash).toBe('0xf060156ddf08ebd25e8ca09630f092dc6bc379a15081b63bcad7b2796dddb721');
    expect(tx2.stateChangeHash).toBe('0x8000aa4a61aaa1d91e775c53697df854e2b8fc2deaed255fffb496cf8a168167');
    expect(tx2.eventRootHash).toBe('0x37d63cf1687c0e986bae647a2beb6974d20b7769d65dfee3e1906613333bcd99');
    expect(tx2.stateCheckpointHash).toBe(null);
    expect(tx2.gasUsed).toBe('94032');
    expect(tx2.success).toBe(true);
    expect(tx2.accumulatorRootHash).toBe('0xd4db8e9e6f0eb65d436f8bf295bf26ee14effb14049a9723f35a2b1217a2fdc6');
    expect(tx2.sender.address).toBe('0xf6de48c021ca13548395f9457eeb4018416b789be907fa332cc2671d7daae9c9');
    expect(tx2.sequenceNumber).toBe('33');
    expect(tx2.maxGasAmount).toBe('112763');
    expect(tx2.gasUnitPrice).toBe('100');
    expect(tx2.expirationTimestampSecs).toBe('1678784904');

    const tx2Signature = tx2.signature as AptosEd25519SignatureRequest;
    expect(tx2Signature.type).toBe('ed25519_signature');
    expect(tx2Signature.signature).toBe(
      '0xbbac8284e434f3915affbf524c0ba380ea15fb2ca29ba8483518a3cd0d423f2534f1182c0d84b466dcfbe4c8f8965dc6032d3be1dbb848d0cf7e9b090813380f',
    );
    expect(tx2Signature.publicKey).toBe('0xb861591a8d6485617a3c85d42696a7ff6f17ede1fb4150f8ffe84d23978fb80a');

    const tx2Payload = tx2.payload as AptosEntryFunctionPayloadRequest;
    expect(tx2Payload.type).toBe('entry_function_payload');
    expect(tx2Payload.function).toBe(
      '0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::scripts_v2::swap_unchecked',
    );
    expect(tx2Payload.typeArguments).toHaveLength(3);
    expect(tx2Payload.typeArguments[0]).toBe(
      '0x84d7aeef42d38a5ffc3ccef853e1b82e4958659d16a7de736a29c55fbbeb0114::staked_aptos_coin::StakedAptosCoin',
    );
    expect(tx2Payload.typeArguments[1]).toBe('0x1::aptos_coin::AptosCoin');
    expect(tx2Payload.typeArguments[2]).toBe(
      '0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::curves::Stable',
    );
    expect(tx2Payload.arguments).toHaveLength(2);
    expect(tx2Payload.arguments[0]).toBe('300000000');
    expect(tx2Payload.arguments[1]).toBe('305853186');

    expect(tx2.changes).toHaveLength(8);
    expect(tx2.events).toHaveLength(5);
  });
});
