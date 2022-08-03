import { BuildEnvironment } from './CoreConfig';
import { Config } from './Config';

export class CoreConfigValidator {
  public static requireNodeBuidEnvironment(config: Config) {
    if (config.get<BuildEnvironment>('buidEnvironment') !== 'node') {
      return 'Can only be set in a node "buildEnvironment" for security reasons.';
    }
    return null;
  }
}
