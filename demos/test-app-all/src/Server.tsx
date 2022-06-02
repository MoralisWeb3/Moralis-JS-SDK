import { Moralis } from 'moralis';
import { AuthMethod } from '@moralisweb3/server/lib/AuthMethods/types';

export const Server = () => {
  return (
    <div>
      <h2>Server</h2>
      <button onClick={() => Moralis.Server.authenticate(AuthMethod.EVM, { connector: 'metamask', silent: false })}>
        Authenticate via EVM metamask
      </button>

      <button
        onClick={() => {
          Moralis.Server.signUp({
            username: 'example-user',
            password: 'example-password',
            email: 'example@email.com',
            fields: {
              age: 42,
            },
          })
            .then(console.log)
            .catch(console.error);
        }}
      >
        Sign up
      </button>

      <button
        onClick={() => {
          Moralis.Server.signIn({
            username: 'example-user',
            password: 'example-password',
          })
            .then(console.log)
            .catch(console.error);
        }}
      >
        Sign in
      </button>
      <button
        onClick={() => {
          Moralis.Server.logout();
        }}
      >
        Logout
      </button>

      <button onClick={() => Moralis.Server.linkEvmAddress('0x3622277fec8fF2e6EF42c746F019476Ea321a7D3')}>Link</button>
      <button onClick={() => Moralis.Server.unlinkEvmAddress('0x3622277fec8fF2e6EF42c746F019476Ea321a7D3')}>
        Unlink
      </button>
    </div>
  );
};
