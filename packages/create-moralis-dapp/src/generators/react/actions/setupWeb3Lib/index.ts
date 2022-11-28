import { prompt } from 'inquirer';
import { getVersionByName } from '../../utils';
import { Web3LibSchema, web3LibSchema } from './web3LibSchema';

export const askWeb3Lib = async (_destination: string) => {
  const { web3Lib } = await prompt<Web3LibSchema>({
    type: 'list',
    name: 'web3Lib',
    message: '🧙 : Select a Web3 library ...',
    choices: [
      { name: 'wagmi', value: web3LibSchema.wagmi },
      { name: 'useDapp', value: web3LibSchema.useDapp },
      { name: 'web3-react', value: web3LibSchema.web3React },
    ],
  });

  return {
    web3Lib,
    dependencies: [
      {
        name: web3Lib.name,
        version: getVersionByName(web3Lib.name),
      },
      { name: 'ethers', version: getVersionByName('ethers') },
    ],
  };
};
  