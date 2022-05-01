import { Moralis } from '@moralis/all';

export const Server = () => {
  return (
    <div>
      <h2>Server</h2>
      <button onClick={() => Moralis.Server.authenticate('evm', 'metamask', { silent: false })}>
        Authenticate via EVM metamask
      </button>

      <button onClick={() => {}}>Logout</button>
    </div>
  );
};
