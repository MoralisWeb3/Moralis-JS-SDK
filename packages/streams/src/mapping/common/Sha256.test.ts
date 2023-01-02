import { Sha256 } from './Sha256';

describe('Sha256', () => {
  it('hashes correctly', () => {
    expect(Sha256.hash('test')).toBe('0x9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08');
    expect(Sha256.hash('lipsum')).toBe('0x832b7bbc3786888cd1105828577189fc96495da5bd37b84e85e820f490c53cc8');
  });
});
