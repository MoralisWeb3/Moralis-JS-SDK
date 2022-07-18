import { Config, ConfigKey } from './Config';

describe('Config', () => {
  const numberKey: ConfigKey<number> = {
    name: 'number',
    defaultValue: 0,
  };

  let config: Config;

  beforeEach(() => {
    config = new Config();
  });

  it('cannot register the same key more then one time', () => {
    config.registerKey(numberKey);
    expect(() => config.registerKey(numberKey)).toThrowError('[C0015] Key "number" is already registered');
  });

  it('can set', () => {
    config.registerKey(numberKey);
    config.set(numberKey, 200);
    expect(config.get(numberKey)).toEqual(200);
  });

  it('cannot set if a validator returns an error', () => {
    config.registerKey(numberKey, () => 'ERROR');
    expect(() => config.set(numberKey, 200)).toThrowError(/\[C0014\] Cannot set this config.*ERROR/);
  });

  it('can set if a validator returns no error', () => {
    config.registerKey(numberKey, () => null);
    config.set(numberKey, 200);
    expect(config.get(numberKey)).toEqual(200);
  });

  it('can set by a string key', () => {
    config.registerKey(numberKey);
    config.set('number', 123);
    expect(config.get(numberKey)).toEqual(123);
  });

  it('returns known keys', () => {
    config.registerKey(numberKey);
    const keys = config.getKeys();
    expect(keys).toContain(numberKey.name);
  });

  it('throws an error when a string key does not exist', () => {
    expect(() => config.get('number')).toThrowError('[C0013] Key "number" is unregistered');
  });

  it('throws an error when a key does not exist', () => {
    expect(() => config.get(numberKey)).toThrowError('[C0013] Key "number" is unregistered');
  });

  it('merges correctly', () => {
    config.registerKey(numberKey);
    const values = {
      number: 999,
    };
    config.merge(values);
    expect(config.get('number')).toEqual(999);
  });

  it('can reset to the defaults', () => {
    config.registerKey(numberKey);

    config.set(numberKey, 1000);
    config.reset();

    expect(config.get(numberKey)).toEqual(numberKey.defaultValue);
  });
});
