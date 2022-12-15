import { NetworkTypeResolver } from './NetworkTypeResolver';

describe('NetworkTypeResolver', () => {
  it('resolves EVM', () => {
    expect(NetworkTypeResolver.resolveByAddress('0x95222290dd7278aa3ddd389cc1e1d165cc4bafe5')).toBe('evm');
    expect(NetworkTypeResolver.resolveByAddress('0x2170ed0880ac9a755fd29b2688956bd959f933f8')).toBe('evm');
  });

  it('resolves Solana', () => {
    expect(NetworkTypeResolver.resolveByAddress('5dgjNR6Ru9VbmhJBSeWmQm17VSEYcstgQini429ePEyG')).toBe('solana');
    expect(NetworkTypeResolver.resolveByAddress('G2pFiYziSkjGTvfNGnHhFCG5TMgZHQQLfi3VdxuLfL2C')).toBe('solana');
  });
});
