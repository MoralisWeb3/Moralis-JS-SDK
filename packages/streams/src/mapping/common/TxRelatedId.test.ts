import { TxRelatedId } from './TxRelatedId';

describe('TxRelatedId', () => {
  it('returns id', () => {
    const id1 = TxRelatedId.create(1, '0xbe0deb85f7c6a31c017d6ce442bb019614b292c5db1d389eb745beeee28e561c');
    expect(id1).toEqual('0x554b5817ff0c728a6f3b365ef1b90c821c17029155b32cbaa29f5f00245a8144');

    const id16 = TxRelatedId.create(16, '0xbe0deb85f7c6a31c017d6ce442bb019614b292c5db1d389eb745beeee28e561c');
    expect(id16).toEqual('0xb97e2cb8d3bcf46395fc1751eb0524a3bc6777e5735a6120cbe02ab8871a4965');
  });
});
