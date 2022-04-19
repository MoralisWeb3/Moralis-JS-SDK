import { CoreErrorCode, MoralisError } from '../Error';
import { LogLevel } from '../MoralisConfig';
import { makeMockMoralisCore } from '../test/makeMockMoralisCore';
import { Logger } from './LoggerController';

const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

describe('LoggerController', () => {
  const name = 'testLogger';
  const core = makeMockMoralisCore();
  const logger = new Logger(core, name);

  beforeEach(() => {
    core.config.reset();
    consoleLogSpy.mockClear();
    consoleWarnSpy.mockClear();
    consoleErrorSpy.mockClear();
  });

  it('should create a new logger with the set logLevel', () => {
    core.config.set('logLevel', LogLevel.INFO);
    expect(logger.level).toBe(LogLevel.INFO);
  });

  it('should create a new logger with default logLevel', () => {
    expect(logger.level).toBe(LogLevel.INFO);
  });

  it('should create a normal log for verbose', () => {
    core.config.set('logLevel', LogLevel.VERBOSE);
    logger.verbose('Verbose test');

    expect(consoleLogSpy).toBeCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith(`Moralis[testLogger]: Verbose test`);
  });

  it('should create a normal log for debug', () => {
    core.config.set('logLevel', LogLevel.VERBOSE);
    logger.debug('Debug test');

    expect(consoleLogSpy).toBeCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith(`Moralis[testLogger]: Debug test`);
  });

  it('should create a normal log for info', () => {
    logger.info('Info test');

    expect(consoleLogSpy).toBeCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith(`Moralis[testLogger]: Info test`);
  });

  it('should create an warning log for warn', () => {
    logger.warn('Warning test');

    expect(consoleWarnSpy).toBeCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalledWith(`Moralis[testLogger]: Warning test`);
  });

  it('should create an error log for error', () => {
    logger.error('Error test');

    expect(consoleErrorSpy).toBeCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(`Moralis[testLogger]: Error test`);
  });

  it('should not log when loglevel is OFF', () => {
    core.config.set('logLevel', LogLevel.OFF);

    logger.error('Error test');
    logger.warn('Warning test');
    logger.info('Info test');
    logger.debug('Debug test');
    logger.verbose('Verbose test');

    expect(consoleLogSpy).toBeCalledTimes(0);
    expect(consoleWarnSpy).toBeCalledTimes(0);
    expect(consoleErrorSpy).toBeCalledTimes(0);
  });

  it('should only log errors when loglevel is ERROR', () => {
    core.config.set('logLevel', LogLevel.ERROR);

    logger.error('Error test');
    logger.warn('Warning test');
    logger.info('Info test');
    logger.debug('Debug test');
    logger.verbose('Verbose test');

    expect(consoleLogSpy).toBeCalledTimes(0);
    expect(consoleWarnSpy).toBeCalledTimes(0);
    expect(consoleErrorSpy).toBeCalledTimes(1);
  });

  it('should only log up to warnings when loglevel is WARNING', () => {
    core.config.set('logLevel', LogLevel.WARNING);

    logger.error('Error test');
    logger.warn('Warning test');
    logger.info('Info test');
    logger.debug('Debug test');
    logger.verbose('Verbose test');

    expect(consoleLogSpy).toBeCalledTimes(0);
    expect(consoleWarnSpy).toBeCalledTimes(1);
    expect(consoleErrorSpy).toBeCalledTimes(1);
  });

  it('should only log up to info when loglevel is INFO', () => {
    core.config.set('logLevel', LogLevel.INFO);

    logger.error('Error test');
    logger.warn('Warning test');
    logger.info('Info test');
    logger.debug('Debug test');
    logger.verbose('Verbose test');

    expect(consoleLogSpy).toBeCalledTimes(1);
    expect(consoleWarnSpy).toBeCalledTimes(1);
    expect(consoleErrorSpy).toBeCalledTimes(1);
  });

  it('should only log up to debugs when loglevel is DEBUG', () => {
    core.config.set('logLevel', LogLevel.DEBUG);

    logger.error('Error test');
    logger.warn('Warning test');
    logger.info('Info test');
    logger.debug('Debug test');
    logger.verbose('Verbose test');

    expect(consoleLogSpy).toBeCalledTimes(2);
    expect(consoleWarnSpy).toBeCalledTimes(1);
    expect(consoleErrorSpy).toBeCalledTimes(1);
  });

  it('should log everything when loglevel is VERBOSE', () => {
    core.config.set('logLevel', LogLevel.VERBOSE);

    logger.error('Error test');
    logger.warn('Warning test');
    logger.info('Info test');
    logger.debug('Debug test');
    logger.verbose('Verbose test');

    expect(consoleLogSpy).toBeCalledTimes(3);
    expect(consoleWarnSpy).toBeCalledTimes(1);
    expect(consoleErrorSpy).toBeCalledTimes(1);
  });

  it('should log details', () => {
    logger.info('Info test', { name: 'batman' });

    expect(consoleLogSpy).toBeCalledTimes(1);
    expect(consoleLogSpy).toBeCalledWith('Moralis[testLogger]: Info test', { name: 'batman' });
  });

  it('should format an Error', () => {
    const error = new Error('Error test');
    logger.error(error);

    expect(consoleErrorSpy).toBeCalledTimes(1);
    expect(consoleErrorSpy).toBeCalledWith('Moralis[testLogger]: Error test');
  });

  it('should format a MoralisError', () => {
    const error = new MoralisError({
      code: CoreErrorCode.GENERIC_CORE_ERROR,
      message: 'Error test',
      details: { name: 'batman' },
    });
    logger.error(error);

    expect(consoleErrorSpy).toBeCalledTimes(1);
    expect(consoleErrorSpy).toBeCalledWith('Moralis[testLogger]: [C0001] Error test', {
      _errorDetails: { name: 'batman' },
    });
  });

  it('should combine details for a MoralisError', () => {
    const error = new MoralisError({
      code: CoreErrorCode.GENERIC_CORE_ERROR,
      message: 'Error test',
      details: { name: 'batman' },
    });
    logger.error(error, { age: 69 });

    expect(consoleErrorSpy).toBeCalledTimes(1);
    expect(consoleErrorSpy).toBeCalledWith('Moralis[testLogger]: [C0001] Error test', {
      _errorDetails: { name: 'batman' },
      age: 69,
    });
  });
});
