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

  it('should cleanup the class correctly', () => {
    expect(core.modules.listNames().length).toBe(1);
    module.cleanUp();
    expect(core.modules.listNames().length).toBe(0);
  });
});
