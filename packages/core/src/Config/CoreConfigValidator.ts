import { BuildEnvironment } from './CoreConfig';
import { Config } from './Config';
import { EvmChainParser } from '../dataTypes/EvmChainParser';
import { EvmChainish } from '../dataTypes/EvmChainish';

export class CoreConfigValidator {
  public static requireNodeBuidEnvironment(config: Config) {
    if (config.get<BuildEnvironment>('buidEnvironment') !== 'node') {
      return 'Can only be set in a node "buildEnvironment" for security reasons.';
    }
    return null;
  }

  public static requireValidChain(value: EvmChainish) {
    // TODO: validate if chain is valid api chain
    if (typeof value === 'string' || typeof value === 'number') {
      try {
        EvmChainParser.parse(value);
      } catch (error) {
        return error.message;
      }
    }
    return null;
  }
}
