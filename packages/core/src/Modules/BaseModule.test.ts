import { CoreModuleType } from './CoreModuleType';
import { BaseModule } from './BaseModule';
import { makeMockMoralisCore } from '../test/makeMockMoralisCore';

describe('BaseModule', () => {
  const core = makeMockMoralisCore();
  const name = 'testModule';

  class SimpleMoralisClass extends BaseModule {}
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
