import { UniquenessChecker } from './UniquenessChecker';

describe('UniquenessChecker', () => {
  it('does not throw an error when values are unique', () => {
    const errorFactory = () => 'Invalid error';
    const checker = new UniquenessChecker();
    checker.check('ALFA', errorFactory);
    checker.check('BETA', errorFactory);
    checker.check('GAMMA', errorFactory);
  });

  it('throws an error when values are duplicated', () => {
    const errorFactory = () => 'DUPLICATE!';
    const checker = new UniquenessChecker();
    checker.check('ALFA', errorFactory);
    expect(() => checker.check('ALFA', errorFactory)).toThrowError('DUPLICATE!');
  });
});
