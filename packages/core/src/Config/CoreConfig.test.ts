import { EvmChainish } from '../dataTypes';
import { Modules, ModuleType, NetworkModule } from '../Modules';
import { ModuleName } from '../Modules/ModuleName';
import { Config, ConfigKey } from './Config';
import { BuildEnvironment, CoreConfig, EvmAddressFormat, EvmChainIdFormat, LogLevel, Network } from './CoreConfig';
import { CoreConfigSetup } from './CoreConfigSetup';

describe('CoreConfig', () => {
  let modules: Modules;
  let config: Config;

  function testSetAndGet<T>(key: ConfigKey<T>, value: T) {
    it(`sets ${key.name}`, () => {
      expect(value).not.toEqual(key.defaultValue); // The value must be different than the default value.
      config.set(key, value);
      expect(config.get(key.name)).toEqual(value);
    });
  }

  beforeEach(() => {
    modules = new Modules();
    config = new Config();
    CoreConfigSetup.register(config, modules);
  });

  testSetAndGet<LogLevel>(CoreConfig.logLevel, 'off');
  testSetAndGet<BuildEnvironment>(CoreConfig.buidEnvironment, 'react-native');
  testSetAndGet<Network>(CoreConfig.defaultNetwork, 'Solana');

  describe('defaultEvmConnector', () => {
    const connectorName = 'lorem-ipsum';

    function makeEvmModuleMock(hasConnectorResult: boolean): NetworkModule {
      return {
        type: ModuleType.NETWORK,
        name: ModuleName.EVM,
        hasConnector: () => hasConnectorResult,
        setup: () => {},
      } as any as NetworkModule;
    }

    it('cannot set if an evm module is not registered', () => {
      expect(() => config.set(CoreConfig.defaultEvmConnector, connectorName)).toThrowError('Cannot find an evm module');
    });

    it('cannot set if the connector is not registered', () => {
      const evmModule = makeEvmModuleMock(false);
      modules.register(evmModule);

      expect(() => config.set(CoreConfig.defaultEvmConnector, connectorName)).toThrowError(
        'The connector is not registered',
      );
    });

    it('sets if the connector and the evm module are registered', () => {
      const evmModule = makeEvmModuleMock(true);
      modules.register(evmModule);

      config.set(CoreConfig.defaultEvmConnector, connectorName);

      expect(config.get(CoreConfig.defaultEvmConnector)).toEqual(connectorName);
    });
  });

  describe('defaultEvmApiChain', () => {
    testSetAndGet<EvmChainish>(CoreConfig.defaultEvmApiChain, 100);
    testSetAndGet<EvmChainish>(CoreConfig.defaultEvmApiChain, '0x100');

    it('throws an error if a evm chain is invalid', () => {
      expect(() => config.set(CoreConfig.defaultEvmApiChain, 'INVALID_CHAIN')).toThrowError(
        '[C0005] Invalid provided chain',
      );
    });
  });

  describe('appId', () => {
    const appId = '123';

    it('cannot set appId if a server module is not registered', () => {
      expect(() => config.set(CoreConfig.appId, appId)).toThrowError('Value is required when using the MoralisServer');
    });

    it('sets appId if a server module is registered', () => {
      jest.spyOn(modules, 'has').mockReturnValueOnce(true);
      config.set(CoreConfig.appId, appId);
      expect(config.get(CoreConfig.appId)).toEqual(appId);
    });
  });

  describe('serverUrl', () => {
    const serverUrl = 'https://x.usemoralis.com:2053/server';

    it('cannot set if a server module is not registered', () => {
      expect(() => config.set(CoreConfig.serverUrl, serverUrl)).toThrowError(
        'Value is required when using the MoralisServer',
      );
    });

    it('sets if a server module is registered', () => {
      jest.spyOn(modules, 'has').mockReturnValueOnce(true);
      config.set(CoreConfig.serverUrl, serverUrl);
      expect(config.get(CoreConfig.serverUrl)).toEqual(serverUrl);
    });
  });

  describe('moralisSecret', () => {
    const secret = 'QWERTY';

    it('cannot set if buidEnvironment is not node', () => {
      config.set(CoreConfig.buidEnvironment, 'browser');
      expect(() => config.set(CoreConfig.moralisSecret, secret)).toThrowError('Can only be set in a node');
    });

    it('sets if buidEnvironment is node', () => {
      config.set(CoreConfig.buidEnvironment, 'node');
      config.set(CoreConfig.moralisSecret, secret);
      expect(config.get(CoreConfig.moralisSecret)).toEqual(secret);
    });
  });

  describe('masterKey', () => {
    const masterKey = 'ZXCVB';

    it('cannot set if buidEnvironment is not node', () => {
      config.set(CoreConfig.buidEnvironment, 'browser');
      expect(() => config.set(CoreConfig.masterKey, masterKey)).toThrowError('Can only be set in a node');
    });

    it('sets if buidEnvironment is node', () => {
      config.set(CoreConfig.buidEnvironment, 'node');
      config.set(CoreConfig.masterKey, masterKey);
      expect(config.get(CoreConfig.masterKey)).toEqual(masterKey);
    });
  });

  testSetAndGet<EvmChainIdFormat>(CoreConfig.formatEvmChainId, 'decimal');
  testSetAndGet<EvmAddressFormat>(CoreConfig.formatEvmAddress, 'checksum');
});
