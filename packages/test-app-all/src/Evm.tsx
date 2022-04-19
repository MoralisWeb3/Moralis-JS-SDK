import { Moralis } from '@moralis/all';

export const Evm = () => {
  const auth = async (options: any) => {
    const res = await Moralis.Evm.connect(options);
    console.log('Test App: Connected', res);
  };

  return (
    <div>
      <h2>EVM</h2>
      <button onClick={() => auth({ walletType: 'metamask', options: {} })}>Connect via metamask</button>
      <button onClick={() => auth({ walletType: 'walletConnect', options: { newSession: true } })}>
        Connect via walletconnect
      </button>
      <button onClick={() => Moralis.Evm.disconnect()}>Disconnect</button>
      <button onClick={() => console.log(Moralis.Evm.connector)}>get connector</button>
      <button onClick={() => console.log(Moralis.Evm.account)}>get account</button>
      <button onClick={() => console.log(Moralis.Evm.chain)}>get chainId</button>
    </div>
  );
};
