import Moralis from 'moralis';
import { smokeTest } from './Tester';

export function testEvmInfo(): Promise<unknown> {
  const groupName = 'Evm/info';

  return Promise.all([
    smokeTest(groupName, 'web3ApiVersion', () => {
      return Moralis.EvmApi.utils.web3ApiVersion();
    }),
  ]);
}

export function testEvmAccount(): Promise<unknown> {
  const groupName = 'Evm/account';

  return Promise.all([
    smokeTest(groupName, 'getNativeBalance', () => {
      return Moralis.EvmApi.balance.getNativeBalance({
        address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
      });
    }),
    smokeTest(groupName, 'getWalletNFTs', () => {
      return Moralis.EvmApi.nft.getWalletNFTs({
        address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
      });
    }),
  ]);
}

export function testEvmResolve(): Promise<unknown> {
  const groupName = 'Evm/resolve';

  return Promise.all([
    smokeTest(groupName, 'resolveAddress', () => {
      return Moralis.EvmApi.resolve.resolveAddress({
        address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
      });
    }),
  ]);
}
