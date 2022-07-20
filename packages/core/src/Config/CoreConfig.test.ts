import { EvmChainish } from '../dataTypes';
import { Config, ConfigKey } from './Config';
import { BuildEnvironment, CoreConfig, EvmAddressFormat, EvmChainIdFormat, LogLevel, Network } from './CoreConfig';
import { CoreConfigSetup } from './CoreConfigSetup';

describe('CoreConfig', () => {
  let config: Config;

  function testSetAndGet<T>(key: ConfigKey<T>, value: T) {
    it(`sets ${key.name}`, () => {
      expect(value).not.toEqual(key.defaultValue); // The value must be different than the default value.
      config.set(key, value);
      expect(config.get(key.name)).toEqual(value);
    });
  }

  beforeEach(() => {
    config = new Config();
    CoreConfigSetup.register(config);
  });

  testSetAndGet<LogLevel>(CoreConfig.logLevel, 'off');
  testSetAndGet<BuildEnvironment>(CoreConfig.buidEnvironment, 'react-native');
  testSetAndGet<Network>(CoreConfig.defaultNetwork, 'Solana');

  describe('defaultEvmApiChain', () => {
    testSetAndGet<EvmChainish>(CoreConfig.defaultEvmApiChain, 100);
    testSetAndGet<EvmChainish>(CoreConfig.defaultEvmApiChain, '0x100');

    it('throws an error if a evm chain is invalid', () => {
      expect(() => config.set(CoreConfig.defaultEvmApiChain, 'INVALID_CHAIN')).toThrowError(
        '[C0005] Invalid provided chain',
      );
    });
  });

  testSetAndGet<EvmChainIdFormat>(CoreConfig.formatEvmChainId, 'decimal');
  testSetAndGet<EvmAddressFormat>(CoreConfig.formatEvmAddress, 'checksum');
});
