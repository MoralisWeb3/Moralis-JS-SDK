import { defaultConfig, MoralisConfigOptions } from './configOptions';

/**
 * MoralisConfig, that is used to set and get configuration options
 */
export class MoralisConfig {
  private _value: MoralisConfigOptions;

  constructor(config: Partial<MoralisConfigOptions> = {}) {
    this._value = { ...config, ...defaultConfig };
  }

  /**
   * Get the config value of the provided key
   * @param key A key from MoralisConfigOptions to get the config from
   * @returns the value of the provided key
   */
  get<Key extends keyof MoralisConfigOptions>(key: Key): MoralisConfigOptions[Key] {
    // TODO: add validation
    return this._value[key];
  }

  /**
   * Merge a partial config object with the current config
   */
  merge(config: Partial<MoralisConfigOptions>) {
    // TODO: add validation
    this._value = { ...this._value, ...config };
  }

  /**
   * Set the config of the provided key to the provided value
   */
  set<Key extends keyof MoralisConfigOptions>(key: Key, value: MoralisConfigOptions[Key]) {
    // TODO: add validation
    this._value[key] = value;
  }

  /**
   * Resets the config values to the defaultConfig
   * Good utility to use in tests
   */
  reset() {
    this._value = { ...defaultConfig };
  }
}
