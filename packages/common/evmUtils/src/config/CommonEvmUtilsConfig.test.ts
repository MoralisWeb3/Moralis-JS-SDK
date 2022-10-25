import { Config, ConfigKey, EvmAddressFormat, EvmChainIdFormat } from '@moralisweb3/core';
import { CommonEvmUtilsConfig } from './CommonEvmUtilsConfig';
import { CommonEvmUtilsConfigSetup } from './CommonEvmUtilsConfigSetup';

describe('CommonEvmUtilsConfigSetup', () => {
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
    CommonEvmUtilsConfigSetup.register(config);
  });

  testSetAndGet<EvmChainIdFormat>(CommonEvmUtilsConfig.formatEvmChainId, 'decimal');
  testSetAndGet<EvmAddressFormat>(CommonEvmUtilsConfig.formatEvmAddress, 'checksum');
});
