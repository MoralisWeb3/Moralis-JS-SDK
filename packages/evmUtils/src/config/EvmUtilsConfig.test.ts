import { Config, ConfigKey, EvmAddressFormat, EvmChainIdFormat } from '@moralisweb3/core';
import { EvmUtilsConfig } from './EvmUtilsConfig';
import { EvmUtilsConfigSetup } from './EvmUtilsConfigSetup';

describe('EvmUtilsConfig', () => {
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
    EvmUtilsConfigSetup.register(config);
  });

  testSetAndGet<EvmChainIdFormat>(EvmUtilsConfig.formatEvmChainId, 'decimal');
  testSetAndGet<EvmAddressFormat>(EvmUtilsConfig.formatEvmAddress, 'checksum');
});
