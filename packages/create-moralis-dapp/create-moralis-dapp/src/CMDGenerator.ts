import { AppGenerator, Inquirer } from '@create-moralis-dapp/toolkit';

export class CMDGenerator {
  constructor(private generators: AppGenerator[]) {}

  public async run() {
    const { stack } = await Inquirer.inquire({
      type: 'select',
      name: 'stack',
      message: 'Select a core stack for your dApp ...',
      choices: this.generators.map((generator) => {
        return {
          title: generator.name,
          value: generator,
        };
      }),
    });

    await stack.generate();
  }
}
