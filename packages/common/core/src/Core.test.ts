import { Core } from './Core';

describe('Core', () => {
  let core: Core;

  beforeEach(() => {
    core = Core.create();
  });

  describe('start()', () => {
    it('can call method', () => {
      core.start({});
    });

    it('cannot call method more than one time', () => {
      core.start({});
      expect(() => core.start({})).toThrowError(
        '[C0009] Modules are started already. This method should be called only one time.',
      );
    });
  });
});
