import { BuildEnvironment } from './CoreConfig';
import { EvmChain, EvmChainish } from '../dataTypes';
import { ModuleName } from '../Modules/ModuleName';
import { MoralisCore } from '../MoralisCore';
import { Config } from './Config';
import { MoralisModules } from '../Modules';

export class CoreConfigValidator {
  public static requireServerModule(modules: MoralisModules) {
    const serverModule = modules.has(ModuleName.SERVER);
    if (!serverModule) {
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

  public static requireRegisteredConnector(value: string, modules: MoralisModules) {
    const evmModule = modules.tryGetNetwork(ModuleName.EVM);
    if (evmModule && evmModule.hasConnector(value)) {
      return 'Invalid value. The connector is not registered as a connector to Evm. Make sure to register it via Evm.connectors.register(connector).';
    }
    return null;
  }

  public static requireValidChain(value: EvmChainish, core: MoralisCore) {
    // TODO: validate if chain is valid api chain
    try {
      EvmChain.create(value, core);
    } catch (error) {
      return error.message;
    }
    return null;
  }
}
