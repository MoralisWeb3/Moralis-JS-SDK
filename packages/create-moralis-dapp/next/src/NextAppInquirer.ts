import { Inquirer } from '@create-moralis-dapp/toolkit';
import _ from 'lodash';
import { RainbowKitPlugin, SolanaPlugin, WagmiPlugin, Web3ReactPlugin } from './plugins';
import { Plugin } from './types';
// import { getRainbowkitPlugin, getWagmiPlugin } from './plugins';

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

    const isSolana = network === 'sol';

    const web3LibChoices = {
      evm: [
        { title: 'wagmi', value: WagmiPlugin },
        { title: 'web3-react', value: Web3ReactPlugin },
      ],
      sol: [{ title: 'Solana wallet adapter', value: SolanaPlugin }],
    };

    const { web3Library } = await Inquirer.inquire({
      type: 'select',
      name: 'web3Library',
      choices: web3LibChoices[network as 'evm' | 'sol'],
      message: 'Select a Web3 Library:',
    });

    const hasWagmi = web3Library.id === 'wagmi';

    let connector: Plugin | undefined;

    if (hasWagmi) {
      const response = await Inquirer.inquire({
        type: 'select',
        name: 'connector',
        choices: [{ title: 'rainbowkit', value: RainbowKitPlugin }],
        message: 'Select a wallet connector:',
      });
      connector = response.connector;
    }

    const hasRainbowkit = connector?.id === 'rainbowkit';

    const { moralisApiKey, packageManager } = await Inquirer.inquire([
      this.commonQuestions.moralisApiKey,
      this.commonQuestions.packageManager,
    ]);

    return {
      confirmBeta,
      name,
      isEvm,
      hasWagmi,
      isSolana,
      moralisApiKey,
      packageManager,
      hasRainbowkit,
      plugins: _.compact([web3Library, connector]),
    };
  }
}
