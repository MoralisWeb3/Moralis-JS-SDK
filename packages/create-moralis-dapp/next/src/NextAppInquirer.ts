import { Inquirer } from '@create-moralis-dapp/toolkit';

export class NextAppInquirer {
  private static commonQuestions = Inquirer.commonQuestions;

  public static async inquire() {
    const { confirmBeta, name } = await Inquirer.inquire([this.commonQuestions.confirmBeta, this.commonQuestions.name]);
    const { network } = await Inquirer.inquire({
      name: 'network',
      type: 'select',
      choices: [
        { title: 'Evm (Ethereum/BNB/Polygon/Avalanche/Fantom/Cronos/Arbitrum/Optimism)', value: 'evm' },
        { title: 'Solana', value: 'sol' },
      ],
      message: 'Select a network:',
    });
    const isEvm = network === 'evm';

    const hasWagmi = isEvm;

    const isSolana = network === 'sol';

    const { moralisApiKey, packageManager } = await Inquirer.inquire([
      this.commonQuestions.moralisApiKey,
      this.commonQuestions.packageManager,
    ]);

    return { confirmBeta, name, isEvm, hasWagmi, isSolana, moralisApiKey, packageManager };
  }
}
