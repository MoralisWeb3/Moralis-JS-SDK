import { Config } from '../Config/Config';
import { LoggerController } from '../controllers/LoggerController';
import { EvmChain, EvmAddress } from '../dataTypes';
import { MoralisCore } from '../MoralisCore';
import { EvmConnection } from '../sharedTypes';
import { ApiModule } from './ApiModule';
import { Module } from './Module';
import { Modules } from './Modules';
import { NetworkModule } from './NetworkModule';

const TEST_MODULE_NAME = 'test';
const TEST_NETWORK_MODULE_NAME = 'testNetworkModule';
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

class TestNetworkModule extends NetworkModule {
  public constructor(core: MoralisCore) {
    super(TEST_NETWORK_MODULE_NAME, core);
  }
  public connect(): Promise<EvmConnection> {
    throw new Error('Method not implemented');
  }
  public signMessage(): Promise<string> {
    throw new Error('Method not implemented');
  }
  public get supportedConnectors(): string[] {
    throw new Error('Method not implemented');
  }
  public get isConnected(): boolean {
    throw new Error('Method not implemented');
  }
  public get chain(): EvmChain | null {
    throw new Error('Method not implemented');
  }
  public get account(): EvmAddress | null {
    throw new Error('Method not implemented');
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

  function createTestNetworkModule(): TestNetworkModule {
    return new TestNetworkModule(core);
  }

  function createTestApiModule() {
    return new TestApiModule(core);
  }

  beforeEach(() => {
    modules = new Modules();
    const config = new Config();
    core = new MoralisCore(modules, config, new LoggerController(config, TEST_MODULE_NAME));
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

  describe('tryGetNetwork()', () => {
    it('returns a network module', () => {
      const networkModule = createTestNetworkModule();
      modules.register(networkModule);
      expect(modules.tryGetNetwork(TEST_NETWORK_MODULE_NAME)).toEqual(networkModule);
    });

    it('returns null when a module exists, but it is not a network module', () => {
      const module = createTestModule();
      modules.register(module);
      expect(modules.tryGetNetwork(module.name)).toBeNull();
    });

    it('returns null when a module does not exist', () => {
      expect(modules.tryGetNetwork('UNKNOWN')).toBeNull();
    });
  });

  describe('getNetwork()', () => {
    it('returns a network module', () => {
      const networkModule = createTestNetworkModule();
      modules.register(networkModule);
      expect(modules.getNetwork(TEST_NETWORK_MODULE_NAME)).toEqual(networkModule);
    });

    it('throws an error when a module is not registered', () => {
      expect(() => modules.getNetwork(TEST_NETWORK_MODULE_NAME)).toThrowError('No NetworkModule found');
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
    let networkModule: TestNetworkModule;
    let apiModule: TestApiModule;

    beforeEach(() => {
      module = createTestModule();
      networkModule = createTestNetworkModule();
      apiModule = createTestApiModule();
      modules.register(module);
      modules.register(networkModule);
      modules.register(apiModule);
    });

    describe('list()', () => {
      it('returns all modules', () => {
        const list = modules.list();
        expect(list).toContain(module);
        expect(list).toContain(networkModule);
        expect(list).toContain(apiModule);
      });
    });

    describe('listNames()', () => {
      it('returns all names', () => {
        const list = modules.listNames();
        expect(list).toContain(module.name);
        expect(list).toContain(networkModule.name);
        expect(list).toContain(apiModule.name);
      });
    });

    describe('listNetworks()', () => {
      it('returns only network modules', () => {
        const list = modules.listNetworks();
        expect(list).toContain(networkModule);
        expect(list.length).toEqual(1);
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
