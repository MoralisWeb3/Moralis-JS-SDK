import { Moralis } from '@moralis/all';

export const Server = () => {
  const auth = async (options: any) => {
    const res = await Moralis.Server.authenticate(options);
    console.log('Test App: Connected', res);
  };

  return (
    <div>
      <h2>Server</h2>
      <button onClick={() => auth({ network: 'evm', walletType: 'metamask', options: {} })}>
        Authenticate via EVM metamask
      </button>

      <button onClick={() => {}}>Logout</button>
    </div>
  );
};
