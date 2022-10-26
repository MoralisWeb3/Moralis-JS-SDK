import { LogDocumentId } from './LogDocumentId';

describe('LogDocumentId', () => {
  const transactionHash = '0x32A8EC048252e5e01c10ce34b68dd2c09d93c7f5fc7870d17108f5d09615d4B1';

  it('creates correct id', () => {
    const logIndex = '11';
    const id1 = LogDocumentId.create(0x1, transactionHash, logIndex);
    const id2 = LogDocumentId.create(0x1, transactionHash.toUpperCase(), logIndex);
    const id3 = LogDocumentId.create(0x1, transactionHash.toLowerCase(), logIndex);

    const expectedId = '0xd41b67934bd263462e1721e5a2f04656254d78f442562013b69c9667b6f4cc91';
    expect(id1).toEqual(expectedId);
    expect(id2).toEqual(expectedId);
    expect(id3).toEqual(expectedId);
  });

  it('logs with different logIndex have different id', () => {
    expect(LogDocumentId.create(0x512, transactionHash, '1')).not.toBe(
      LogDocumentId.create(0x512, transactionHash, '2'),
    );
  });
});
