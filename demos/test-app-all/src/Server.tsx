import { Moralis } from 'moralis';
import { AuthMethod } from '@moralisweb3/server/lib/AuthMethods/types';

export const Server = () => {
  return (
    <div>
      <h2>Server</h2>
      <button onClick={() => Moralis.Server.authenticate(AuthMethod.EVM, { connector: 'metamask', silent: false })}>
        Authenticate via EVM metamask
      </button>

      <button onClick={() => {}}>Logout</button>

      <button onClick={() => Moralis.Server.linkEvmAddress('0x3622277fec8fF2e6EF42c746F019476Ea321a7D3')}>Link</button>
      <button onClick={() => Moralis.Server.unlinkEvmAddress('0x3622277fec8fF2e6EF42c746F019476Ea321a7D3')}>Unlink</button>
    </div>
  );
};
