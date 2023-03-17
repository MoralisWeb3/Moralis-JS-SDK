import { prompt } from 'inquirer';
import { AppGenerator } from '@create-moralis-dapp/toolkit';

export class CMDGenerator {
  constructor(private generators: AppGenerator[]) {}

  public async run() {
    const { stack } = await prompt({
      type: 'list',
      name: 'stack',
      message: 'Select a core stack for your dApp:',
      choices: this.generators.map((generator) => {
        return {
          name: generator.name,
          value: generator,
        };
      }),
      prefix: '🧙',
    });
    await stack.generate();
  }
}
