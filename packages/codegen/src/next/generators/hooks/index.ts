import { NodePlopAPI } from 'plop';
import { HooksGenerator } from './HooksGenerator';

export default function NextHooksGenerator(plop: NodePlopAPI) {
  plop.setGenerator('next-hooks', {
    description: 'hooks for @moralisweb3/next',
    prompts: [],
    actions: () => {
      const evmApiModuleActions = new HooksGenerator('evmApi').actions;
      const solApiModuleActions = new HooksGenerator('solApi').actions;

      return [...evmApiModuleActions, ...solApiModuleActions];
    },
  });
}
