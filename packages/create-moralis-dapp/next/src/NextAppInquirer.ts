import { Inquirer } from '@create-moralis-dapp/toolkit';
import { web3LibSchema } from './web3LibSchema';

export class NextAppInquirer {
  private static commonQuestions = Inquirer.commonQuestions;

  public static async inquire() {
    return Inquirer.inquire(this.questions);
  }

  public static questions = [
    this.commonQuestions.confirmBeta,
    this.commonQuestions.name,
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
      default: { name: 'wagmi', value: web3LibSchema.wagmi },
    },
    {
      name: 'nextAuthUrl',
      message:
        'Input your NextJS app URL. You can use "http://localhost:3000" for development. Change it before go production!',
      default: 'http://localhost:3000',
      prefix: '🧙 :',
    },
    this.commonQuestions.moralisApiKey,
    this.commonQuestions.packageManager,
  ];
}
