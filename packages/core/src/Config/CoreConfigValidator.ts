import { BuildEnvironment } from './CoreConfig';
import { ModuleName } from '../Modules/ModuleName';
import { Config } from './Config';
import { Modules } from '../Modules';
import { EvmChainParser } from '../dataTypes/EvmChainParser';
import { EvmChainish } from '../dataTypes/EvmChainish';

export class CoreConfigValidator {
  public static requireServerModule(modules: Modules) {
    if (!modules.has(ModuleName.SERVER)) {
      return 'Value is required when using the MoralisServer. ';
    }
    return null;
  }

  public static requireNodeBuidEnvironment(config: Config) {
    if (config.get<BuildEnvironment>('buidEnvironment') !== 'node') {
      return 'Can only be set in a node "buildEnvironment" for security reasons.';
    }
    return null;
  }

  public static requireRegisteredEvmConnector(value: string, modules: Modules) {
    const evmModule = modules.tryGetNetwork(ModuleName.EVM);
    if (!evmModule) {
      return 'Cannot find an evm module.';
    }
    if (!evmModule.hasConnector(value)) {
      return 'Invalid value. The connector is not registered as a connector to Evm. Make sure to register it via Evm.connectors.register(connector).';
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
