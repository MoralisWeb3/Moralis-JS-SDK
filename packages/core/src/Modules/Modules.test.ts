import { Config } from '../Config/Config';
import { LoggerController } from '../controllers/LoggerController';
import { MoralisCore } from '../MoralisCore';
import { ApiModule } from './ApiModule';
import { Module } from './Module';
import { Modules } from './Modules';

const TEST_MODULE_NAME = 'test';
const TEST_API_MODULE_NAME = 'testApiModule';

class TestModule extends Module {
  public constructor(core: MoralisCore) {
    super(TEST_MODULE_NAME, core);
  }
  public setup() {
    // Nothing
  }
  public start() {
    // Nothing
  }
}

class TestApiModule extends ApiModule {
  public constructor(core: MoralisCore) {
    super(TEST_API_MODULE_NAME, core, 'http://foo');
  }
  public setup(): void {
    // Nothing
  }
  public start(): void | Promise<void> {
    // Nothing
  }
}

describe('Modules', () => {
  let core: MoralisCore;
  let modules: Modules;

  function createTestModule(): TestModule {
    return new TestModule(core);
  }

  function createTestApiModule() {
    return new TestApiModule(core);
  }

  beforeEach(() => {
    modules = new Modules();
    const config = new Config();
    core = new MoralisCore(modules, config, new LoggerController(TEST_MODULE_NAME, config));
  });

  describe('register()', () => {
    it('registries a module', () => {
      const module = createTestModule();
      const setupSpy = jest.spyOn(module, 'setup');
      modules.register(module);
      expect(modules.listNames()).toContain(TEST_MODULE_NAME);
      expect(setupSpy).toBeCalledTimes(1);
    });

    it('cannot register the same module', () => {
      const module = createTestModule();
      modules.register(module);
      expect(() => modules.register(module)).toThrowError('The module "test" has already been registered');
    });
  });

  describe('get()', () => {
    it('returns a module', () => {
      const module = createTestModule();
      modules.register(module);
      expect(modules.get(TEST_MODULE_NAME)).toEqual(module);
    });

    it('throws an error when a module is not registered', () => {
      expect(() => modules.get('UNKNOWN')).toThrowError('Module "UNKNOWN" does not exist');
    });
  });

  describe('tryGet()', () => {
    it('returns null when a module is not registered', () => {
      expect(modules.tryGet('UNKNOWN')).toBeNull();
    });

    it('returns a module when the module is registered', () => {
      const module = createTestModule();
      modules.register(module);
      expect(modules.tryGet(TEST_MODULE_NAME)).toEqual(module);
    });
  });

  describe('has()', () => {
    it('returns false when a module is not registered', () => {
      expect(modules.has('UNKNOWN')).toEqual(false);
    });

    it('returns true when the module is registered', () => {
      const module = createTestModule();
      modules.register(module);
      expect(modules.has(TEST_MODULE_NAME)).toEqual(true);
    });
  });

  describe('getApi()', () => {
    it('returns an api module', () => {
      const apiModule = createTestApiModule();
      modules.register(apiModule);
      expect(modules.getApi(TEST_API_MODULE_NAME)).toEqual(apiModule);
    });

    it('throws an error when a module is not registered', () => {
      expect(() => modules.getApi(TEST_API_MODULE_NAME)).toThrowError('No ApiModule found');
    });
  });

  describe('remove()', () => {
    it('removes', () => {
      const module = createTestModule();
      modules.register(module);
      modules.remove(module.name);
      expect(modules.has(module.name)).toBe(false);
    });

    it('cannot remove two times', () => {
      const module = createTestModule();
      modules.register(module);
      modules.remove(module.name);
      expect(() => modules.remove(module.name)).toThrowError(/Module .* does not exist/);
    });
  });

  describe('list*', () => {
    let module: TestModule;
    let apiModule: TestApiModule;

    beforeEach(() => {
      module = createTestModule();
      apiModule = createTestApiModule();
      modules.register(module);
      modules.register(apiModule);
    });

    describe('list()', () => {
      it('returns all modules', () => {
        const list = modules.list();
        expect(list).toContain(module);
        expect(list).toContain(apiModule);
      });
    });

    describe('listNames()', () => {
      it('returns all names', () => {
        const list = modules.listNames();
        expect(list).toContain(module.name);
        expect(list).toContain(apiModule.name);
      });
    });

    describe('listApis()', () => {
      it('returns only network modules', () => {
        const list = modules.listApis();
        expect(list).toContain(apiModule);
        expect(list.length).toEqual(1);
      });
    });
  });
});
