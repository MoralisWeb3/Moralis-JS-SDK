/* eslint-disable no-console */
import { isMoralisError } from '../Error/isMoralisError';
import { CoreConfig, LogLevel } from '../Config/CoreConfig';
import { Config } from '../Config';
import { MoralisCore } from '../MoralisCore';

type Details = Record<string, unknown>;

const logLevelMap: Record<LogLevel, number> = {
  verbose: 5,
  debug: 4,
  info: 3,
  warning: 2,
  error: 1,
  off: 0,
};

/**
 * LoggerController, responsible to create log messages for each module.
 * It should be created with the name of the module like `new Logger('module-name')`
 * It will then prefix any logs with that module-name for easy debugging
 * It will show only logs up to the specified `logLevel` in the MoralisConfig
 */
export class LoggerController {
  public static create(moduleName: string, core: MoralisCore): LoggerController {
    return new LoggerController(moduleName, core.config);
  }

  public constructor(private readonly moduleName: string, private readonly config: Config) {}

  get level(): LogLevel {
    return this.config.get(CoreConfig.logLevel);
  }

  private _transport(level: 'error' | 'warn' | 'log', message: string, details?: Details) {
    const logMessage = this._makeLogMessage(message);
    const args = [logMessage, details].filter((arg) => arg != null);

    switch (level) {
      case 'error':
        console.error(...args);
        break;
      case 'warn':
        console.warn(...args);
        break;
      case 'log':
        console.log(...args);
        break;
    }
  }

  private _shouldLog(logLevel: LogLevel) {
    const level = logLevelMap[logLevel];
    const acceptedLevel = logLevelMap[this.level];

    if (level > acceptedLevel) {
      return false;
    }

    return true;
  }

  _makeLogMessage(message: string) {
    return `Moralis[${this.moduleName}]: ${message}`;
  }

  error(error: Error | string, details?: Details) {
    if (!this._shouldLog('error')) {
      return;
    }

    let message = '';
    if (typeof error === 'string') {
      message = error;
    } else if (isMoralisError(error)) {
      message = error.message;
      if (error.details) {
        if (details) {
          details._errorDetails = error.details;
        } else {
          details = {
            _errorDetails: error.details,
          };
        }
      }
    } else {
      message = error.message;
    }

    this._transport('error', message, details);
  }

  warn(message: string, details?: Details) {
    if (!this._shouldLog('warning')) {
      return;
    }

    this._transport('warn', message, details);
  }

  info(message: string, details?: Details) {
    if (!this._shouldLog('info')) {
      return;
    }

    this._transport('log', message, details);
  }

  debug(message: string, details?: Details) {
    if (!this._shouldLog('debug')) {
      return;
    }

    this._transport('log', message, details);
  }

  verbose(message: string, details?: Details) {
    if (!this._shouldLog('verbose')) {
      return;
    }

    this._transport('log', message, details);
  }
}
