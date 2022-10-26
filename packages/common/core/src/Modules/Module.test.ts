import { ModuleType } from './ModuleType';
import { Core } from '../Core';
import { Module } from './Module';

describe('Module', () => {
  const MODULE_NAME = 'testModule';

  class TestModule extends Module {
    public setup(): void {
      // Nothing
    }
    public start(): void | Promise<void> {
      // Nothing
    }
    public getListenerCount(eventName: string): number {
      return this.emitter.listenerCount(eventName);
    }
    public emit(eventName: string, value: any) {
      this.emitter.emit(eventName, value);
    }
  }

  let core: Core;
  let module: TestModule;

  beforeAll(() => {
    core = Core.create();
    module = new TestModule(MODULE_NAME, core);
    core.modules.register(module);
  });

  it('should extend correctly', () => {
    expect(module.name).toBe(MODULE_NAME);
    expect(module.type).toBe(ModuleType.DEFAULT);
  });

  it('should be able to call start', () => {
    module.start();
  });

  it('should listen to events', () => {
    const EVENT_NAME = 'TestEvent';
    let called = 0;

    const cleanup = module.listen(EVENT_NAME, (value: string) => {
      expect(value).toBe('success');
      called++;
    });

    expect(module.getListenerCount(EVENT_NAME)).toEqual(1);
    expect(called).toEqual(0);

    module.emit(EVENT_NAME, 'success');

    expect(called).toEqual(1);

    cleanup();

    expect(module.getListenerCount(EVENT_NAME)).toEqual(0);
  });

  it('should cleanup the class correctly', () => {
    expect(core.modules.listNames().length).toBe(1);
    module.cleanUp();
    expect(core.modules.listNames().length).toBe(0);
  });
});
