import { Inquirer } from '@create-moralis-dapp/toolkit';
import { web3LibSchema } from './web3LibSchema';

export class NextAppInquirer {
  private static commonQuestions = Inquirer.commonQuestions;

  public static async inquire() {
    return Inquirer.inquire([
      this.commonQuestions.confirmBeta,
      this.commonQuestions.name,
      {
        type: 'select',
        name: 'web3Lib',
        message: 'Select a Web3 library ...',
        choices: [
          { title: 'wagmi', value: web3LibSchema.wagmi },
          { title: 'useDapp', value: web3LibSchema.useDapp },
          { title: 'web3-react', value: web3LibSchema.web3React },
        ],
        initial: 0,
      },
      {
        name: 'nextAuthUrl',
        type: 'text',
        message:
          'Input your NextJS app URL. You can use "http://localhost:3000" for development. Change it before go production!',
        initial: 'http://localhost:3000',
      },
      this.commonQuestions.moralisApiKey,
      this.commonQuestions.packageManager,
    ]);
  }
}
