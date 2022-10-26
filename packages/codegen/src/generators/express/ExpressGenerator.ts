import { AddActionConfig, Actions } from 'node-plop';
import { fileURLToPath } from 'node:url';
import { RouterGenerator } from './RouterGenerator';
import Moralis from './getMoralis.cjs';
import path from 'node:path';

export class ExpressGeneratorCl {
  private dirname = path.dirname(fileURLToPath(import.meta.url));
  private packagesFolder = path.join(this.dirname, '../../../..');
  private expressSrcDir = path.join(this.packagesFolder, 'express/src');

  private addSrcIndex = (): AddActionConfig => {
    return {
      type: 'add',
      templateFile: path.join(this.dirname, 'templates/endpoint/srcIndex.ts.hbs'),
      path: path.join(this.expressSrcDir, 'index.ts'),
      force: true,
    };
  };

  private addRoutersIndex = (): AddActionConfig => {
    return {
      type: 'add',
      template: '// Routers export',
      path: path.join(this.expressSrcDir, 'routers/index.ts'),
      force: true,
    };
  };

  public getGenerator = () => {
    const { Streams, EvmApi, SolApi } = Moralis;

    const mappedActions = [Streams, EvmApi, SolApi]
      .map(({ name, baseUrl, endpoints }) =>
        new RouterGenerator(name, baseUrl, endpoints.getDescriptors(), this.expressSrcDir).getGenerator(),
      )
      .flat(1);

    return [this.addSrcIndex(), this.addRoutersIndex(), ...mappedActions] as Actions;
  };
}
