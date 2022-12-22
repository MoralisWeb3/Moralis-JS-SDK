import path from 'path';
import { CodeGenerator } from './code-generator';
import { ServerGenerator } from './generators/express/generators/server/ServerGenerator';
import { GeneratedModule } from './generators/express/utils/types';

const main = () => {
  // const codeGen = new CodeGenerator();
  // codeGen.addFile(path.join(__dirname, 'test.ts'), path.join(__dirname, 'test.ts.hbs'), { name: 'Y0moo' });
  const xx = new ServerGenerator(GeneratedModule.EVM_API);
  return xx.actions;
};

main();
