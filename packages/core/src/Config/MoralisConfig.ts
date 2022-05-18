import { CoreErrorCode, MoralisCoreError } from '../Error';
import { MoralisModules } from '../Modules/MoralisModules';
import { ConfigOption, ConfigOptions, configOptions, ConfigValues, defaultConfig } from './configOptions';

/**
 * MoralisConfig is used global available configuration
 *
 * This class is responsible for
 * - Initialising default
 * - Setting configuration items with validations
 * - Getting configuration items
 */
export class MoralisConfig {
  private _value: ConfigValues = defaultConfig;
  private _modules: MoralisModules;

  constructor(modules: MoralisModules) {
    this._modules = modules;
  }

  /**
   * Get the config value of the provided key
   * @param key The key to get the config from
   * @returns the value of the provided key
   */
  get<Key extends keyof ConfigValues>(key: Key): ConfigValues[Key] {
    if (!(key in this._value)) {
      throw new MoralisCoreError({
        code: CoreErrorCode.CONFIG_NOT_EXIST,
        message: `Cannot get this config. The config "${key}" does not exist.`,
      });
    }

    return this._value[key];
  }

  /**
   * Merge a partial config object with the current config
   * @param config A partial configuration of key-values
   */
  merge(config: Partial<ConfigValues>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Object.entries(config).forEach(([key, value]: [any, unknown]) => {
      this.set(key, value);
    });
  }

  /**
   * Set the config of the provided key to the provided value
   * This function will throw an error if the validation for the provided configuration fails
   * @param key The key to set the config for
   * @param value The value to set the config for
   */
  set<Key extends keyof ConfigOptions>(key: Key, value: ConfigValues[Key]) {
    if (!(key in configOptions)) {
      throw new MoralisCoreError({
        code: CoreErrorCode.CONFIG_NOT_EXIST,
        message: `Cannot set this config. The config "${key}" does not exist.`,
      });
    }

    const modules = this._modules.list();
    const configOption = configOptions[key] as ConfigOption<ConfigValues[Key]>;

    if (configOption.validation) {
      const error = configOption.validation(value, this._value, modules);

      if (error) {
        throw new MoralisCoreError({
          code: CoreErrorCode.CONFIG_NOT_VALID,
          message: `Cannot set this config. Invalid value for "${key}". ${error}`,
        });
      }
    }

    this._value[key] = value;
  }

  /**
   * Resets the config values to the defaultConfig
   */
  reset() {
    this._value = { ...defaultConfig };
  }
}
