const versions = {
  ethers: '5.7.1',
  wagmi: '0.6.7',
  '@web3-react/core': '6.1.9',
  '@usedapp/core': '1.1.5',
};

export type DependencyName = keyof typeof versions;

export const getVersionByName = (name: DependencyName) => versions[name];
