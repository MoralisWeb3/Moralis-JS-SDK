import { Inquirer } from '@create-moralis-dapp/toolkit';
import { web3LibSchema } from './web3LibSchema';

export class NextInquirer {
  public static async inquire() {
    const { inquire, commonQuestions } = Inquirer;

    return inquire([
      commonQuestions.confirmBeta,
      commonQuestions.name,
      {
        type: 'list',
        name: 'web3Lib',
        message: 'Select a Web3 library ...',
        choices: [
          { name: 'wagmi', value: web3LibSchema.wagmi },
          { name: 'useDapp', value: web3LibSchema.useDapp },
          { name: 'web3-react', value: web3LibSchema.web3React },
        ],
        prefix: '🧙 :',
      },
      {
        name: 'nextAuthUrl',
        message:
          'Input your NextJS app URL. You can use "http://localhost:3000" for development. Change it before go production!',
        default: 'http://localhost:3000',
        prefix: '🧙 :',
      },
      commonQuestions.moralisApiKey,
      commonQuestions.packageManager,
    ]);
  }
}
