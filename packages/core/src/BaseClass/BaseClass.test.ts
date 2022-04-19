import { CoreModuleType } from '../Modules';
import { BaseClass } from './BaseClass';
import { makeMockMoralisCore } from '../test/makeMockMoralisCore';

describe('BaseClass', () => {
  const core = makeMockMoralisCore();
  const name = 'testClass';

  class SimpleMoralisClass extends BaseClass {}
  const instance = new SimpleMoralisClass({
    name,
    core,
  });

  beforeAll(() => {
    core.modules.register(instance);
  });

  it('should extend correctly', () => {
    expect(instance.name).toBe(name);
    expect(instance.type).toBe(CoreModuleType.DEFAULT);
  });

  it('should be able to call start', async () => {
    await instance.start();
  });

  it('should listen to events', (done) => {
    const EVENT = 'TestEvent';
    const cleanup = instance.listen(EVENT, (value) => {
      expect(value).toBe('success');
      cleanup();
      expect(instance.listenerCount(EVENT)).toBe(0);
      done();
    });
    instance.emit(EVENT, 'success');
  });

  it('should cleanup the class correctly', () => {
    expect(core.modules.listNames().length).toBe(2);
    instance.cleanUp();
    expect(core.modules.listNames().length).toBe(1);
  });
});
